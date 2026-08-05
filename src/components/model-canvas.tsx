"use client";

import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { RotateCcw } from "lucide-react";
import { Suspense, useState } from "react";

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  return <primitive object={scene} />;
}

export function ModelCanvas({ src, name }: { src: string; name: string }) {
  const [viewKey, setViewKey] = useState(0);
  return (
    <div className="model-viewer" aria-label={`Modelo 3D interactivo de ${name}`}>
      <Canvas key={viewKey} camera={{ position: [0, 0.15, 4.8], fov: 48 }} dpr={[1, 1.5]} shadows>
        <color attach="background" args={["#ead8c4"]} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 6]} intensity={3.5} castShadow />
        <directionalLight position={[-4, 1, 3]} intensity={2.2} color="#ffd9b5" />
        <Suspense fallback={null}>
          <Center top>
            <group scale={0.92} position={[0, -1.45, 0]}><Model src={src} /></group>
          </Center>
          <ContactShadows position={[0, -1.72, 0]} opacity={0.2} scale={6} blur={2.4} far={3} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={3.2} maxDistance={6.2} minPolarAngle={0.45} maxPolarAngle={2.55} />
      </Canvas>
      <div className="model-controls">
        <span>Arrastra para girar · pellizca para acercar</span>
        <button onClick={() => setViewKey((key) => key + 1)}><RotateCcw /> Restablecer</button>
      </div>
      <p className="model-note">Reconstrucción 3D aproximada basada en fotografías; no sustituye medidas de fabricación.</p>
    </div>
  );
}
