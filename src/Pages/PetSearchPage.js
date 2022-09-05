import React from "react";
import { Form, Dropdown, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import authContext from "../Context/AuthContext";
import PetCard from "../Components/PetCard";

export default function PetSearchPage() {
  const [petsList, setPetsList] = useState([]);
  const [petTypes, setPetTypes] = useState([])
  const { baseUrl } = useContext(authContext);
  const [formStatus, setFormStatus] = useState('searchForm visually-hidden')
  const [tempInfo, setTempInfo] = useState('');




  useEffect(() => {
    populate()
  }, [])
  

  const searchPets = async (e) => {
    console.log(e.target.name)
    const res = await axios.get(`${baseUrl}/pets/search/${e.target.name}`);
    await setPetsList(res.data);
    await setFormStatus('searchForm visually-hidden')
  };


  const populate = async () => {
    const res = await axios.get(`${baseUrl}/pets/types`)
    await console.log(res)
    await setPetTypes(res.data)
  }


  function showAdvanced() {
    if (formStatus === 'searchForm visually-hidden'){setFormStatus('searchForm')}
    if (formStatus === 'searchForm'){setFormStatus('searchForm visually-hidden')}
  }

  function handleChange(){

  }

  function advancedSearch(){

  }

  return (
    <div className="searchBody">
      <Form className="mb-4">
        <h1>Find Your New Best Friend!</h1>
        <Dropdown className={"searchForm"}>
          <Dropdown.Toggle variant="success" className={'button-second'} id="dropdown-basic">
            Search Pets by type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {petTypes.map((petType) => (
              <Dropdown.Item key={`${petType}`} name={`${petType}`}  onClick={searchPets}>{`${petType}`}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant={'success'} className={'button-second'}onClick={showAdvanced}>Advanced Search</Button>
      </Form>
      <div className={formStatus}>
      <Form className={'searchForm'}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type={"text"}
            name={"firstName"}
            value={tempInfo.firstName}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
          value={tempInfo.lastName}
            type={"text"}
            onChange={handleChange}
            name={"lastName"}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label>Email address</Form.Label>
          <Form.Control
          value={tempInfo.email}
            type={"email"}
            name={"email"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label>Change Password</Form.Label>
          <Form.Control
            type={"password"}
            onChange={handleChange}
            name={"password"}
            className={"changeItem"}
          ></Form.Control>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={"password"}
            name={"repassword"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label>Phone</Form.Label>
          <Form.Control
          value={tempInfo.phone}
            name={"phone"}
            type={"number"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 ">
          <Form.Label>Bio</Form.Label>
          <Form.Control
          value={tempInfo.bio}
            as="textarea"
            type={"text"}
            name={"bio"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={advancedSearch}>
          Save Changes
        </Button>
      </Form>
    </div>
      <Container fluid>
        <Row xs={1} md={2} lg={3} className="g-1">
          {Array.from(petsList).map((pet) => (
            <Col key={pet._id}>
              <PetCard
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
                dietary={pet.dietary}
                breed={pet.breed}
                owner={pet.owner}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
