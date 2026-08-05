import type { Metadata } from "next";
import { InfoPage } from "@/src/components/info-page";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

const questions = [
  ["¿Los precios están publicados?", "En esta etapa los precios se consultan directamente. Cada página prepara un mensaje con la referencia de la pieza."],
  ["¿La disponibilidad es inmediata?", "La disponibilidad debe confirmarse antes de cualquier decisión de compra."],
  ["¿Los modelos 3D son exactos?", "Son reconstrucciones visuales aproximadas creadas a partir de las fotografías disponibles. No son modelos CAD ni incluyen medidas de fabricación."],
  ["¿Puedo ampliar las fotografías?", "Sí. En cada página de producto puedes cambiar de perspectiva, ampliar la imagen y navegar por gesto táctil."],
  ["¿Cómo solicito un envío?", "Consulta por WhatsApp la pieza, el destino y el plazo deseado. Las condiciones se confirman de manera personal."],
];

export default function FaqPage() {
  return (
    <InfoPage eyebrow="Ayuda" title="Preguntas frecuentes." intro="Respuestas claras sobre la experiencia actual de la boutique digital.">
      <div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
    </InfoPage>
  );
}
