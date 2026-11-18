import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = `${import.meta.env.BASE_URL}Face.glb`;

/** Centro della bounding box del modello (scala 3): inquadra la testa al centro. */
const MODEL_CENTER: [number, number, number] = [-1.42, 0.03, 5];

/** Misura il contenitore: il framing dipende dal box, non dalla finestra. */
const useElementSize = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize(Math.min(entry.contentRect.width, entry.contentRect.height));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size] as const;
};

/** Tiene lo zoom della camera allineato al box anche dopo un resize. */
const CameraSync: React.FC<{ zoom: number }> = ({ zoom }) => {
  const camera = useThree((state) => state.camera) as THREE.OrthographicCamera;
  useEffect(() => {
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }, [camera, zoom]);
  return null;
};

/** Chi ha chiesto meno animazioni non si vede seguire dagli occhi. */
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);
  return reduced;
};

const { clamp } = THREE.MathUtils;

/** Dopo quanti ms di mouse fermo lo sguardo comincia a vagare da solo. */
const IDLE_AFTER = 3000;
/** Durata (ms) del cenno della testa al click. */
const NOD_MS = 700;
/** Gradi di inclinazione del telefono per portare lo sguardo a fine corsa. */
const TILT_RANGE = 25;
/** Sotto questi gradi di variazione è rumore del sensore, non un movimento. */
const TILT_DEADZONE = 1.5;

/** iOS espone il giroscopio solo dopo questa richiesta, fatta da un tocco. */
type OrientationPermission = { requestPermission?: () => Promise<string> };

interface AvatarProps {
  scale: number;
  track: boolean;
  /** Istante (performance.now) dell'ultimo click sull'avatar: fa partire il cenno. */
  nodAt: React.RefObject<number>;
  onReady?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ scale, track, nodAt, onReady }) => {
  const { scene } = useGLTF(MODEL_URL);

  const headRef = useRef<THREE.Object3D | null>(null);
  const eyeLRef = useRef<THREE.Object3D | null>(null);
  const eyeRRef = useRef<THREE.Object3D | null>(null);
  /** Rotazione x a riposo dell'osso della testa: il cursore la sposta da lì. */
  const restX = useRef(0);
  /** Rotazione x della testa senza il cenno, che vi si somma sopra. */
  const baseX = useRef(0);
  /** Cursore in [-1, 1] rispetto al centro del canvas, y verso l'alto. */
  const pointer = useRef(new THREE.Vector2());
  /** Dove guarda davvero: insegue il cursore, o vaga quando il mouse è fermo. */
  const gaze = useRef(new THREE.Vector2());
  const wander = useRef(new THREE.Vector2());
  const target = useRef(new THREE.Vector3());
  const lastMove = useRef(0);

  const canvas = useThree((state) => state.gl.domElement);

  // trova gli oggetti UNA VOLTA
  useEffect(() => {
    headRef.current = scene.getObjectByName("Osso001") ?? null;
    eyeLRef.current = scene.getObjectByName("Real_Blue_Eye") ?? null;
    eyeRRef.current = scene.getObjectByName("Real_Blue_Eye002") ?? null;
    restX.current = baseX.current = headRef.current?.rotation.x ?? 0;

    // Ritocco dei materiali esportati da Blender, senza toccare il .glb:
    // la pelle perde l'effetto plastica, i capelli virano dal verde al biondo.
    scene.traverse((object) => {
      const material = (object as THREE.Mesh).material as THREE.MeshPhysicalMaterial | undefined;
      if (!material?.name) return;
      if (material.name.startsWith("Human Skin")) {
        material.metalness = 0;
        material.roughness = 0.78;
        material.specularIntensity = 0.15;
      } else if (material.name.includes("hair")) {
        material.color.set("#ffdcae");
        material.roughness = 0.65;
      }
    });
  }, [scene]);

  // Il modello è in scena: chi mostra un segnaposto può toglierlo.
  useEffect(() => onReady?.(), [onReady]);

  // Il puntatore di R3F si aggiorna solo sopra il canvas: ascoltando la
  // finestra l'avatar segue il cursore su tutta la pagina.
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.set(
        clamp((event.clientX - rect.left - rect.width / 2) / (window.innerWidth / 2), -1, 1),
        clamp((rect.top + rect.height / 2 - event.clientY) / (window.innerHeight / 2), -1, 1),
      );
      lastMove.current = performance.now();
    };

    // Su telefono l'inclinazione fa da cursore. La prima lettura è la posizione
    // neutra: ognuno tiene il telefono a un'angolazione diversa.
    // ponytail: assi pensati per il telefono in verticale; in orizzontale sono
    // scambiati, da correggere con screen.orientation.angle se serve.
    let neutral: { beta: number; gamma: number } | null = null;
    let last = { beta: 0, gamma: 0 };
    const onTilt = ({ beta, gamma }: DeviceOrientationEvent) => {
      if (beta === null || gamma === null) return;
      neutral ??= { beta, gamma };
      pointer.current.set(
        clamp((gamma - neutral.gamma) / TILT_RANGE, -1, 1),
        clamp((neutral.beta - beta) / TILT_RANGE, -1, 1),
      );
      // Il sensore manda eventi anche da fermo: conta come movimento solo
      // fuori dalla zona morta, altrimenti lo sguardo a riposo non partirebbe mai.
      if (Math.abs(beta - last.beta) + Math.abs(gamma - last.gamma) > TILT_DEADZONE) {
        last = { beta, gamma };
        lastMove.current = performance.now();
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [canvas]);

  useFrame(({ clock }, delta) => {
    // Smorzamento per secondo, non per frame: stessa velocità a 60 e a 120 Hz.
    const damp = (rate: number) => 1 - Math.exp(-rate * delta);

    if (!track) return;
    // Respiro a riposo: senza, a mouse fermo l'avatar sembra una statua.
    scene.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.035;
    if (!eyeLRef.current || !eyeRRef.current) return;

    // A mouse fermo lo sguardo vaga su due seni lenti e sfasati; appena il
    // cursore si muove torna a seguirlo, quasi subito: lo smorzamento vero
    // sta sulla testa, metterne due in fila la rende pigra.
    const now = performance.now();
    const t = clock.elapsedTime;
    const idle = now - lastMove.current > IDLE_AFTER;
    wander.current.set(Math.sin(t * 0.5) * 0.4, Math.sin(t * 0.33 + 1) * 0.18);
    gaze.current.lerp(idle ? wander.current : pointer.current, damp(idle ? 2 : 30));

    const { x, y } = gaze.current;
    target.current.set(x * 3, y * 3, 20);
    eyeLRef.current.lookAt(target.current);
    eyeRRef.current.lookAt(target.current);

    if (headRef.current) {
      const lerpFactor = damp(9);
      const { rotation } = headRef.current;

      // Cenno al click: un'onda smorzata sommata alla rotazione di base.
      const progress = (now - nodAt.current) / NOD_MS;
      const nod = progress < 1 ? Math.sin(progress * Math.PI * 4) * 0.1 * (1 - progress) : 0;

      rotation.y += (x * 0.3 - rotation.y) * lerpFactor;
      baseX.current += (restX.current - y * 0.1 - baseX.current) * lerpFactor;
      rotation.x = baseX.current + nod;
      rotation.z = -x * 0.05;
    }
  });

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
};

