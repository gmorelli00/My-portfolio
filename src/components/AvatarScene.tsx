import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Hook per monitorare le dimensioni della finestra
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Funzione per calcolare zoom responsivo
const getResponsiveZoom = (width: number) => {
  if (width < 640) return 80; // mobile
  if (width < 1024) return 100; // tablet
  if (width < 1536) return 140; // laptop
  return 150; // desktop
};

// Funzione per calcolare scala responsiva
const getResponsiveScale = (width: number) => {
  if (width < 640) return 2;
  if (width < 1024) return 2.3;
  if (width < 1536) return 2.7;
  return 3;
};

const Avatar: React.FC<{ scale: number }> = ({ scale }) => {
  const { scene } = useGLTF("Face.glb");

  const headRef = useRef<THREE.Object3D | null>(null);
  const eyeLRef = useRef<THREE.Object3D | null>(null);
  const eyeRRef = useRef<THREE.Object3D | null>(null);

  const { mouse } = useThree();

  // trova gli oggetti UNA VOLTA
  React.useEffect(() => {
    headRef.current = scene.getObjectByName("Osso001") ?? null;
    eyeLRef.current = scene.getObjectByName("Real_Blue_Eye") ?? null;
    eyeRRef.current = scene.getObjectByName("Real_Blue_Eye002") ?? null;
  }, [scene]);

  // Tracking del mouse - occhi seguono il cursore e testa si muove leggermente
  useFrame(() => {
    if (!eyeLRef.current || !eyeRRef.current) return;

    // Calcola il punto dove gli occhi devono guardare (distanza maggiore)
    const targetPoint = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 20);

    // Applica la rotazione agli occhi
    eyeLRef.current.lookAt(targetPoint);
    eyeRRef.current.lookAt(targetPoint);

    // Movimento smooth della testa con interpolazione
    if (headRef.current) {
      const targetY = mouse.x * 0.3;
      const targetX = -mouse.y * 0.2; // Rotazione leggera verso l'alto/basso
      
      // Interpolazione (lerp) per movimento smooth
      const lerpFactor = 0.1; // regola per più/meno smoothness (0.1 = molto smooth, 0.5 = meno smooth)
      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * lerpFactor;
      headRef.current.rotation.x += (targetX ) * lerpFactor;
      
      // Clamp la rotazione X tra -0.2 e 0.2 radianti
      headRef.current.rotation.x = Math.max(0.7, Math.min(0.8, headRef.current.rotation.x));
      headRef.current.rotation.y = Math.max(0, Math.min(0.2, headRef.current.rotation.y))
    }
  });

  return <primitive object={scene} scale={scale} position={[0, 0, 0]} />;
};

const AvatarScene: React.FC = () => {
  const { width } = useWindowSize();
  const zoom = getResponsiveZoom(width);
  const scale = getResponsiveScale(width);

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "400px" }}>
      <Canvas
        orthographic
        camera={{
          position: [-2, 0, 5],
          zoom: zoom,
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[-10, 10, 10]} intensity={2.5} />
        <directionalLight position={[10, 10, 10]} intensity={2.5} />

        <Avatar scale={scale} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default AvatarScene;