import React from "react";
import { useContext, useState, useEffect } from "react";
import petContext from "../Context/PetContext";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import authContext from "../Context/AuthContext";


export default function PetProfile() {
  const { setSelectedPet ,selectedPet, defaultImage } = useContext(petContext);
  const { baseUrl, headers, userInfo, setUserInfo } = useContext(authContext)
  const { type, name, adoptionStatus, picture, height, weight, color, bio, hypoallergenic, dietary, breed, _id } = selectedPet
  const hidden = 'm-1 button-second visually-hidden'
  const seen = 'm-1 button-second'

  const [saveButtonStatus, setSaveButtonStatus] = useState(seen)
  const [unSaveButtonStatus, setUnSaveButtonStatus] = useState(hidden)
  const [fosterButton, setFosterButton ] = useState(seen)
  const [ adoptButton, setAdoptButton ] = useState(seen)
  const [ returnButton, setReturnButton ] = useState(seen)


  async function handleAdopt(e) {
    console.log(headers)
    const res = await axios.put(`${baseUrl}/pets/${e.target.name}/${_id}`, {_id: userInfo._id}, headers)
    if(res.status === 200){
   await setSelectedPet({...selectedPet, adoptionStatus: res.data})
    } else {
        console.log(res.data)
    }
  }

  async function handleSave(e) {
    console.log(headers)
    const res = await axios.put(`${baseUrl}/users/${e.target.name}/${_id}`, {_id: userInfo._id}, headers)
    await console.log(res)
    if (res.status === 200){
       toggleSave()
    } else {
        console.log(res.data)
    }
  }

  useEffect(() => {
toggleAdoptButton()
  }, [handleSave])
  




  const toggleSave = () => {
    if (saveButtonStatus === seen){
    setSaveButtonStatus(hidden)}
    if (saveButtonStatus === hidden){
        setSaveButtonStatus(seen)
    }
    if (unSaveButtonStatus === seen){
        setUnSaveButtonStatus(hidden)}
        if (unSaveButtonStatus === hidden){
            setUnSaveButtonStatus(seen)
        }
  }

  const toggleAdoptButton = () => {
    if (adoptionStatus === 'fostered'){
        setAdoptButton(seen)
        setReturnButton(seen)
        setFosterButton(hidden)
    }
    if (adoptionStatus === 'available'){
        setAdoptButton(seen)
        setReturnButton(hidden)
        setFosterButton(seen)
    }
    if (adoptionStatus === 'adopted'){
        setAdoptButton(hidden)
        setReturnButton(seen)
        setFosterButton(hidden)
    }
  }



  return (
    <div className="profileBody">
    <div className="cardContainer">
    <Card.Header className={'petName'}>{name}</Card.Header>
      <Card.Img
        variant="top"
        className="petProfileImage"
        roundedCircle
        src={picture ? picture : defaultImage}
      />
      <Card.Body>
        <Card.Text className={'textBody'}>
        <div>{breed} ({type})</div>
        <div className="petBio">{bio ? bio : ''}</div>
        </Card.Text>
        <div className="extraInfo"><div>{height} cm</div> <div>{weight} grams</div> <div>{color}</div> </div>
        <ul className="extraInfo">{dietary ?<li>Dietary restrictions: {dietary.join(', ')}</li> : ''}</ul>

        <Button variant="secondary" name={'foster'} onClick={handleAdopt} className={fosterButton}>
          Foster
        </Button>
        <Button variant="secondary" name={'adopt'} onClick={handleAdopt} className={adoptButton}>
          Adopt
        </Button>
        <Button variant="secondary" name={'return'} onClick={handleAdopt} className={returnButton}>
          Return
        </Button>
        <Button variant="secondary" name={'save'} onClick={handleSave} className={saveButtonStatus}>
          Save For Later
        </Button>
         <Button variant="secondary" name={'unsave'} onClick={handleSave} className={unSaveButtonStatus}>
          Unsave
        </Button>
      </Card.Body>
      </div>
      </div>
  );
}
