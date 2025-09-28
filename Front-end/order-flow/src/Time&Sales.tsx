import React from "react";

type SaleRow = {
    time : String;
    price : number;
}

const timeSalesData: SaleRow[] = [
  { time: "10:30:00", price: 150.50 },
  { time: "10:30:01", price: 150.75 },
  { time: "10:30:02", price: 150.25 },
  { time: "10:30:03", price: 150.50 },
  { time: "10:30:04", price: 150.00 },
  { time: "10:30:05", price: 150.25 },
  { time: "10:30:06", price: 150.75 },
  { time: "10:30:07", price: 150.50 },
  { time: "10:30:08", price: 150.00 },
  { time: "10:30:09", price: 150.25 },
];

const TimeAndSales : React.FC = () => {
    return(
        <section className=" my-4 w-[350px] min-w-[300px] max-w-[400px] px-6 py-4 ">
            <h2 className="text-lg font-semibold mb-3 text-white">Time & Sales</h2>
            <div className="rounded-md border border-[#212D21] bg-[#0D120E] overflow-x-auto">
                <table className="min-w-full rounded-md">
                    <thead>
                        <tr className="bg-[#161F16]">
                            <th className="px-8 py-3 text-left text-xs font-medium text-[#B0B8B2]">Time</th>
                            <th className="px-8 py-3 text-left text-xs font-medium text-[#B0B8B2]">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       {timeSalesData.map((row,idx) =>(
                        <tr key={idx} className="border-t  border-[#212D21]">
                            <td className="px-8 py-4 text-[#B0B8B2] text-base ">{row.time}</td>
                            <td className="px-8 py-4 text-[#B0B8B2] text-base ">{row.price.toFixed(2)}</td>
                        </tr>
                       ))}
                    </tbody>
                </table>
            </div>
        </section>

    )
}

export default TimeAndSales;