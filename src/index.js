import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./CartContext";
import "./index.css";
import "./source/styles/Global.scss"
import "./source/styles/mixin.scss"
import "./source/styles/RalewayFont/ralewayFont.scss"
import "./source/styles/ActayWideFont/actayWideFont.scss"
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
     <CartProvider>
       <App/>
     </CartProvider>
   </BrowserRouter>,
);


