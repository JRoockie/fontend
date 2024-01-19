import React, {createContext, useContext, useState, useEffect} from "react";



const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [finOrders, setFinOrders] = useState([])
  const [newOrders, setNewOrders] = useState([])
  const [authorization, setAuthorization] = useState(true)
  const [firstFailed, setFirstFailed] = useState(false);
  const [active, setActive] = useState()
  const [active1, setActive1] = useState()
  const [songsData, setSongsData] = useState({})
  
  
  
  
  useEffect(()=>{

      const finData = async () =>{
        const data = await (
           (await fetch('/orders/new', {
             headers: {
               'Content-Type': 'application/json'
             }
           })).json()
        )

        await setNewOrders(data)
        await setActive(data[0])
        console.log(newOrders);
      }

      finData()


    const finData1 = async () =>{
      const data = await (
         (await fetch('/orders/fin', {
           headers: {
             'Content-Type': 'application/json'
           }
         })).json()
      )

      await setFinOrders(data)
      await setActive1(data[0])
    }

    finData1()

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
  
  
  return(<CartContext.Provider value={{
    authorization,
    setAuthorization,
    Data,
    newOrders,
    finOrders,
    active, setActive,
    active1, setActive1,
    firstFailed, setFirstFailed,
    songsData, setSongsData
  }}>
    {children}
  </CartContext.Provider> )
};

export const useCartContext = () => {
  return useContext(CartContext)
}