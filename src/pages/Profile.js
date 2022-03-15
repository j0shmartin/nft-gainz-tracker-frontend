import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import Nft from "../components/Nft";


const ProfileDisplay = (props) => {
   const [userData,setUserData] = useState({})
   const database = "https://nft-gainz.herokuapp.com/"
   const params = useParams()
   
 
   useEffect(async () => {
      if(params.username) {
            await fetch(`${database}users/${params.username}`, {
         headers: {
            "x-access-token": localStorage.getItem("token"),
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Connection": "keep-alive"
         }
          })
         .then(res=>res.json())
         .then((user)=>{
            setUserData(user) 
         })
      }
    
  },[])
  
  const AddWallet = () => {
      const initialWalletState = {nickname:"",address:""}
      const [walletToAdd, setWalletToAdd] = useState(initialWalletState)
      console.log(walletToAdd)
      const handleChange = (event) => {
      setWalletToAdd({...walletToAdd, [event.target.name]:event.target.value})
   }

   const handleWallet = async (event) => {
      event.preventDefault()
      console.log(walletToAdd)
      await fetch(`/${userData._id}/wallets`, {
         method: "POST",
         headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-type": "application/json"
         },
         body: JSON.stringify(walletToAdd)
   })
   .then(setWalletToAdd(initialWalletState))
   }

      return(
         <form onSubmit={event=>handleWallet(event)}>
               <input required
               type="text"
               name="nickname"
               onChange={handleChange}
               value = {walletToAdd.nickname}
               />
               <input required
               type="text"
               name="address"
               onChange={handleChange}
               value = {walletToAdd.address}
               />
               <input type="submit" value="Add Wallet"/>
         </form>
      )
  }

  const WalletCard = (props) => {

   const deleteWallet = async (event) => {
      event.preventDefault()
      await fetch(`/${userData._id}/wallets/${props.id}`, {
         method: "DELETE",
         headers: {
            "x-access-token": localStorage.getItem("token"),
            "Content-type": "application/json"
         },
   })

   }
     return (
        <div>
           <p>{props.nickname}</p>
           <p>{props.address}</p>
           <form onSubmit={event=>deleteWallet(event)}>
           <input type="submit" value="Delete"/>
           </form>
        </div>
     )
  }

  const WalletDisplay = () => {
     let wallets = userData.wallets
     

     if(userData.wallets.length==0){
        return(
           <div>
           <p>No Wallets to Display</p>
           </div>
         )
      }
   const MapWallets = wallets.map((data,index)=> {
      console.log(data)
      return (
         <WalletCard
         id={data._id}
         nickname = {data.nickname}
         address = {data.address}
         key={index}
         />
      )  
   })
   return MapWallets
  }

const loaded = () => {
   return (
       <div>
         <h1>User Details</h1>
         <p>{userData.username}</p>
         <WalletDisplay/>
         <AddWallet/>
       </div>
   )
};

const loading = () => {
   return <p>No user</p>
}


return userData.username ? loaded() : loading()

}




export default ProfileDisplay