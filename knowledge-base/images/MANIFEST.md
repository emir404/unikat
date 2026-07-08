# Bild-Provenienz

## Bilder der alten Website (Referenz — NICHT gespiegelt)

Die alte Site ist HTTP-only (kein gültiges TLS); die Originaldateien konnten beim Crawl nicht
gesichert werden. URLs zur Referenz (Basis `http://www.aura-unikatschmuck.de/`):

| Motiv | Original-URL |
|---|---|
| Ring mit Turmalin (Detail) | `pics/jpg/details/ringe/turmalin.jpg` |
| Ring-Leiste (Thumbnails) | `pics/jpg/details/ringe/ringleiste.jpg` |
| Ohrstecker Dreiecksform (Detail) | `pics/jpg/details/…/dreieckig.jpg` |
| Ohrschmuck-Leiste | `pics/jpg/details/…/ohrleiste.jpg` |
| Zehnreihiger Halsreif (Detail) | `pics/jpg/details/halsreif/reif.jpg` |
| Halsreif-Leiste | `pics/jpg/details/halsreif/reifleiste.jpg` |
| Startseiten-Collage | `pics/jpg/collage.jpg` |
| Hauptbanner (s/w, Text im Bild) | `pics/jpg/mainleiste_sw.jpg` |
| Signatur-Grafik | `pics/gif/petra.gif` |

Qualitäts-Einschätzung: vor-2010, kleinformatig — für die neue Site nicht verwendbar.

## Generierte Bilder der neuen Site (`public/images/**`)

Alle Produkt-/Atelier-Bilder der Demo-Site sind **KI-generiert** (genmedia CLI / fal.ai) als
Interpretation des dokumentierten Stils (Zweifarbigkeit Silber+Gold / Silber+Kupfer, Punzierung,
Strichmattierung). Sie sind Platzhalter in Erwartung echter Produkt- und Atelierfotografie
(→ `GAPS.md` #4, #6). **Kein Porträt von Petra Hübner wurde generiert.**

Generiert am 2026-07-08, Modell **fal-ai/nano-banana-pro** (2K, JPEG), einheitliche
Art-Direction per System-Prompt (warmes Elfenbein, weiches Richtungslicht, materialgetreue
Wiedergabe von 925 Silber / 900 Gold / Kupfer, Punzieren + Strichmattierung). Jedes Bild
wurde einzeln auf Metall-/Stein-Realismus, Maßstab und Anatomie geprüft (18/18 bestanden).

| Datei | Motiv | Referenz |
|---|---|---|
| `hero/hero-atmo.jpg` | Turmalin-Ring (reales Stück ①) auf dunklem Schiefer, Kampagnen-Look (3:2) | pieces.json #ring-turmalin |
| `zweifarbigkeit/detail-gold.jpg` | Makro Silber-Gold-Naht, Punzen, Strichmattierung | Technik-Illustration |
| `zweifarbigkeit/detail-kupfer.jpg` | Makro Silber-Kupfer, Punzfeld | Technik-Illustration |
| `zweifarbigkeit/band.jpg` | 5 Unikate auf Schiefer, top-down (21:9) | Editorial |
| `unikate/ring-turmalin.jpg` | Reales Stück ① — Katalog-Ansicht | pieces.json #ring-turmalin |
| `unikate/ohrstecker-dreieck.jpg` | Reales Stück ② | pieces.json #ohrstecker-dreieck |
| `unikate/halsreif-zehnreihig.jpg` | Reales Stück ③ | pieces.json #halsreif-zehnreihig |
| `unikate/ring-opal.jpg` | Illustratives Stück | pieces.json #ring-opal |
| `unikate/collier-lapislazuli.jpg` | Illustratives Stück | pieces.json #collier-lapislazuli |
| `unikate/ohrhaenger-perle.jpg` | Illustratives Stück | pieces.json #ohrhaenger-perle |
| `unikate/armreif-kupfer.jpg` | Illustratives Stück | pieces.json #armreif-kupfer |
| `unikate/brosche-chrysopras.jpg` | Illustratives Stück | pieces.json #brosche-chrysopras |
| `werkstatt/werkbank.jpg` | Werkbrett mit Punzen-Block, Sägebogen, Feilen | Atmosphäre |
| `werkstatt/haende-feile.jpg` | Hände beim Feilen (kein Gesicht) | Atmosphäre |
| `meisterin/atelier.jpg` | Atelier-Interieur: Vitrine + Werkbrett | Atmosphäre |
| `eheringe/eheringe-paar.jpg` | Zweifarbige Trauringe, punzierte Kanten | Illustration |
| `eheringe/anfertigung-detail.jpg` | Skizze + Rohling + Stein | Illustration |
| `besuch/schaufenster.jpg` | Altstadtgasse mit beleuchtetem Schaufenster (blaue Stunde) | Atmosphäre |
