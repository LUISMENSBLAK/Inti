"use client";

import Image from "next/image";
import { Box } from "lucide-react";
import { Component, lazy, Suspense, useState, type ErrorInfo, type ReactNode } from "react";

const ModelCanvas = lazy(() => import("./model-canvas").then((module) => ({ default: module.ModelCanvas })));

class ModelErrorBoundary extends Component<{ children: ReactNode; poster: string; name: string }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    void error;
    void info;
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="model-fallback">
          <Image src={this.props.poster} alt={`Fotografía de ${this.props.name}`} fill sizes="(max-width: 900px) 100vw, 50vw" />
          <p>El modelo 3D no pudo cargarse. La fotografía permanece disponible como referencia.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function ModelViewer({ src, poster, name }: { src: string; poster: string; name: string }) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="model-poster">
        <Image src={poster} alt={`Vista previa del modelo 3D de ${name}`} fill sizes="(max-width: 900px) 100vw, 50vw" />
        <div className="model-poster-copy">
          <p className="eyebrow">Vista tridimensional</p>
          <button onClick={() => setLoaded(true)}><Box /> Explorar modelo 3D</button>
        </div>
      </div>
    );
  }

  return (
    <ModelErrorBoundary poster={poster} name={name}>
      <Suspense fallback={<div className="model-loading" aria-live="polite">Preparando modelo 3D…</div>}>
        <ModelCanvas src={src} name={name} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
