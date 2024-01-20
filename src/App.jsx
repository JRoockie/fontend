import "./App.scss";
import React from "react";
import {Vectors} from "./source/backgroundVectors/vectors";
import Authorization from "./pages/Authorization/Authorization";
import {Route, Routes} from "react-router-dom";
import Applications from "./pages/applications/applications";
import {useCartContext} from "./CartContext";
import FinOrders from "./pages/finOrders/finOrders";
import NewOrders from "./pages/newOrders/newOrders";
import Songs from "./pages/songs/songs";


function App() {
  
  const {
          authorization,
          setAuthorization,
          Data
        } = useCartContext();
  
  
  function Render (){
    if (authorization){
      return<Authorization />
    } else {
      return (
         <Routes>
           <Route path="/" element={<Applications/>}/>
           <Route path="/login" element={<Authorization/>}/>
           <Route path="/finOrders" element={<FinOrders/>}/>
           <Route path="/newOrders" element={<NewOrders/>} />
           <Route path="/songs" element={<Songs/>} />
         </Routes>
      )
    }
  }
  
  
  return (
     <div className="App">
       
       
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v1s} alt=""/>
         <img className="vs" src={Vectors.vector1} alt=""/>
       </div>
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v2s} alt=""/>
         <img className="vs" src={Vectors.vector2} alt=""/>
       </div>
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v3s} alt=""/>
         <img className="vs" src={Vectors.vector3} alt=""/>
       </div>
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v4s} alt=""/>
         <img className="vs" src={Vectors.vector4} alt=""/>
       </div>
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v5s} alt=""/>
         <img className="vs" src={Vectors.vector5} alt=""/>
       </div>
       <div className="VectorsB">
         <img className="vs v" src={Vectors.v6s} alt=""/>
         <img className="vs" src={Vectors.vector6} alt=""/>
       </div>
       
       <Render />
       
       
       <img className="eclipses1" src={Vectors.vector7} alt=""/>
       <img className="eclipses2" src={Vectors.vector8} alt=""/>
       <img className="eclipses3" src={Vectors.vector9} alt=""/>
       <img className="eclipses4" src={Vectors.vector10} alt=""/>
     
     
     </div>
  );
}

export default App;

