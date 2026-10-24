import Image from "next/image";

/** The supplied brand artwork, kept local to avoid third-party image requests. */
export function BrandVisual() {
  return <div className="brand-visual">
    <div className="brand-grid" aria-hidden="true" />
    <span className="visual-coordinate" aria-hidden="true">AP / DIGITAL PRODUCT STUDIO</span>
    <div className="brand-art"><Image src="/images/appistry-logo.webp" alt="Appistry Technologies — cyan and teal orbital A logo" width={1200} height={800} preload sizes="(max-width: 640px) 100vw, 50vw" /></div>
    <div className="visual-bottom"><span><i /> Ideas into digital experiences</span><span aria-hidden="true">DESIGN / BUILD / EVOLVE</span></div>
  </div>;
}
