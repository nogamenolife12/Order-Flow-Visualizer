import React, { useEffect, useState } from "react"
import { Table } from "./components/ui/table"
import { ChevronUp, ChevronDown } from "lucide-react";
import { Server } from "http";

type OrderRow = {
    bidSize : number;
    bidPrice : number;
    askPrice : number;
    askSize : number;
}

const OrderBook : React.FC = () =>{

    const [orderBookData , setOrder] = useState<OrderRow[]>([]);

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:9001/orderbook");

        ws.onopen = () =>{
            console.log('Connected to Server');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setOrder(data);
            
        };

        ws.onclose = () =>{console.log("closed")};
        ws.onerror = (err) =>{console.log(err)};

        return ()=> ws.close();

    },[]);

    return(
    <section className="px-6 py-0 min-h-[500px] w-full">
        <h2 className="text-lg text-white font-semibold mb-4">Passive Actvity</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-[#0D120E] rounded-md border border-[#212D21]">
                <thead>
                    <tr className="bg-[#161F16]">
                        <th className="px-20 py-3 text-left text-xs font-medium text-[#B0B8B2]">Bid Size</th>
                        <th className="px-20 py-3 text-left text-xs font-medium text-[#B0B8B2]">
                            <span className="inline-flex items-center gap-1">
                                Bid Price <ChevronUp className="w-3 h-3 text-green-500 inline" />
                            </span>
                        </th>
                        <th className="px-20 py-3 text-left text-xs font-medium text-[#B0B8B2]">
                            <span className="inline-flex items-center gap-1">
                                 Ask Price <ChevronDown className="w-3 h-3 text-red-500 inline" />
                             </span>
                        </th>
                        <th className="px-18 py-3 text-left text-xs font-medium text-[#B0B8B2]">Ask Size</th>
                    </tr>
                </thead>
                <tbody>
                    {orderBookData.map((row,idx) => (
                        <tr key={idx} className="border-t border-[#212D21]">
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.bidSize.toLocaleString()}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.bidPrice.toFixed(2)}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.askPrice.toFixed(2)}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.askSize.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    </section>
    )
}


export default OrderBook