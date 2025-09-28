import React , {useState} from "react";
import OrderBook from "./OrderBook";
import Dashboard from "./Graphs";

const Graphs : React.FC = () => (
  <div className="mt-8">
    <div className="text-white">Market activity graphs go here.</div>
  </div>
);

 const OrderFlowVisualizer = () => {
    const[activeTab,setActiveTab] = useState<"Ladder" | "Graphs">("Ladder")

    return(
        <section className="p-8 m-20 mt-0 w-full ">
            <h2 className="text-4xl font-bold text-white mb-8">OrderFlow Visualizer</h2>
            <div className="flex bg-[#283227] overflow-hidden mb-4">
                <button
                    className={`flex-1 py-3 text-lg font-medium transition text-center !outline-none !rounded-none !ring-0 ${
                        activeTab == "Ladder"
                        ? "bg-[#161F16] text-white"
                        : "bg-transparent text-[#B0B8B2]"
                    }`}
                    onClick={()=>setActiveTab("Ladder")}
                >
                 Ladder
                </button>
                <button
                 className={`flex-1 py-3 text-lg font-medium transition text-center  !rounded-none !outline-none !ring-0${
                        activeTab == "Graphs"
                        ? "bg-[#161F16] text-white"
                        : "bg-transparent text-[#B0B8B2]"
                    }`}
                    onClick={()=>setActiveTab("Graphs")}
                >
                    Graphs
                </button>
            </div>

          
             {activeTab === "Ladder" ? <OrderBook/> : <Dashboard/>}
        </section>
    )
}

export default OrderFlowVisualizer;

