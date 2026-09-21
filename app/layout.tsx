import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "abueguias", template: "%s · abueguias" },
  description: "Guías claras para aprender herramientas digitales con calma."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        {children}
      </body>
    </html>
  );
}
