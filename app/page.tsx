import { Hero } from "./components/Hero";
import { Zweifarbigkeit } from "./components/Zweifarbigkeit";
import { Unikate } from "./components/Unikate";
import { Werkstatt } from "./components/Werkstatt";
import { Meisterin } from "./components/Meisterin";
import { Eheringe } from "./components/Eheringe";
import { Besuch } from "./components/Besuch";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* z-10 + solid background so the page slides over the sticky footer
          (curtain reveal) */}
      <div className="relative z-10 flex flex-col bg-background">
        <Hero />
        <Zweifarbigkeit />
        <Unikate />
        <Werkstatt />
        <Meisterin />
        <Eheringe />
        <Besuch />
      </div>
      <Footer />
    </div>
  );
}
