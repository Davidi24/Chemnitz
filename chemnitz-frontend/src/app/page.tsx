import CardCorousel from "@/components/CardCorousel";
import TestComponent from "@/components/TestComponent";
import Header from "@/components/Header/Header";
import PlacesContainer from "@/components/gridcards/PlacesContainer";
import About from "@/components/About/About";
import { cookies } from "next/headers";
import { getUser } from "@/api/userApi";
import Map from "@/components/Map/Map";
import { UserProvider } from "@/components/Auth";
import Footer from "@/components/Footer";
import SmallHeader from "@/components/Header/SmallHeader";

export default async function Home() {
  return (
    <div className="w-screen max-w-full">
      <div className="flex  justify-center  ">
        <div className="max-w-[100rem] relative w-full " id="home">
          <Header />
          <CardCorousel />
          <div className="px-2 lg:px-4 flex flex-col gap-y-8">
            <div className="mt-24 xl:px-8" id="about">
              <About />
            </div>
            <div className="mt-12" id="map">
              <PlacesContainer />
            </div>
            <div className="" id="contacts"></div>
            <div id="contacts">
              <Footer />
            </div>
            {/* <TestComponent /> */}
          </div>
        </div>
      </div>
    </div>

  );
}
