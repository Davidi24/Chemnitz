import CardCorousel from "@/components/CardCorousel";
import TestComponent from "@/components/TestComponent";
import Header from "@/components/Header";
import GridCards from "@/components/gridcards/GridCards";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center ">
      <div className="max-w-[400rem]">
        <Header />
        <CardCorousel />
        <div className="px-8 flex flex-col gap-y-8">
          <div className="mt-20">
            <About/>
          </div>
          <div className="mt-12">
            <GridCards />
          </div>
          <TestComponent />
        </div>
      </div>
    </div>
  );
}
