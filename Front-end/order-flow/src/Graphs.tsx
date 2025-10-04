import React, { useEffect, useState } from "react";

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
    const maxValue = Math.max(buyers,sellers) || 1;

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
            <span className={`ml-2 ${percent >= 0 ? 'text-[#02ff2c]' : 'text-[#FF4B4B]'}`}>
                {percent > 0 ? '+' : ''}{percent}%
            </span>
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



type OrderBookRow = {
    bidSize : number;
    bidPrice : number;
    askPrice : number;
    askSize : number;
}

type TradeRow = {
    T : number;
    p : string;
    q : string;
    m : boolean;
}

const Dashboard : React.FC = () => {
    const[orderBookData , setOrderData] = useState<OrderBookRow[]>([]);
    const[tradeData , setTradeData] = useState<TradeRow[]>([]);

    useEffect(()=>{

        let ws = new WebSocket("ws://localhost:9001/orderbook");

        ws.onmessage = (event) =>{
            try{
                const data = JSON.parse(event.data);
                setOrderData(data);
            }catch(err){
                console.log("OrderBook data parsing error " , err);
            }
        };

        ws.onerror = (error) =>{
            console.log("OrderBook Websocket error" , error);
        }

        return ()=>ws.close();
    },[]);

    useEffect(()=>{

        let ws = new WebSocket("ws://localhost:9001/time-sales");

        ws.onmessage = (event) =>{
            try{
                const data = JSON.parse(event.data);
                setTradeData((prev =>[data,...prev.slice(0,49)]));
            }catch(err){
                console.log("Trades data parsing error " , err);
            }
        };

        ws.onerror = (error) =>{
            console.log("Trades Websocket error" , error);
        }

        return ()=>ws.close();
    },[]);

    const calcDomPressure = () : {
        buyers : number;
        sellers : number;
        percent : number;
    } => {
        
        if(orderBookData.length == 0){
            return {buyers : 0,sellers : 0,percent: 0};
        }

        let totalBidSize = 0;
        let totalAskSize = 0;

        orderBookData.forEach(row => {
            totalBidSize += row.bidSize;
            totalAskSize += row.askSize;
        });

        const percentDifference = totalBidSize + totalAskSize > 0 
                                  ? ((totalBidSize - totalAskSize) / (totalBidSize + totalAskSize)) * 100 
                                  : 0 ;

        return {
            buyers : Math.round(totalBidSize),
            sellers : Math.round(totalAskSize),
            percent : Math.round(percentDifference)
        };
    }

    const calcTradePressure = () : {
        buyers : number;
        sellers : number;
        percent : number;
    } => {
        
        if(tradeData.length == 0){
            return {buyers : 0,sellers : 0,percent: 0};
        }

        let buyerVolume = 0;
        let sellerVolume = 0;

        tradeData.forEach(trade => {
           const quantity = parseFloat(trade.q || "0");
           if(trade.m){
            sellerVolume += quantity
           }else{
            buyerVolume +=quantity;
           }
        });

        const percentDifference = buyerVolume + sellerVolume > 0 
                                  ? ((buyerVolume - sellerVolume) / (buyerVolume + sellerVolume)) * 100 
                                  : 0 ;

        return {
            buyers : Math.round(buyerVolume),
            sellers : Math.round(sellerVolume),
            percent : Math.round(percentDifference)
        };
    }

    const domPressure = calcDomPressure();
    const tradePressure = calcTradePressure();


    return(
     <div className="bg-[#0D120E] p-4">
        <BuyersSellersChart
         heading="Passive Participants (DOM)"
         subHeading="DOM Buyers vs. Sellers"
         buyers={domPressure.buyers}
         sellers={domPressure.sellers}
         buyerLabel="Buyers"
         sellerLabel="Sellers"
         percent={domPressure.percent}
        />
        <BuyersSellersChart
         heading="Active Participants (Time & Sales)"
         subHeading="Time & Sales Buyers vs. Sellers"
         buyers={tradePressure.buyers}
         sellers={tradePressure.sellers}
         buyerLabel="Buyers"
         sellerLabel="Sellers"
         percent={tradePressure.percent}
        />
    </div>
    )
}

export default Dashboard;