import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import axios from "axios";
import PetCard from "../Components/PetCard";
import { useContext, useEffect, useState } from "react";
import petContext from "../Context/PetContext";
import authContext from "../Context/AuthContext";
import { useNavigate } from "react-router";

function MyPets() {
  const { petsList, setPetsList, savedList, setSavedList } =
    useContext(petContext);

  const { baseUrl, headers, token, userInfo } = useContext(authContext);
  const navigate = useNavigate();

  const getPets = async () => {
    const res = await axios.get(
      `${baseUrl}/pets/adoptedpets/${userInfo._id}`,
      headers
    );
    if (res.data === "No pets to display") {
      await setPetsList([]);
    } else {
      console.log(res);
      setPetsList(res.data);
    }
    const saved = await axios.get(
      `${baseUrl}/users/savedpets/${userInfo.email}`,
      headers
    );
    console.log(saved);
    if (saved.data === "No pets to display") {
      console.log(saved.data);
      await setSavedList([]);
    } else {
      await setSavedList(saved.data);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      getPets();
    }
    show();
  }, []);

  async function show() {
    console.log(petsList);
    console.log(savedList);
  }

  return (
    <>
      <h1>My Pets</h1>
      {petsList.length < 1 ? (
        "No Pets To display"
      ) : (
        <Container className="pt-5" fluid>
          <Row xs={1} md={2} lg={3} className="g-1">
            {Array.from(petsList).map((pet) => (
              <Col key={pet._id}>
                <PetCard
                  owner={pet.owner}
                  className="petCard"
                  _id={pet._id}
                  type={pet.typeOf}
                  name={pet.name}
                  adoptionStatus={pet.adoptionStatus}
                  picture={pet.picture}
                  height={pet.height}
                  weight={pet.weight}
                  color={pet.color}
                  bio={pet.bio}
                  hypoallergenic={pet.hypoallergnic}
                  breed={pet.breed}
                  dietary={pet.dietary}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
      <h1>Saved Pets</h1>
      {savedList.length < 1 ? (
        "No Saved Pets To display"
      ) : (
        <Container className="pt-5" fluid>
          <Row xs={1} md={2} lg={3} className="g-1">
            {Array.from(savedList).map((pet) => (
              <Col key={pet._id}>
                <PetCard
                  owner={pet.owner}
                  className="petCard"
                  _id={pet._id}
                  type={pet.typeOf}
                  name={pet.name}
                  adoptionStatus={pet.adoptionStatus}
                  picture={pet.picture}
                  height={pet.height}
                  weight={pet.weight}
                  color={pet.color}
                  bio={pet.bio}
                  hypoallergenic={pet.hypoallergnic}
                  breed={pet.breed}
                  dietary={pet.dietary}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default MyPets;
