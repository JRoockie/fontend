import React from "react";
import "./applications.scss";
import {Link} from "react-router-dom";
import Embed from "../../source/images/Сам элемент.png";
import {useCartContext} from "../../CartContext";

function Applications() {
  
  const {newOrders, finOrders, setAuthorization} = useCartContext()
  
  
  return (
     <div className="applications G-flex-wrap">
       
       
         <Link to="/finOrders" className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{finOrders.length}</div>
           <p className="header">ОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>
       
       
       
         <Link to="/newOrders" className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{newOrders.length}</div>
           <p className="header">НЕОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>
       
        <Link className="logOutLink G-block" onClick={()=>setAuthorization(false)} to="/login">
          Выйти из учётной записи
        </Link>
       
     </div>
  );
}

export default Applications;