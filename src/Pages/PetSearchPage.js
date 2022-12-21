import React from "react";
import {
  Form,
  Dropdown,
  Row,
  Col,
  Container,
  Button,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import authContext from "../Context/AuthContext";
import PetCard from "../Components/PetCard";
import { toast, ToastContainer } from "react-toastify";

export default function PetSearchPage() {
  const [petsList, setPetsList] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const { baseUrl } = useContext(authContext);
  const [formStatus, setFormStatus] = useState("profileForm visually-hidden");
  const [typeOf, setTypeOf] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("available");
  const [advancedParams, setAdvancedParams] = useState({});

  useEffect(() => {
    populate();
  }, []);

  const searchPets = async (e) => {
    console.log(e.target.name);
    const res = await axios.get(`${baseUrl}/pets/search/${e.target.name}`);
    await setPetsList(res.data);
    await setFormStatus("profileForm visually-hidden");
  };

  const populate = async () => {
    const res = await axios.get(`${baseUrl}/pets/types`);
    await console.log(res);
    await setPetTypes(res.data);
  };

  function showAdvanced() {
    if (formStatus === "profileForm visually-hidden") {
      setFormStatus("profileForm");
    }
    if (formStatus === "profileForm") {
      setFormStatus("profileForm visually-hidden");
    }
  }

  function handleAdoptionStatus(e) {
    e.preventDefault();
    setAdoptionStatus(e.target.value);
    setAdvancedParams({
      ...advancedParams,
      ["adoptionStatus"]: e.target.value,
    });
  }

  function handleTypeOf(e) {
    e.preventDefault();
    setTypeOf(e.target.value);
    setAdvancedParams({ ...advancedParams, ["typeOf"]: e.target.value });
  }

  function handleChange(e) {
    e.preventDefault();
    setAdvancedParams({ ...advancedParams, [e.target.name]: e.target.value });
  }

  async function advancedSearch() {
    try {
      const res = await axios.get(`${baseUrl}/pets/advancedsearch`, {params: advancedParams});
      await console.log(res.data);
    } catch (err) {
      toast.warn(err.message);
    }
  }

  return (
    <div className="searchBody">
      <ToastContainer />
      <Form className="mb-4">
        <h1>Find Your New Best Friend!</h1>
        <Dropdown className={"searchForm"}>
          <Dropdown.Toggle
            variant="success"
            className={"button"}
            id="dropdown-basic"
          >
            Search Pets by type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {petTypes.map((petType) => (
              <Dropdown.Item
                key={`${petType}`}
                value={`${petType}`}
                onClick={searchPets}
                name={`${petType}`}
              >
                {" "}
                {`${petType}`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button
          variant={"success"}
          className={"button-second"}
          onClick={showAdvanced}
        >
          Advanced Search
        </Button>
      </Form>
      <div className={`${formStatus}`}>
        <h4>Advanced Search</h4>
        <Form className={"searchForm"}>
          <Row>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <DropdownButton
                variant={"success"}
                className={"buttonDrop"}
                id="button"
                title={"typeOf"}
                name="typeOf"
              >
                {petTypes.map((petType) => (
                  <Dropdown.Item
                    as="button"
                    key={`${petType}`}
                    name={`${petType}`}
                    onClick={handleTypeOf}
                    value={`${petType}`}
                  >
                    {" "}
                    {`${petType}`}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 ">
              <Form.Label>Minimum Height (cm)</Form.Label>
              <Form.Control
                type={"number"}
                onChange={handleChange}
                name={"height"}
                className={"changeItem"}
              ></Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="mb-3 ">
              <Form.Label>Minimum Weight (g)</Form.Label>
              <Form.Control
                type={"number"}
                onChange={handleChange}
                name={"weight"}
                className={"changeItem"}
              ></Form.Control>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} className="mb-3 ">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type={"text"}
                onChange={handleChange}
                name={"name"}
                className={"changeItem"}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Adoption Status</Form.Label>
              <DropdownButton
                variant={"success"}
                className={"adoptionStatus"}
                id="dropdown-basic-button"
                title={adoptionStatus}
                name="adoptionStatus"
                default={"available to adopt"}
              >
                <Dropdown.Item
                  as="button"
                  name={"adopted"}
                  value={"available"}
                  onClick={handleChange}
                >
                  available
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  name={"adopted"}
                  value={"adopted"}
                  onClick={handleChange}
                >
                  adopted
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  name={"fostered"}
                  value={"fostered"}
                  onClick={handleChange}
                >
                  fostered
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
          </Row>
          <Button
            variant={"success"}
            className={"button mt-3"}
            onClick={advancedSearch}
          >
            Search
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
