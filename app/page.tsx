import Hero from "@/components/hero";
import Slider from "@/components/Slider";
import Main from "@/components/main";

export default function Home() {
  return (
  <div>
      <Slider />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Source Code</h1>
          <p className="py-3">
            Daftar Source Code Website Dan Android Mobile
          </p>
        </div>
        <Main />
      </div>
  </div>
  );
}
