import React, {useEffect, useState} from "react";
import {useCartContext} from "../../CartContext";
import {useNavigate} from "react-router-dom";
import {Icons} from "../../source/icons/Icons";
import "./songs.scss"

import mikro from "./Group 143.svg"
import plastin from "./Group 145.svg"
function Songs (){
  const {songsData, setSongsData, HandleDownloadVoice, HandleDownloadAudio} = useCartContext()
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [dialog, setDialog] = useState(false)
  const [songPosition, setSongPosition] = useState(0)
  const [activeSong, setActiveSong] = useState(songsData.songs[0])
  
  useEffect(()=>{
    setActiveSong(songsData.songs[songPosition])
  }, [songPosition])
  
  
  
  
  
  return(
     <div className="Songs G-container">
       <div style={{display: `${dialog ? "flex" : "none"}`}} className="DialogBlock">
         <div onClick={()=>{
           setDialog(false)
         }} className="backClickBlock">
         
         </div>
          <div onClick={()=>{
            HandleDownloadVoice(activeSong.id)
          }} className="button G-block">
            <img src={mikro} alt=""/>
          </div>
         <div onClick={()=>{
           HandleDownloadAudio(activeSong.id)
         }} style={{display: `${activeSong.hasAudio ? "flex" : "none"}`}} className="button G-block">
           <img src={plastin} alt=""/>
         </div>
       </div>
       
       
       <div className="headerBlock G-flex-center G-alignItems-center">
         <div onClick={goBack} className="backButton">
           <img src={Icons.arrowLeft} alt=""/>
         </div>
         <p className="header">ИНФОРМАЦИЯ  <span>О ПЕСНЯХ</span></p>
       </div>
       
       <div className="Main G-flex-between">
         
         <div className="songInfoBlock">
            <div className="name block"><span>Название:</span>{activeSong.songName}</div>
            <div className="singer block"><span>Кто поёт:</span>{activeSong.whoWillSing}</div>
           <a href={`${activeSong.link.startsWith("https://") ? activeSong.link : `https://${activeSong.link}`}`} target="blank" className="linkYoutube  block G-block"><span>Ютуб:</span>{activeSong.link}</a>
         </div>
         
         <div className="buttonsBlock">
            <div className="songsNum  block"><span>Кол-во голосов:</span>{songsData.songs.length}</div>
            <div onClick={()=>{
                setDialog(true)
            }} className="downloadBtn  block G-block">Скачать</div>
           <div onClick={()=>{
             if (songsData.songs[songPosition+1]){
               setSongPosition(prev => prev + 1)
             }
           }} className="nextBtn  block G-block"><img src={Icons.vectorArrow} alt=""/></div>
           <div onClick={()=>{
             if (songsData.songs[songPosition-1]){
               setSongPosition(prev => prev - 1)
             }
           }} className="prevBtn  block G-block"><img src={Icons.vectorArrow} alt=""/></div>
         </div>
         
       </div>
       
       
     </div>
  )
}

export default Songs