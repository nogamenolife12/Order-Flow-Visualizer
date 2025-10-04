import { json } from 'stream/consumers';
import { App } from 'uWebSockets.js';
import type { WebSocket as uWSWebSocket } from 'uWebSockets.js';


const app = App();

app.ws("/orderbook",{

  open: (ws: uWSWebSocket<unknown>) => {
  console.log("Client Connected");
  
  let wss = new WebSocket('wss://stream.binance.com/ws/bnbusdt@depth20@100ms');

  wss.onmessage = (event)=>{
    try{
    const data = JSON.parse(event.data);
    let formattedData = formattedOrders(data); 
    ws.send(JSON.stringify(formattedData));
    }catch(err){
      console.log(err); 
    }
  }

  (ws as any).wss = wss;
  
  },
  
  close: (ws: uWSWebSocket<unknown>) =>{
    (ws as any).wss?.close();
    console.log("Client disconnected");
  },

  message: (ws : uWSWebSocket<unknown>,message,isBinary) =>{
      console.log(message,isBinary);
  },


});

function formattedOrders(data : any){
  const bids = data.bids.slice(0, 10).map((bid: string[]) => ({
   bidSize: parseFloat(bid[1] || "0"),
    bidPrice: parseFloat(bid[0] || "0")
  }));

  // Take top 10 asks (already sorted lowest to highest)  
  const asks = data.asks.slice(0, 10).map((ask: string[]) => ({
    askSize: parseFloat(ask[1] || "0"),
    askPrice: parseFloat(ask[0] || "0")
  }));

  // Combine into rows
  const orderBookRows = [];
  for (let i = 0; i < 10; i++) {
    orderBookRows.push({
      bidSize: bids[i]?.bidSize || 0,
      bidPrice: bids[i]?.bidPrice || 0,
      askPrice: asks[i]?.askPrice || 0,
      askSize: asks[i]?.askSize || 0
    });
  }

  return orderBookRows;
}

app.ws("/time-sales",{

  open:(ws:uWSWebSocket<unknown>) =>{
    console.log("Time&Sales Client connected");
  
    let wss = new WebSocket('wss://fstream.binance.com/ws/bnbusdt@aggTrade');

    wss.onmessage = (event) =>{
      ws.send(event.data);
    }

    (ws as any).wss = wss;

  },

  close:(ws:uWSWebSocket<unknown>)=>{
    (ws as any).wss?.close();
    console.log("Time&Sales client disconected");
  },

  message:(ws:uWSWebSocket<unknown>,message,isBinary) =>{
      console.log(message,isBinary);
  }

  
});

app.listen(9001,(listenSocket) =>{
  if(listenSocket){
    console.log('Server listening on port 9001');
  }else{
    console.log('Failed to listen on port 9001');
  }
})