import React, {useEffect, useState} from "react";
import "./applications.scss";
import {Link} from "react-router-dom";
import Embed from "../../source/images/Сам элемент.png";
import {useCartContext} from "../../CartContext";

function Applications() {

  const {main, setMain, newOrders, finOrders, setAuthorization, cookies, setCookie, setAvaFin, setAvaNew} = useCartContext()

  const [finLength, setFinLength] = useState(0)
  const [newLength, setNewLength] = useState(0)
  useEffect(()=>{
    finOrders.map((el)=>{
        let x = 1
        if (el.deletedWhen === null){
            x=x+1
        setFinLength(prev => prev + 1)
          setAvaFin(true)
      }


    })


    newOrders.map((el)=>{
        let x = 1
      if (el.deletedWhen === null){
          x= x+1
        setNewLength(prev => prev +1)
          setAvaNew(true)
      }
    })

  }, [])

  return (
     <div className="applications G-flex-wrap">


         <Link onClick={()=>{
           setMain(false)
         }} to={`${finLength >=1 ? "/finOrders" : "/"}`} className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{finLength}</div>
           <p className="header">ОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>



         <Link onClick={()=>{
           setMain(false)
         }} to={`${newLength >=1 ? "/newOrders" : "/"}`} className="Embed G-flex-center G-alignItems-center G-flex-column">
           <div className="num">{newLength}</div>
           <p className="header">НЕОБРАБОТАННЫЕ</p>
           <p className="prg">ЗАЯВКИ</p>
           <img src={Embed} alt=""/>
         </Link>

        <Link className="logOutLink G-block" onClick={()=>{
          setAuthorization(true)
          setCookie('token', '')
        }} to="/">
          Выйти из учётной записи
        </Link>

     </div>
  );
}

export default Applications;