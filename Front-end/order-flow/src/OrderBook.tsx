import React from "react"
import { Table } from "./components/ui/table"
import { ChevronUp, ChevronDown } from "lucide-react";

type OrderRow = {
    bidSize : number;
    bidPrice : number;
    askPrice : number;
    askSize : number;
}

const orderBookData: OrderRow[] = [
  { bidSize: 120, bidPrice: 150.25, askPrice: 150.50, askSize: 80 },
  { bidSize: 150, bidPrice: 150.00, askPrice: 150.75, askSize: 100 },
  { bidSize: 100, bidPrice: 149.75, askPrice: 151.00, askSize: 120 },
  { bidSize: 80, bidPrice: 149.50, askPrice: 151.25, askSize: 150 },
  { bidSize: 120, bidPrice: 149.25, askPrice: 151.50, askSize: 100 },
  { bidSize: 100, bidPrice: 149.00, askPrice: 151.75, askSize: 80 },
  { bidSize: 150, bidPrice: 148.75, askPrice: 152.00, askSize: 120 },
  { bidSize: 80, bidPrice: 148.50, askPrice: 152.25, askSize: 100 },
  { bidSize: 120, bidPrice: 148.25, askPrice: 152.50, askSize: 150 },
  { bidSize: 100, bidPrice: 148.00, askPrice: 152.75, askSize: 80 },
];


const OrderBook : React.FC = () =>{

    return(
    <section className="px-6 py-0 ">
        <h2 className="text-lg text-white font-semibold mb-4">Order Book</h2>
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
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.bidSize}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.bidPrice.toFixed(2)}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.askPrice.toFixed(2)}</td>
                            <td className="px-20 py-4 text-[#B0B8B2]">{row.askSize}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>

    </section>
    )
}


export default OrderBook