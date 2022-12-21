import React from "react";
import { useContext, useState, useEffect } from "react";
import petContext from "../Context/PetContext";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import axios from "axios";
import authContext from "../Context/AuthContext";
import LoginModal from "../Components/LoginModal";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PetProfile() {
  const { setSelectedPet, selectedPet, defaultImage } = useContext(petContext);
  const { baseUrl, headers, userInfo, setUserInfo, token } =
    useContext(authContext);
  const {
    type,
    name,
    adoptionStatus,
    picture,
    height,
    weight,
    color,
    bio,
    hypoallergenic,
    dietary,
    breed,
    _id,
    owner,
  } = selectedPet;
  const hidden = "visually-hidden";
  const seen = "";

  const [buttonDiv, setButtonDiv] = useState("");
  const [saveButtonStatus, setSaveButtonStatus] = useState("");
  const [unSaveButtonStatus, setUnSaveButtonStatus] = useState(hidden);
  const [fosterButton, setFosterButton] = useState(seen);
  const [adoptButton, setAdoptButton] = useState(seen);
  const [returnButton, setReturnButton] = useState(seen);
  const [loginReminder, setLoginReminder] = useState(seen);

  const notify = (props) => {
    toast.info(props, { position: toast.POSITION.BOTTOM_RIGHT });
  };

  async function handleAdopt(e) {
    console.log(headers);
    const res = await axios.put(
      `${baseUrl}/pets/${e.target.name}/${_id}`,
      { _id: userInfo._id },
      headers
    );
    if (res.status === 200) {
      await setSelectedPet({ ...selectedPet, adoptionStatus: res.data });
      console.log(res.data);
      notify("success!");
    } else {
      console.log(res.data);
      notify("something went wrong");
    }
    toggleAdoptButton();
  }

  async function handleSave(e) {
    const res = await axios.put(
      `${baseUrl}/users/${e.target.name}/${_id}`,
      { _id: userInfo._id },
      headers
    );
    if (res.status === 200 && e.target.name === "save") {
      toggleSave();
      notify("Pet saved!");
      await setUserInfo({
        ...userInfo,
        savedPets: [userInfo.savedPets.push(res.data._id)],
      });
    }
    if (res.status === 200 && e.target.name === "unsave") {
      toggleSave();
      notify("Pet removed from saved list");
      await setUserInfo({
        ...userInfo,
        savedPets: [userInfo.savedPets.filter((pet) => pet !== res.data._id)],
      });
    } else {
      await console.log(userInfo.savedPets);
    }
  }

  useEffect(() => {
    if (!token) {
      setButtonDiv(hidden);
      setSaveButtonStatus(hidden);
      setUnSaveButtonStatus(hidden);
      setLoginReminder(seen);
      toggleAdoptButton();
    }
    if (token) {
      setLoginReminder(hidden);
      !userInfo.savedPets.includes(_id)
        ? setSaveButtonStatus(seen)
        : setUnSaveButtonStatus(hidden);

      userInfo.savedPets.includes(_id)
        ? setSaveButtonStatus(hidden)
        : setUnSaveButtonStatus(seen);

      if (selectedPet.owner === userInfo._id) {
        setButtonDiv(seen);
      }
      if (owner !== userInfo._id && adoptionStatus !== "available") {
        setButtonDiv(hidden);
      }
    }
    toggleAdoptButton();
  }, [selectedPet, userInfo]);

  const toggleSave = () => {
    if (saveButtonStatus === seen) {
      setSaveButtonStatus(hidden);
    }
    if (saveButtonStatus === hidden) {
      setSaveButtonStatus(seen);
    }
    if (unSaveButtonStatus === seen) {
      setUnSaveButtonStatus(hidden);
    }
    if (unSaveButtonStatus === hidden) {
      setUnSaveButtonStatus(seen);
    }
  };

  const toggleAdoptButton = () => {
    if (adoptionStatus === "fostered") {
      setAdoptButton(seen);
      setReturnButton(seen);
      setFosterButton(hidden);
    }
    if (adoptionStatus === "available") {
      setAdoptButton(seen);
      setReturnButton(hidden);
      setFosterButton(seen);
    }
    if (adoptionStatus === "adopted") {
      setReturnButton(seen);
      setAdoptButton(hidden);
      setFosterButton(hidden);
    }
  };

  return (
    <div className="profileBody">
      <ToastContainer />
      <div className="cardContainer">
        <Card.Header className={"petName"}>
          {selectedPet.name.toUpperCase()}
        </Card.Header>
        <Card.Img
          variant="top"
          className="petProfileImage"
          roundedCircle
          src={picture ? picture : defaultImage}
        />
        <Card.Body>
          <Card.Text className={"textBody"}>
            <div> Type of Animal: {type}</div> Breed: {breed}
            <div className="petBio">{bio ? bio : ""}</div>
            <div>{hypoallergenic ? "Hypoallergenic" : ""}</div>
          </Card.Text>
          <Card.Text>Adoption Status: {adoptionStatus}</Card.Text>
          <div className="extraInfo">
            <div>{height} cm</div> <div>{weight} grams</div> <div>{color}</div>{" "}
          </div>
          <ul className="extraInfo">
            {dietary ? <li>Dietary restrictions: {dietary.join(", ")}</li> : ""}
          </ul>
          <div className={`buttonDiv ${buttonDiv}`}>
            <Button
              variant="secondary"
              name={"foster"}
              onClick={handleAdopt}
              className={`m-1 button ${fosterButton}`}
            >
              Foster
            </Button>
            <Button
              variant="secondary"
              name={"adopt"}
              onClick={handleAdopt}
              className={`m-1 button ${adoptButton}`}
            >
              Adopt
            </Button>
            <Button
              variant="secondary"
              name={"return"}
              onClick={handleAdopt}
              className={`m-1 button ${returnButton}`}
            >
              Return
            </Button>
          </div>
          <Button
            variant="secondary"
            name={"save"}
            onClick={handleSave}
            className={`m-1 button-second ${saveButtonStatus}`}
          >
            Save For Later
          </Button>
          <Button
            variant="secondary"
            name={"unsave"}
            onClick={handleSave}
            className={`m-1 button-second ${unSaveButtonStatus}`}
          >
            Unsave
          </Button>
        </Card.Body>
      </div>
      <div className={`m-1 ${loginReminder}`}>
        Log in to foster, adopt, or save pets for later!
        <div>
          <LoginModal />
        </div>
      </div>
    </div>
  );
}
