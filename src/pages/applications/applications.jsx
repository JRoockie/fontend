import React, {useEffect, useState} from "react";
import "./applications.scss";
import {Link} from "react-router-dom";
import Embed from "../../source/images/Сам элемент.png";
import {useCartContext} from "../../CartContext";

function Applications() {
  
  const {main, setMain, newOrders, finOrders, setAuthorization, cookies, setCookie} = useCartContext()
  
  const [finLength, setFinLength] = useState(0)
  const [newLength, setNewLength] = useState(0)
  useEffect(()=>{
    finOrders.map((el)=>{
      if (el.deletedWhen === null){
        setFinLength(prev => prev + 1)
      }
    })
    newOrders.map((el)=>{
      if (el.deletedWhen === null){
        setNewLength(prev => prev +1)
      }
    })
  }, [])
  
  return (
     <div className="applications G-flex-wrap">
       
       
         <Link onClick={()=>{
           setMain(false)
         }} to="/finOrders" className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{finLength}</div>
           <p className="header">ОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>
       
       
       
         <Link onClick={()=>{
           setMain(false)
         }} to="/newOrders" className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{newLength}</div>
           <p className="header">НЕОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>
       
        <Link className="logOutLink G-block" onClick={()=>{
          setAuthorization(true)
          setCookie('token', '')
        }} to="/login">
          Выйти из учётной записи
        </Link>
       
     </div>
  );
}

export default Applications;