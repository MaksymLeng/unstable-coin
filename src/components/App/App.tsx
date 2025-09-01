import {NavBar} from "@/components/NavBar/NavBar.tsx";
import BackgroundGraph from "@/components/BackgroundGraph/BackgroundGraph.tsx";
import {Outlet} from "react-router-dom";
import FooterNav from "@/components/FooterNav/FooterNav.tsx";
import {useCoinStore} from "@/store/useCoinStore.ts";
import {useEffect} from "react";
import {TOKEN, POOL} from "@/data/TokenData.ts";

function App() {

    const load = useCoinStore((state) => state.loadFromGecko);

    useEffect(() => {
        load({ pool: POOL, token: TOKEN });
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
