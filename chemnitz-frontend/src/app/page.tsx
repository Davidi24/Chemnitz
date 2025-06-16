import CardCorousel from "@/components/CardCorousel";
import TestComponent from "@/components/TestComponent";
import Header from "@/components/Header/Header";
import GridCards from "@/components/gridcards/GridCards";
import About from "@/components/About";
import { cookies } from "next/headers";
import { getUser } from "@/api/userApi";
import Map from "@/components/Map/Map";

export default async function Home() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("access-token")?.value;
  let user = null;
  try {
    if (accessToken) {
      user = await getUser(accessToken);
      console.log("User:", user);
    } else {
      console.log("No access-token found in cookies.");
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  return (
    <div className="w-screen">
      <div className="flex  justify-center  ">
        <div className="max-w-[100rem] relative w-full ">
          <Header user={user} />
          <CardCorousel />
          <div className="px-8 flex flex-col gap-y-8">
            <div className="mt-20">
              <About />
            </div>
            <div className="mt-12">
              <GridCards />
            </div>
            <div>
              <Map />
            </div>
            <TestComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
