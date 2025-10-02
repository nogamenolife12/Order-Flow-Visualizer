import React, { useEffect, useState } from "react";

type SaleRow = {
    T : number;
    p: string;
}




const TimeAndSales : React.FC = () => {
    const[timeSalesData,setTnD] = useState<SaleRow[]>([]); 

     const formatTime = (timestamp: number) => {
         return new Date(timestamp).toLocaleTimeString('en-US', { 
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).replace(/ AM| PM/, '');
    };

    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:9001/time-sales");

        ws.onopen = () =>{
            console.log("T&D connected");
        };

        ws.onmessage = (event) =>{
           
            let data = JSON.parse(event.data);

             setTnD(prev =>[
                {
                    T : data.T,
                    p : data.p
                },
                ...prev.slice(0,9)
             ]);

        };

        ws.onclose = ()=>{console.log("TnD closed")};
        ws.onerror = (err) => {console.log(err)};

        return() => ws.close();
    },[]);

    return(
        <section className=" my-4 w-[350px] min-w-[300px] max-w-[400px] px-6 py-4 min-h-[360px]">
            <h2 className="text-lg font-semibold mb-3 text-white">Time & Sales</h2>
            <div className="rounded-md border border-[#212D21] bg-[#0D120E] overflow-x-auto">
                <table className="min-w-full rounded-md">
                    <thead >
                        <tr className="bg-[#161F16]">
                            <th className="px-8 py-3 text-left text-xs font-medium text-[#B0B8B2]">Time</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-[#B0B8B2]">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                      {timeSalesData.map((row, idx) => (
                            <tr key={idx} className="border-t border-[#212D21]">
                                <td className="px-8 py-4 text-[#B0B8B2] text-base">
                                    {formatTime(row.T)}
                                </td>
                                <td className="px-8 py-4 text-[#B0B8B2] text-base">
                                    {parseFloat(row.p).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </section>

    )
}

export default TimeAndSales;