import React, {useEffect, useState} from "react";
import {Icons} from "../../source/icons/Icons";
import {useCartContext} from "../../CartContext";
import "../finOrders/finOrders.scss"
import {Link, useNavigate} from "react-router-dom";
import {render} from "react-dom";

function NewOrders (){
  const {main, setMain, newOrders, active, setActive, setSongsData, HandleDelete, HandleSetFin} = useCartContext()
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
  
  const [mobileApp, setMobileApp] = useState(false)
  useEffect(()=>{
    if (window.innerWidth <=992){
      setMobileApp(true)
    }
  }, [])
  
  
  function HandleLink (){
    if (mobileApp){
      setMain(true)
      
      
    }
  }
  
  
  const [data, setData] = useState("")
  const [time, setTime] = useState("")
  // useEffect(()=>{
  //   let arr = active.date.split('')
  //   let Date = "" + arr[0] + arr[1] + arr[2] + arr[3] + arr[4] + arr[5] + arr[6] + arr[7] + arr[8] + arr[9]
  //   let Time = "" + arr[11] + arr[12] + arr[13] + arr[14] + arr[15]
  //   setData(Date)
  //   setTime(Time)
  // }, [active])
  
  
  return(
     <div className="OrdersList G-container">
       <div className="headerBlock G-flex-center G-alignItems-center">
         <div onClick={goBack} className="backButton">
           <img onClick={goBack} style={{display: `${mobileApp ? `${main ? "none" : "block"}` : "block"}`}} src={Icons.arrowLeft} alt=""/>
           <img onClick={()=> setMain(false)} style={{display: `${mobileApp ? `${main ? "block" : "none"}` : "none"}`, position: "relative", zIndex: 9999}} src={Icons.arrowLeft} alt=""/>
         </div>
         <p className="header">НЕОБРАБОТАННЫЕ  <span>ЗАЯВКИ</span></p>
       </div>
     
       <div className="main">
         <div className="listBlock">
           {newOrders.map((ell, index)=>{
             
             
             
             
             let name = ell.nameAsClient ? ell.nameAsClient : "name"
             if (ell.deletedWhen === null) {
  
               return (
                  <div key={index} onClick={() => {
                    OpenOrder(ell)
                  }} className={`LinkToOrder ${active.id === ell.id ? "active" : ""}`}>
                    <img src={Icons.whiteMark} alt=""/>
                    <p className="name">{name}</p>
       
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path d="M2 2L23.5 23.5M23.5 23.5V2M23.5 23.5H2" stroke="#DC1989" strokeWidth="3"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
               )
             }
           })}
           
         </div>
       
         <div className="source">
           <div className="nameText block">
             <p className="name">{active.nameAsClient}</p>
             <p className="prg">{active.comment}</p>
           </div>
         
           <div className="data block"><span>Дата:</span>{active.date[0]}.{active.date[1]}.{active.date[2]}</div>
           <div className="time block"><span>Время:</span>{active.date[3]}:{active.date[4]}</div>
         
           <div className="price block"><span>Цена:</span>{active.price}</div>
           <Link to="/songs" onClick={SetSongs} className="songs G-block block"><span>Песни:</span>{active.songs.length}</Link>
         
           <div className="number block"><span>Номер:</span>{active.phoneNumber}</div>
         
           <div onClick={()=>{
             HandleDelete(active.id)
           }} className="delete G-block block">УДАЛИТЬ ЗАКАЗ</div>
           <div onClick={()=>{
             HandleSetFin(active.id)
           }} className="submit">ЗАПИСАТЬ</div>
       
         </div>
     
       </div>
   
   
   
   
     </div>
  )
}

export default NewOrders