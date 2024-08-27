import CovidGraph from "@/components/ChartsMapsComponent/CovidGraph"
import dynamic from "next/dynamic"

const page = () => {
  // As a SSR component our page can’t handle with map importing by default that would produce an error, 
  // so we can use dynamic from Next to import a component “turning off” the SSR strategy
  const CovidMap = dynamic(() => import("@/components/ChartsMapsComponent/CovidMap"), { ssr: false })

  return (
    <>
      <div className="px-10 md:px-20 py-8">
        {/* Section for displaying the COVID-19 cases over time graph */}
        <h2 className="text-xl md:text-2xl font-medium">COVID-19 Cases Over Time</h2>
        <p className="mb-[12px]">Data showing the progression of COVID-19</p>
        <CovidGraph />

        {/* Section for displaying the global COVID-19 case distribution map */}
        <h2 className="text-xl md:text-2xl font-medium mt-[12px]">Global COVID-19 Case Distribution</h2>
        <p className="mb-[12px]">Visual representation of COVID-19 cases across different countries</p>
        <CovidMap />
      </div>
    </>
  )
}

export default page