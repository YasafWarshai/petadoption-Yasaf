import React from "react";
import  LoginModal from '../Components/LoginModal'
import { useContext, useState, useEffect } from "react";
import authContext from "../Context/AuthContext";
import { Image, Button } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import logo from '../Images/logo (1).png'


 export default function Home() {
const { userInfo } = useContext(authContext)
const [time, setTime] = useState(null)
const navigate = useNavigate()
const getHour = () => {
  const date = new Date();
  const hour = date.getHours()
  setTime(hour)
}

useEffect(() => {
getHour()
}, [])


function searchPets(){
  navigate('/search')  
  }


   return (
     <div className="homeContainer">
       <h2 className="welcomeHeader">{time < 12 ? "Good Morning" : "Good Afternoon"}{userInfo.firstName ? `, ${userInfo.firstName.toUpperCase()}!` : '!'}</h2>
      <Image width={400} fluid rounded className={'homeLogo'} src={logo} alt={'PetConnect'}></Image>
      
        <div className="generalInfo">
         
          <h5>          Find your new best friend today!
</h5> 
         <p> Welcome to PetConnect, your one stop shop for pet adoption and fostering. Looking for a new furry friend? We've got tons of pets looking for loving homes! Want to try out living with a pet but can't make a long-term commitment? Fostering is another great solution, and there are plenty of pets who need a place to stay while they wait to find their forever-owners. Go to our search page to find a critter that's right for you, and remember to sign up for the ability to foster, adopt, and save pets for later!

          </p>
           </div>
           <Button onClick={searchPets} className={"button"} variant="success">Search Pets</Button>     </div>
   )
 }
 