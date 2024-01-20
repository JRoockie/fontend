import React, {createContext, useContext, useState, useEffect} from "react";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom"
import {request, setAuthHeader} from "./axios_helper";
import {logDOM} from "@testing-library/react";


const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [finOrders, setFinOrders] = useState([])
  const [newOrders, setNewOrders] = useState([])
  const [authorization, setAuthorization] = useState(true)
  const [firstFailed, setFirstFailed] = useState(false);
  const [active, setActive] = useState()
  const [active1, setActive1] = useState()
  const [songsData, setSongsData] = useState({})
  const navigate = useNavigate();
  const [activeToken, setActiveToken] = useState("")
  const [cookies, setCookie] = useCookies(['token']);
  
  const [dataOk, setDataOk] = useState(false)
  const goBack = (link) => {
    navigate(link);
  };
  
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
 
  
  async function HandleLogIn (login, password){
    
    let Fdata = {
      "login": login,
      "password": password
    }
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Fdata),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
        await setAuthorization(false)
        await setActiveToken(data.token)
        
        // await localStorage.setItem('token', JSON.stringify(data.token))
        await setCookie('token', data.token)
        
        
      
      await console.log(data)
      
      
      
    } catch (error) {
      console.error('Error:', error);
    }
    
  }
  
  
      const fetchData1 = async (id) => {
        try {
          const response = await fetch('/orders/fin', {
            headers: {
              'Authorization': `Bearer ${cookies.token}`,
            }
          }); // Fetch from the proxy path
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          
         if (result[0].id){
              setAuthorization(false)
          } else {
           localStorage.clear()
         }
          await setFinOrders(result);
          await console.log(finOrders)
  
          if (id === 0){
            let res = await result.find((el)=>{
              return el.deletedWhen === null
            })
            await setActive1(res)
          } else {
            let act2 = await result.find((el)=>{
              if (el.id !== id){
                if (el.deletedWhen === null){
                  return el
                }
              }
            })
    
            await setActive1(act2)
          }
        } catch (error) {
          setError(error.message || 'An error occurred');
        }
      };
  
      // fetchData1();
  
      const fetchData = async (id) => {
        try {
          const response = await fetch('/orders/new', {
            headers: {
              'Authorization': `Bearer ${cookies.token}`,
            }
          }); // Fetch from the proxy path
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          await setNewOrders(result);
         await  console.log(result);
          if (id === 0){
            let res = await result.find((el)=>{
              return el.deletedWhen === null
            })
            await setActive(res)
          } else {
            let act2 = await result.find((el)=>{
              if (el.id !== id){
                if (el.deletedWhen === null){
                  return el
                }
              }
            })
  
            await setActive(act2)
          }
        } catch (error) {
          setError(error.message || 'An error occurred');
        }
      };
  
      // fetchData();
  
  useEffect(()=>{
    fetchData(0)
    fetchData1(0)
  }, [authorization])
  
  
  async function HandleDelete (id){
    
    let Fdata = {
      "id" : id
    }
    try {
      const response = await fetch('/deleteOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(Fdata),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      await fetchData(id)
      
      
    } catch (error) {
      console.error('Error:', error);
    }
    
  }
  
  async function HandleDelete2 (id){
    
    let Fdata = {
      "id" : id
    }
    try {
      const response = await fetch('/deleteOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(Fdata),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      await fetchData1(id)
      
      
    } catch (error) {
      console.error('Error:', error);
    }
    
  }
  
  async function HandleSetFin (id){
    let Fdata = {
      "id" : id
    }
    try {
      const response = await fetch('/updateOrderClientTrue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(Fdata),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      await fetchData1(id)
      await fetchData(id)
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function HandleSetNew (id){
    let Fdata = {
      "id" : id
    }
    try {
      const response = await fetch('/updateOrderClientFalse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.token}`
        },
        body: JSON.stringify(Fdata),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      await fetchData1(id)
      await fetchData(id)
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  
  
  
  const [fileUrl, setFileUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
    const HandleDownloadVoice = async (activeId) => {
      try {
        const response = await fetch(`/data/getVoice?id=${activeId}`, {
          headers: {
            'Authorization': `Bearer ${cookies.token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
      
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded_file';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        setErrorMessage(`Произошла ошибка при скачивании: ${error.message}`);
      }
    };
  
  const HandleDownloadAudio = async (activeId) => {
    try {
      const response = await fetch(`/data/getAudio?id=${activeId}`, {
        headers: {
          'Authorization': `Bearer ${cookies.token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded_file';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setErrorMessage(`Произошла ошибка при скачивании: ${error.message}`);
    }
  };
  
  async function Try (){
    // let token1 = localStorage.getItem('token')
    // let token = JSON.parse(token1)
    
    
      try{
        const response = await fetch('/orders/fin', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cookies.token}`,
          }
        }); // Fetch from the proxy path
        if (!response.ok) {
          // localStorage.clear('token')
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        await setActiveToken(cookies.token)
        navigate('/')
        await setAuthorization(false)
        
        
        
        
      }  catch (error) {
        console.error('Error:', error);
      }
      
  }
  
  
  
  useEffect(()=>{
    Try()
  }, [])
  
  
  const Data = {
    accounts: [
       {
        userName: 'Vache',
        password: 'vache2002'
      },
       {
        userName: "v",
        password: "s"
      }
    ]
  }
  const [main, setMain] = useState(false)
  
  
  return(<CartContext.Provider value={{
    authorization,
    setAuthorization,
    Data,
    newOrders,
    finOrders,
    active, setActive,
    active1, setActive1,
    firstFailed, setFirstFailed,
    songsData, setSongsData,
    HandleDelete, HandleDelete2, HandleDownloadVoice, HandleDownloadAudio,
    HandleSetFin, HandleSetNew,
    main, setMain,
    HandleLogIn, cookies, setCookie
  }}>
    {children}
  </CartContext.Provider> )
};

export const useCartContext = () => {
  return useContext(CartContext)
}