// App.tsx
import React from 'react';

import "/Users/vanshajrana/c++_project/Front-end/order-flow/src/index.css"
import Header from './header';
import OrderBook from './OrderBook';
import OrderFlowVisualizer from './Sections';
import TimeAndSales from './Time&Sales';
import Dashboard from './Graphs';


function App() {
  return (
    <>
   
    <Header></Header>
    <div className='flex justify-around w-screen'>
    <TimeAndSales></TimeAndSales>
    <OrderFlowVisualizer></OrderFlowVisualizer>
    </div>
    
    </>

   
  )
}


export default App;