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

const app = App();

app.ws("\*",{

  open: (ws: uWSWebSocket<unknown>) => {
  console.log("Client Connected");
  
  let interval : NodeJS.Timer;
  interval = setInterval(()=>{
     ws.send(JSON.stringify(orderBookData))
  },10000);

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

app.listen(9001,(listenSocket) =>{
  if(listenSocket){
    console.log('Server listening on port 9001');
  }else{
    console.log('Failed to listen on port 9001');
  }
})