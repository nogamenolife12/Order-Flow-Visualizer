import { json } from 'stream/consumers';
import { App } from 'uWebSockets.js';
import type { WebSocket as uWSWebSocket } from 'uWebSockets.js';

const orderBookData = [
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

// const timeSalesData = [
//   { time: "10:30:00", price: 150.50 },
//   { time: "10:30:01", price: 150.75 },
//   { time: "10:30:02", price: 150.25 },
//   { time: "10:30:03", price: 150.50 },
//   { time: "10:30:04", price: 150.00 },
//   { time: "10:30:05", price: 150.25 },
//   { time: "10:30:06", price: 150.75 },
//   { time: "10:30:07", price: 150.50 },
//   { time: "10:30:08", price: 150.00 },
//   { time: "10:30:09", price: 150.25 },
// ];


const app = App();

app.ws("/orderbook",{

  open: (ws: uWSWebSocket<unknown>) => {
  console.log("Client Connected");

  let index = 0;
  
  let interval : NodeJS.Timer;
  interval = setInterval(()=>{
     ws.send(JSON.stringify(orderBookData[index]));
     index = (index + 1) % orderBookData.length;
  },900);

    (ws as any).interval = interval;
  
  },

  close: (ws: uWSWebSocket<unknown>) =>{
    clearInterval((ws as any).interval);
    console.log("Client disconnected");
  },

  message: (ws : uWSWebSocket<unknown>,message,isBinary) =>{
      console.log(message,isBinary);
  },


  

});

app.ws("/time-sales",{

  open:(ws:uWSWebSocket<unknown>) =>{
    console.log("Time&Sales Client connected");
    // let index = 0;

    // let interval : NodeJS.Timer;
    // interval = setInterval(()=>{
    //   ws.send(JSON.stringify(timeSalesData[index]));
    //   index = (index + 1) % timeSalesData.length;
    // },1000);

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