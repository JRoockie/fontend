import React, {useEffect, useState} from "react";
import {Icons} from "../../source/icons/Icons";
import {useCartContext} from "../../CartContext";
import "../finOrders/finOrders.scss"
import {Link, useNavigate} from "react-router-dom";

function NewOrders (){
  const {newOrders, active, setActive, setSongsData} = useCartContext()
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  
  // const {finOrders, setFinOrders} = useCartContext()
  
  // useEffect(()=>{
  //
  // }, [active, setActive, newOrders])
  
  function OpenOrder (el){
    setActive(el)
  }
  function SetSongs (){
    setSongsData(active)
  }
  
  
  
  
  
  return(
     <div className="OrdersList G-container">
       <div className="headerBlock G-flex-center G-alignItems-center">
         <div onClick={goBack} className="backButton">
           <img src={Icons.arrowLeft} alt=""/>
         </div>
         <p className="header">НЕОБРАБОТАННЫЕ  <span>ЗАЯВКИ</span></p>
       </div>
     
       <div className="main">
         <div className="listBlock">
           {newOrders.map((ell, index)=>{
             return(
                <div  key={index} onClick={()=>{
                  OpenOrder(ell)
                }} className={`LinkToOrder ${active === ell ? "active" : ""}`}>
                  <img src={Icons.whiteMark} alt=""/>
                  <p className="name">{ell.nameAsClient}</p>
                
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                    <path d="M2 2L23.5 23.5M23.5 23.5V2M23.5 23.5H2" stroke="#DC1989" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
             )
           })}
         </div>
       
         <div className="source">
           <div className="nameText block">
             <p className="name">{active.nameAsClient}</p>
             <p className="prg">{active.comment}</p>
           </div>
         
           <div className="data block"><span>Дата:</span>{active.date[2] < 10 ? `0${active.date[2]}`: active.date[2]}.{active.date[1] < 10 ? `0${active.date[1]}` : active.date[1]}.{active.date[0]}</div>
           <div className="time block"><span>Время:</span>{active.date[3]}:{active.date[4]}</div>
         
           <div className="price block"><span>Цена:</span>{active.price}</div>
           <Link to="/songs" onClick={SetSongs} className="songs G-block block"><span>Песни:</span>{active.songs.length}</Link>
         
           <div className="number block"><span>Номер:</span>{active.phoneNumber}</div>
         
           <div className="delete G-block block">УДАЛИТЬ ЗАКАЗ</div>
           <div className="submit">ЗАПИСАН</div>
       
         </div>
     
       </div>
   
   
   
   
     </div>
  )
}

export default NewOrders