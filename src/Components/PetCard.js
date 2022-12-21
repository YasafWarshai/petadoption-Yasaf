import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router";
import { useContext } from "react";
import petContext from "../Context/PetContext";

export default function PetCard({
  _id,
  owner,
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
}) {
  const navigate = useNavigate();

  const { setSelectedPet, defaultImage } = useContext(petContext);

  function setThisPet() {
    setSelectedPet({
      _id,
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
      owner,
    });
    navigate(`/petprofile/${_id}`);
  }

  return (
    <Card
      onClick={setThisPet}
      className="petCard d-block mx-auto img-fluid w-50"
    >
      <Card.Img
        className="cardImage"
        variant="top"
        src={picture ? picture : defaultImage}
      />
      <Card.Body>
        <Card.Title> {name}</Card.Title>
        <Card.Text>
          <div>
            {breed} ({type}){" "}
          </div>
          <div> Adoption Status: {adoptionStatus}</div>
          <div> {height} cm</div>
          <div> {weight} grams</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