const AvatarScene: React.FC<{ onReady?: () => void }> = ({ onReady }) => {
  const [ref, size] = useElementSize();
  const reduced = useReducedMotion();
  const nodAt = useRef(-Infinity);

  // Camera ortografica: le unità di mondo visibili sono size / zoom, quindi
  // legare lo zoom al lato del box mantiene la stessa inquadratura ovunque.
  const zoom = size ? size * 0.23 : 100;

  return (
    <div
      ref={ref}
      className="h-full w-full cursor-pointer"
      onClick={() => {
        nodAt.current = performance.now();
        // Su iOS il primo tocco chiede anche il permesso per il giroscopio
        (window.DeviceOrientationEvent as OrientationPermission | undefined)
          ?.requestPermission?.()
          .catch(() => {});
      }}
    >
      {size > 0 && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          orthographic
          camera={{ position: MODEL_CENTER, zoom }}
          frameloop={reduced ? "demand" : "always"}
        >
          {/* Principale da sinistra, riempimento debole da destra: le ombre danno
              volume al viso. La luce di contorno da dietro è nell'accento del sito. */}
          <ambientLight intensity={0.45} />
          <directionalLight position={[-8, 6, 10]} intensity={3} />
          <directionalLight position={[10, 4, 8]} intensity={1} />
          <directionalLight position={[10, 3, -4]} intensity={6} color="#4aa8ff" />
          <CameraSync zoom={zoom} />
          <Avatar scale={3} track={!reduced} nodAt={nodAt} onReady={onReady} />
        </Canvas>
      )}
    </div>
  );
};

useGLTF.preload(MODEL_URL);

export default AvatarScene;
