import React from "react";

type ChartProps = {
    heading : string;
    subHeading : string;
    buyers : number;
    sellers : number;
    buyerLabel : string;
    sellerLabel : string;
    percent : number;
}

const BuyersSellersChart : React.FC<ChartProps> = ({
    heading,
    subHeading,
    buyers,
    sellers,
    buyerLabel,
    sellerLabel,
    percent,
}) => {

    const maxBarHeight = 180;
    const maxValue = Math.max(buyers,sellers);

    const buyersHeight = (buyers/maxValue) * maxBarHeight;
    const sellersHeight = (sellers/maxValue) * maxBarHeight;

    return(
    <section className="mb-10 mt-0">
        <h2 className="text-lg font-semibold text-white mb-2">{heading}</h2>
        <div className="text-[#B0B8B2] mb-2">{subHeading}</div>
        <div className="text-white text-3xl font-bold mb-2">
            {buyers.toLocaleString()} vs {sellers.toLocaleString()}
        </div>
        <div className="mb-4 flex items-center">
            <span className="text-[#7B8C6A]">Real-time</span>
            <span className="ml-2 text-[#FF4B4B]">{percent}%</span>
        </div>
        <div
        className="flex gap-16 justify-around items-end mb-2" 
        style={{minHeight: `${maxBarHeight + 30}px`}}
        >
            {/*buyer's bar*/}
            <div className="flex w-1/3 flex-col items-center">
                <div
                className="border-t-1 rounded-none bg-[#313E2E]"
                style={{height:`${buyersHeight}px` , width : "120%"}}
                />
                    <div className="text-center text-[#7B8C6A] mt-2">{buyerLabel}</div>
                
            </div>
            {/*seller's bar*/}
             <div className="flex w-1/3 flex-col items-center">
                <div
                className="border-t-1 rounded-none bg-[#313E2E]"
                style={{height:`${sellersHeight}px` , width : "120%"}}
                />
                    <div className="text-center text-[#7B8C6A] mt-2">{sellerLabel}</div>
                
            </div>
        </div>
    </section>
    );
};

const Dashboard : React.FC = () => (
    <div className="bg-[#0D120E] p-4">
        <BuyersSellersChart
         heading="Passive Participants (DOM)"
         subHeading="DOM Buyers vs. Sellers"
         buyers={1200}
         sellers={1500}
         buyerLabel="Buyers"
         sellerLabel="Sellers"
         percent={-20}
        />
        <BuyersSellersChart
         heading="Active Participants (Time & Sales)"
         subHeading="Time & Sales Buyers vs. Sellers"
         buyers={1900}
         sellers={2500}
         buyerLabel="Buyers"
         sellerLabel="Sellers"
         percent={-10}
        />
    </div>
)

export default Dashboard;