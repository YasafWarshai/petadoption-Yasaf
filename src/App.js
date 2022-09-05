import "./App.css";
import Home from "../src/Pages/Home";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Components/NavBar";
import ProfilePage from "./Pages/profilePage";
import "./Components/Styles/Styles.css";
import MyPets from "./Pages/MyPets";
import petContext from "./Context/PetContext";
import authContext from "./Context/AuthContext";
import { useState, useEffect } from "react";
import PetProfile from "./Pages/petProfile";
import PetSearchPage from "./Pages/PetSearchPage";
import AddPet from "./Pages/AddPet";




const App = () => {
  const [token, setToken] = useState('')
  const [petsList, setPetsList] = useState([])
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
      setToken(token)
    }
  }, [])
  const [selectedPet, setSelectedPet] = useState({})
  const headers = {headers: { Authorization: `Bearer ${token}`, isAdmin: userInfo.isAdmin} }

  const baseUrl = 'http://localhost:8080'
  const defaultImage = 'http://posfacturar.com/pos_organicnails/public/upload/default_image/default_pet.jpg'
  

  return (
    <>
    <div className="App"> 
      <authContext.Provider value={{ headers, userInfo, setUserInfo, baseUrl, token, setToken }}>
      <petContext.Provider value = {{petsList, setPetsList,  defaultImage,  selectedPet, setSelectedPet}}>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/mypets" element={<MyPets />} />
        <Route exact path="/petprofile/:petId" element={<PetProfile />} />
        <Route exact path="/search" element={<PetSearchPage />} />
        <Route exact path="/addpet" element={<AddPet />} />

      </Routes>
      </petContext.Provider>
      </authContext.Provider>
    </div>
    </>
  );
}

export default App;
