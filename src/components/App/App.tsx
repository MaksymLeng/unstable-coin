import {NavBar} from "@/components/NavBar/NavBar.tsx";
import BackgroundGraph from "@/components/BackgroundGraph/BackgroundGraph.tsx";

function App() {

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-blue-100">
        <NavBar/>
        <BackgroundGraph
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
            color="#0a2bd8"
            lineWidth={5}
            speed={10}
            stepX={1}
            amplitude={220}
            jitterX={2}
            jitterY={2}
        />

    </div>
  )
}

export default App
