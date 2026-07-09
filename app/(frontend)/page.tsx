import { getSiteContent } from "@/lib/content";
import { DEFAULTS, toHeroSlides } from "@/lib/defaults";
import { Hero } from "./components/Hero";
import { Zweifarbigkeit } from "./components/Zweifarbigkeit";
import { Unikate } from "./components/Unikate";
import { Werkstatt } from "./components/Werkstatt";
import { Meisterin } from "./components/Meisterin";
import { Eheringe } from "./components/Eheringe";
import { Besuch } from "./components/Besuch";
import { Footer } from "./components/Footer";

export const revalidate = 60;

export default async function Home() {
  const c = await getSiteContent();
  const heroSlides = toHeroSlides(c.pieces);
  const slides = heroSlides.length > 0 ? heroSlides : toHeroSlides(DEFAULTS.pieces);

  return (
    <div className="flex flex-col">
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero content={c.hero} slides={slides} atelier={c.atelier} nav={c.nav} />
        <Zweifarbigkeit content={c.zweifarbigkeit} />
        <Unikate content={c.unikate} pieces={c.pieces} atelier={c.atelier} />
        <Werkstatt content={c.werkstatt} />
        <Meisterin content={c.meisterin} timeline={c.timeline} />
        <Eheringe content={c.eheringe} atelier={c.atelier} />
        <Besuch
          content={c.besuch}
          atelier={c.atelier}
          hours={c.hours}
          hoursNote={c.hoursNote}
        />
      </div>
      <Footer atelier={c.atelier} footer={c.footer} />
    </div>
  );
}
