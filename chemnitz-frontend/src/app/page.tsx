// app/page.tsx
import CardCorousel from "@/components/CardCorousel";
import TestComponent from "@/components/TestComponent";
import Header from "@/components/Header/Header";
import GridCards from "@/components/gridcards/GridCards";
import About from "@/components/About";
import { User } from "@/types/User";

export default async function Home() {
  let user: User | null = null;

  try {
    const res = await fetch("http://localhost:5000/api/user/getUser", {
      // credentials option has no effect on server-side fetch in Next.js
      cache: "no-store", // optional: prevents stale user data in SSR
    });

    if (res.ok) {
      user = await res.json();
    } else {
      console.error("Failed to fetch user:", res.statusText);
    }
  } catch (e) {
    console.error("Error fetching user:", e);
  }

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="max-w-[400rem]">
        <Header user={user} />
        <CardCorousel />
        <div className="px-8 flex flex-col gap-y-8">
          {/* <div className="mt-20">
            <About />
          </div> */}
          {/* <div className="mt-12">
            <GridCards />
          </div> */}
          <TestComponent />
        </div>
      </div>
    </div>
  );
}
