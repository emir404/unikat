import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../components/LegalPage";
import { ATELIER } from "../data/atelier";

export const metadata: Metadata = {
  title: "Impressum – AURA Unikatschmuck, Lübeck",
  description:
    "Impressum von Aura Schmuck Design, Inh. Petra Hübner — Goldschmiede-Atelier in der Hüxstraße 32, 23552 Lübeck.",
};

export default function Impressum() {
  return (
    <LegalPage title="Impressum">
      <LegalSection heading="Angaben gemäß § 5 TMG">
        <p>
          Aura Schmuck Design
          <br />
          Inhaberin: Petra Hübner
          <br />
          <a
            href={ATELIER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
          >
            Hüxstraße 32
            <br />
            23552 Lübeck
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p>
          Telefon / Fax: <a href="tel:+494517063874" className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper">0451 – 706 38 74</a>
          <br />
          E-Mail:{" "}
          <a href="mailto:info@aura-unikatschmuck.de" className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper">
            info@aura-unikatschmuck.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Umsatzsteuer">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          <br />
          DE 2213200726
        </p>
        <p className="mt-3 text-[14px] italic text-foreground/60">
          Angabe der bisherigen Website — vor Veröffentlichung zu prüfen.
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          Petra Hübner
          <br />
          <a
            href={ATELIER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
          >
            Hüxstraße 32, 23552 Lübeck
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
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
