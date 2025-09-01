import {NavBar} from "@/components/NavBar/NavBar.tsx";
import BackgroundGraph from "@/components/BackgroundGraph/BackgroundGraph.tsx";
import {Outlet} from "react-router-dom";
import FooterNav from "@/components/FooterNav/FooterNav.tsx";
import {useCoinStore} from "@/store/useCoinStore.ts";
import {useEffect} from "react";

const POOL = "BAX9M9a5FVy5cNiewwnuwkVDzhSg9psZnb4fJ9r677tN";
const TOKEN = "CB9dDufT3ZuQXqqSfa1c5kY935TEreyBw9XJXxHKpump";

function App() {

    const load = useCoinStore((s) => s.loadFromGecko);

    useEffect(() => {
        load({ pool: POOL, token: TOKEN, timeframe: "day" });
    }, [load]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-100">

        <BackgroundGraph
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
            color="#50a2ff"
            lineWidth={5}
            speed={10}
            stepX={1}
            amplitude={220}
            jitterX={2}
            jitterY={2}
        />
        <div className="relative z-10 min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-1 mx-3">
                <Outlet />
            </main>
            <FooterNav />
        </div>
    </div>
  )
}

export default App
