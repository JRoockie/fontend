import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Icons} from "../../source/icons/Icons";
import "./finOrders.scss"
import {useCartContext} from "../../CartContext";

function FinOrders (){
  const {main, setMain, finOrders,active1, setActive1, songsData, setSongsData, HandleDelete2, HandleSetNew} = useCartContext()
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  
  
  
  function OpenOrder (el){
    setActive1(el)
  }
  
  function SetSongs (){
    setSongsData(active1)
  }
  
  const [data, setData] = useState("")
  const [time, setTime] = useState("")
  // useEffect(()=>{
  //   let arr = active1.date.split('')
  //   let Date = "" + arr[0] + arr[1] + arr[2] + arr[3] + arr[4] + arr[5] + arr[6] + arr[7] + arr[8] + arr[9]
  //   let Time = "" + arr[11] + arr[12] + arr[13] + arr[14] + arr[15]
  //   setData(Date)
  //   setTime(Time)
  // }, [active1])
  
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
  
  
  
  
  
  return(
     <div className="OrdersList G-container">
       <div className="headerBlock G-flex-center G-alignItems-center">
         <div className="backButton">
           <img onClick={goBack} style={{display: `${mobileApp ? `${main ? "none" : "block"}` : "block"}`}} src={Icons.arrowLeft} alt=""/>
           <img onClick={()=> setMain(false)} style={{display: `${mobileApp ? `${main ? "block" : "none"}` : "none"}`, position: "relative", zIndex: 9999}} src={Icons.arrowLeft} alt=""/>
         </div>
         <p className="header">ОБРАБОТАННЫЕ  <span>ЗАЯВКИ</span></p>
       </div>
       
       <div className="main">
         <div style={{display: `${main ? "none" : "block"}`}} className="listBlock">
           {finOrders.map((ell, index)=>{
             let name = ell.nameAsClient ? ell.nameAsClient : "name"
  
  
  
             if (ell.deletedWhen === null){
               return(
                  <div   key={index} onClick={()=>{
                    HandleLink()
                    OpenOrder(ell)
                  }} className={`LinkToOrder ${active1 === ell ? "active" : ""}`}>
                    <img src={Icons.whiteMark} alt=""/>
                    <p className="name">{name}</p>
       
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path d="M2 2L23.5 23.5M23.5 23.5V2M23.5 23.5H2" stroke="#DC1989" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
               )
             }
             
           })}
         </div>
         
         <div style={{display: `${mobileApp ? `${main ? "flex" : "none"}` : "flex"}`}} className="source">
            <div className="nameText block">
              <p className="name">{active1.nameAsClient ? active1.nameAsClient : "name"}</p>
              <p className="prg">{active1.comment}</p>
            </div>
           
           <div className="data block"><span>Дата:</span>{active1.date[0]}.{active1.date[1]}.{active1.date[2]}</div>
           <div className="time block"><span>Время:</span>{active1.date[3]}:{active1.date[4]}</div>
           
           <div className="price block"><span>Цена:</span>{active1.price}</div>
           <Link to="/songs" onClick={SetSongs} className="songs G-block block"><span>Песни:</span>{active1.songs.length}</Link>
           
           <div className="number block"><span>Номер:</span>{active1.phoneNumber}</div>
           
           <div onClick={()=>{
             HandleDelete2(active1.id)
           }} className="delete G-block block">УДАЛИТЬ ЗАКАЗ</div>
           <div onClick={()=>{
             HandleSetNew(active1.id)
           }} className="submit">ОТМЕНИТЬ ЗАПИСЬ</div>
           
         </div>
         
       </div>
       
       
       
       
     </div>
  )
}

export default FinOrders