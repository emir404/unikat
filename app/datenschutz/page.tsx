import type { Metadata } from "next";
import { LegalPage, LegalSection } from "../components/LegalPage";
import { ATELIER } from "../data/atelier";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – AURA Unikatschmuck, Lübeck",
  description:
    "Datenschutzerklärung von Aura Schmuck Design, Inh. Petra Hübner, Hüxstraße 32, 23552 Lübeck.",
};

export default function Datenschutz() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <p className="border-l-2 border-copper/50 pl-4 font-serif text-[14.5px] italic leading-[1.7] text-foreground/60">
        Entwurf auf Grundlage der Standardformulierungen für statische
        Websites — vor Veröffentlichung rechtlich zu prüfen.
      </p>

      <LegalSection heading="1. Verantwortliche Stelle">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p className="mt-3">
          Aura Schmuck Design, Inh. Petra Hübner
          <br />
          <a
            href={ATELIER.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
          >
            Hüxstraße 32, 23552 Lübeck
          </a>
          <br />
          Telefon: 0451 – 706 38 74
          <br />
          E-Mail: info@aura-unikatschmuck.de
        </p>
      </LegalSection>

      <LegalSection heading="2. Allgemeines zur Datenverarbeitung">
        <p>
          Diese Website dient ausschließlich der Information über das Atelier
          und seine Arbeiten. Es bestehen keine Nutzerkonten, kein Onlineshop
          und keine Kontaktformulare. Personenbezogene Daten werden nur in dem
          hier beschriebenen, technisch notwendigen Umfang verarbeitet.
        </p>
      </LegalSection>

      <LegalSection heading="3. Server-Logdateien">
        <p>
          Beim Aufruf dieser Website erhebt der Hosting-Anbieter automatisch
          Informationen in sogenannten Server-Logdateien, die Ihr Browser
          übermittelt (z.&nbsp;B. IP-Adresse, Datum und Uhrzeit der Anfrage,
          Browsertyp, Referrer-URL). Diese Daten dienen der Sicherstellung
          eines störungsfreien Betriebs und der Verbesserung der Stabilität
          und Sicherheit (Rechtsgrundlage: Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f
          DSGVO). Eine Zusammenführung mit anderen Datenquellen findet nicht
          statt.
        </p>
      </LegalSection>

      <LegalSection heading="4. Schriftarten">
        <p>
          Die verwendeten Schriftarten sind lokal auf dem Server dieser
          Website eingebunden. Beim Aufruf der Seite werden keine Verbindungen
          zu Servern von Schriftanbietern (z.&nbsp;B. Google Fonts)
          hergestellt.
        </p>
      </LegalSection>

      <LegalSection heading="5. Google Maps">
        <p>
          Diese Website bindet zur Anfahrtsbeschreibung eine Karte des
          Dienstes Google Maps ein (Anbieter: Google Ireland Limited, Gordon
          House, Barrow Street, Dublin 4, Irland). Beim Laden der Karte werden
          Daten — darunter Ihre IP-Adresse — an Server von Google übertragen.
          Die Einbindung erfolgt im Interesse einer leichten Auffindbarkeit
          des Ateliers (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;f DSGVO). Weitere
          Informationen finden Sie in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-copper/40 underline-offset-4 transition-colors hover:text-copper"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="6. Kontaktaufnahme per Telefon oder E-Mail">
        <p>
          Wenn Sie uns telefonisch oder per E-Mail kontaktieren, werden Ihre
          Angaben zur Bearbeitung der Anfrage und für mögliche Anschlussfragen
          gespeichert (Art.&nbsp;6 Abs.&nbsp;1 lit.&nbsp;b DSGVO). Diese Daten
          geben wir nicht ohne Ihre Einwilligung weiter und löschen sie,
          sobald sie für die Bearbeitung nicht mehr erforderlich sind und
          keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection heading="7. Ihre Rechte">
        <p>
          Sie haben im Rahmen der DSGVO jederzeit das Recht auf unentgeltliche
          Auskunft über Ihre gespeicherten personenbezogenen Daten, deren
          Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein
          Recht auf Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit und Widerspruch. Außerdem steht Ihnen ein
          Beschwerderecht bei der zuständigen Aufsichtsbehörde zu — in
          Schleswig-Holstein ist dies das Unabhängige Landeszentrum für
          Datenschutz (ULD), Holstenstraße 98, 24103 Kiel.
        </p>
      </LegalSection>

      <LegalSection heading="8. Stand">
        <p>
          Diese Datenschutzerklärung wird bei Änderungen der Website oder der
          Rechtslage angepasst.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
