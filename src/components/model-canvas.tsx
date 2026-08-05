"use client";

import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Maximize2, Minimize2, Pause, Play, RotateCcw, X } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Suspense, useEffect, useState } from "react";

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  useEffect(() => () => { useGLTF.clear(src); }, [src]);
  return <primitive object={scene} />;
}

export function ModelCanvas({ src, name }: { src: string; name: string }) {
  const [viewKey, setViewKey] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [rotating, setRotating] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setFullscreen(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [fullscreen]);
  return (
    <div className={fullscreen ? "model-viewer is-fullscreen" : "model-viewer"} aria-label={`Modelo 3D interactivo de ${name}`}>
      {fullscreen && <button className="model-fullscreen-close" onClick={() => setFullscreen(false)} aria-label="Cerrar vista completa"><X /></button>}
      <Canvas key={viewKey} camera={{ position: [0, 0.15, 4.8], fov: 43 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#171211"]} />
        <ambientLight intensity={0.65} />
        <spotLight position={[4, 6, 5]} intensity={70} angle={0.28} penumbra={0.85} color="#f6e9d8" castShadow />
        <spotLight position={[-5, 1, 2]} intensity={42} angle={0.38} penumbra={1} color="#b44e34" />
        <Suspense fallback={null}>
          <Center><group scale={fullscreen ? 1.08 : 0.94}><Model src={src} /></group></Center>
          <ContactShadows position={[0, -1.45, 0]} opacity={0.28} scale={6} blur={2.8} far={3.5} color="#000000" />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={2.8} maxDistance={6.5} minPolarAngle={0.35} maxPolarAngle={2.7} autoRotate={rotating && !reduced} autoRotateSpeed={0.8} />
      </Canvas>
      <div className="model-controls">
        <span>Arrastra para girar · pellizca para acercar</span>
        <div><button onClick={() => setRotating((value) => !value)}>{rotating ? <Pause /> : <Play />} {rotating ? "Pausar" : "Giro suave"}</button><button onClick={() => setViewKey((key) => key + 1)}><RotateCcw /> Restablecer</button><button onClick={() => setFullscreen((value) => !value)}>{fullscreen ? <Minimize2 /> : <Maximize2 />} {fullscreen ? "Reducir" : "Pantalla completa"}</button></div>
      </div>
      <p className="model-note">Reconstrucción 3D aproximada basada en fotografías; no sustituye medidas de fabricación.</p>
    </div>
  );
}
