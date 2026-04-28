import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Avatar: React.FC = () => {
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
    const targetPoint = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 10);

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
      headRef.current.rotation.x = Math.max(0.6, Math.min(0.7, headRef.current.rotation.x));
    }
  });

  return <primitive object={scene} scale={3} position={[0, 0, 0]} />;
};

const AvatarScene: React.FC = () => {
  return (
<Canvas
  orthographic
  camera={{
    position: [-2, 0, 4],
    zoom: 150, // 🔥 questo sostituisce il fov
  }}
>
  <ambientLight intensity={0.9} />
<directionalLight
  position={[-10, 10, 10]}
  intensity={2.5}

/>
<directionalLight
  position={[10, 10, 10]}
  intensity={2.5}
/>

  <Avatar />
  <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
</Canvas>
  );
};

export default AvatarScene;