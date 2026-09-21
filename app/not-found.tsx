import Link from "next/link";

export default function NotFound() {
  return <main id="contenido" className="reading-column"><p className="eyebrow">Página no encontrada</p><h1>Esta página no está disponible</h1><p>Puede que el enlace sea antiguo o que el contenido siga en preparación.</p><Link className="button-link" href="/">Volver al catálogo</Link></main>;
}
