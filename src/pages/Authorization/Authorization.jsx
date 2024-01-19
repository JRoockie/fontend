import React, {useState} from "react";
import "./Authorization.scss";
import {Icons} from "../../source/icons/Icons";
import {useCartContext} from "../../CartContext";

function Authorization() {
  const {setAuthorization, Data, firstFailed, setFirstFailed} = useCartContext();
  
  
  const [userNameVal, setUserNameVal] = useState("")
  const [userPassVal, setUserPassVal] = useState("")
  function OnKeyUpLogIn(event){
    setUserNameVal(event.target.value)
  }
  function OnKeyUpPass(event){
    setUserPassVal(event.target.value)
  }
  
  function handleClick (){
    if (userNameVal === "" || userPassVal === ""){
      setFirstFailed(true)
    }else{
      let userData = Data.accounts.find((user) => user.userName === userNameVal)
      if (userData.password === userPassVal){
        setAuthorization(false)
      } else {
        setFirstFailed(true)
      }
    }
    
    
  }
  
  
  return (
     <div className="Authorization G-flex-column G-alignItems-center">
       <p className="header">Авторизация</p>
  
       
         <div className="textBlockDiv G-flex-center G-alignItems-center">
           <input onKeyPress={(event)=>{
             if (event.keyCode === 13){
               handleClick()
             }
           }} onKeyUp={OnKeyUpLogIn} placeholder="Введите логин" className="input" type="text"/>
           <div className="circle">
             <img style={{display: `${firstFailed ? "block" : "none"}`}} className="img" src={Icons.failed} alt=""/>
             <img className="imgC" src={Icons.circle} alt=""/>
           </div>
         </div>
         <div className="textBlockDiv G-flex-center G-alignItems-center">
           <input  onKeyUp={OnKeyUpPass} placeholder="Введите пароль" className="input" type="password"/>
           <div className="circle">
             <img style={{display: `${firstFailed ? "block" : "none"}`}} className="img" src={Icons.failed} alt=""/>
             <img className="imgC" src={Icons.circle} alt=""/>
           </div>
         </div>
         
         <button type="submit" onClick={handleClick} className="G-block">
           Войти
         </button>
       
     </div>
  );
}

export default Authorization;