import type { Metadata } from "next";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { LegalPage, LegalSection } from "../components/LegalPage";
import { getCms } from "@/lib/cms";
import { getSiteContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impressum – AURA Unikatschmuck, Lübeck",
  description:
    "Impressum von Aura Schmuck Design, Inh. Petra Hübner — Goldschmiede-Atelier in der Hüxstraße 32, 23552 Lübeck.",
};

const RICHTEXT_CLASS =
  "flex flex-col gap-3 [&_h1]:font-sans [&_h1]:text-[15px] [&_h1]:uppercase [&_h1]:tracking-[0.18em] [&_h1]:text-foreground [&_h1]:mt-6 [&_h2]:font-sans [&_h2]:text-[13px] [&_h2]:uppercase [&_h2]:tracking-[0.18em] [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-1 [&_p]:font-serif [&_p]:text-[16.5px] [&_p]:leading-[1.75] [&_p]:text-foreground/80 [&_a]:underline [&_a]:decoration-copper/40 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:text-copper";

export default async function Impressum() {
  const [content, payload] = await Promise.all([getSiteContent(), getCms()]);
  const atelier = content.atelier;

  let legal: { impressumTitle?: string | null; impressum?: unknown } = {};
  try {
    legal = await payload.findGlobal({ slug: "legal", depth: 0 });
  } catch {
    legal = {};
  }

  const hasCms = Boolean(
    legal.impressum && typeof legal.impressum === "object",
  );

  return (
    <LegalPage
      title={legal.impressumTitle || "Impressum"}
      atelier={atelier}
      footer={content.footer}
    >
      {hasCms ? (
        <div className={RICHTEXT_CLASS}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <RichText data={legal.impressum as any} />
        </div>
      ) : (
        <>
          <LegalSection heading="Angaben gemäß § 5 TMG">
            <p>
              {atelier.legalName.split(",")[0]}
              <br />
              Inhaberin: {atelier.owner}
              <br />
              <a
                href={atelier.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
              >
                {atelier.street}
                <br />
                {atelier.zip} {atelier.city}
              </a>
            </p>
          </LegalSection>

          <LegalSection heading="Kontakt">
            <p>
              Telefon / Fax:{" "}
              <a
                href={atelier.phoneHref}
                className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
              >
                {atelier.phoneDisplay}
              </a>
              <br />
              E-Mail:{" "}
              <a
                href={`mailto:${atelier.email}`}
                className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
              >
                {atelier.email}
              </a>
            </p>
          </LegalSection>

          <LegalSection heading="Umsatzsteuer">
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a
              Umsatzsteuergesetz:
              <br />
              DE 2213200726
            </p>
            <p className="mt-3 text-[14px] italic text-foreground/60">
              Angabe der bisherigen Website — vor Veröffentlichung zu prüfen.
            </p>
          </LegalSection>

          <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>
              {atelier.owner}
              <br />
              <a
                href={atelier.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
              >
                {atelier.street}, {atelier.zip} {atelier.city}
              </a>
            </p>
          </LegalSection>

          <LegalSection heading="Berufsbezeichnung">
            <p>
              Goldschmiedemeisterin (Meisterprüfung im Goldschmiedehandwerk,
              verliehen in Deutschland).
            </p>
          </LegalSection>

          <LegalSection heading="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </LegalSection>

          <LegalSection heading="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </LegalSection>
        </>
      )}
    </LegalPage>
  );
}
