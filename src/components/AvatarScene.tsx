import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_URL = `${import.meta.env.BASE_URL}Face.glb`;

/** Centro della bounding box del modello (scala 3): inquadra la testa al centro. */
const MODEL_CENTER: [number, number, number] = [-0.98, -0.2, 5];

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

const Avatar: React.FC<{ scale: number }> = ({ scale }) => {
  const { scene } = useGLTF(MODEL_URL);

  const headRef = useRef<THREE.Object3D | null>(null);
  const eyeLRef = useRef<THREE.Object3D | null>(null);
  const eyeRRef = useRef<THREE.Object3D | null>(null);
  const trackRef = useRef(true);

  const { mouse } = useThree();

  // trova gli oggetti UNA VOLTA
  useEffect(() => {
    headRef.current = scene.getObjectByName("Osso001") ?? null;
    eyeLRef.current = scene.getObjectByName("Real_Blue_Eye") ?? null;
    eyeRRef.current = scene.getObjectByName("Real_Blue_Eye002") ?? null;
  }, [scene]);

  // Chi ha chiesto meno animazioni non si vede seguire dagli occhi.
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (trackRef.current = !mql.matches);
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useFrame(() => {
    if (!trackRef.current) return;
    if (!eyeLRef.current || !eyeRRef.current) return;

    const targetPoint = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 20);
    eyeLRef.current.lookAt(targetPoint);
    eyeRRef.current.lookAt(targetPoint);

    if (headRef.current) {
      const targetY = mouse.x * 0.3;
      const targetX = -mouse.y * 0.2;
      const lerpFactor = 0.1;

      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * lerpFactor;
      headRef.current.rotation.x += targetX * lerpFactor;

      headRef.current.rotation.x = Math.max(0.7, Math.min(0.8, headRef.current.rotation.x));
      headRef.current.rotation.y = Math.max(0, Math.min(0.2, headRef.current.rotation.y));
    }
  });

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
};

const AvatarScene: React.FC = () => {
  const [ref, size] = useElementSize();

  // Camera ortografica: le unità di mondo visibili sono size / zoom, quindi
  // legare lo zoom al lato del box mantiene la stessa inquadratura ovunque.
  const zoom = size ? size * 0.19 : 100;

  return (
    <div ref={ref} className="h-full w-full">
      {size > 0 && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          orthographic
          camera={{ position: MODEL_CENTER, zoom }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[-10, 10, 10]} intensity={2.5} />
          <directionalLight position={[10, 10, 10]} intensity={2.5} />
          <CameraSync zoom={zoom} />
          <Avatar scale={3} />
        </Canvas>
      )}
    </div>
  );
};

useGLTF.preload(MODEL_URL);

export default AvatarScene;
