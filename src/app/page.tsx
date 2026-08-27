import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Work from "@/components/sections/Work";
import WhyMQ from "@/components/sections/WhyMQ";
import Contact from "@/components/sections/Contact";
import HeroSceneHandoff from "@/components/three/HeroSceneHandoff";

export default function Home() {
  return (
    <>
      <HeroSceneHandoff />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Process />
      <Work />
      <WhyMQ />
      <Contact />
    </>
  );
}
