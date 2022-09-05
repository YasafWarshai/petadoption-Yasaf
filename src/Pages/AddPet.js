import { clear } from "@testing-library/user-event/dist/clear";
import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import authContext from "../Context/AuthContext";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router";

export default function AddPet() {
  const [dietaryInfo, setDietaryInfo] = useState([]);
  const [dietInput, setDietInput] = useState("");
  const ref = useRef(null);
  const [hypo, setHypo] = useState(false);
  const [adoptionStatus, setAdoptionStatus] = useState("available");
  const { baseUrl, headers, userInfo } = useContext(authContext);

  const owner = userInfo._id;
  const isAdmin = userInfo.isAdmin;
  const navigate = useNavigate();
  const [newPetInfo, setNewPetInfo] = useState({
    adoptionStatus: adoptionStatus,
    owner: owner,
  });

  useEffect(() => {
    console.log(userInfo);
    if (userInfo.isAdmin !== true) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setNewPetInfo({
      ...newPetInfo,
      [e.target.name]: e.target.value,
      hypoAllergenic: hypo,
      dietary: [dietaryInfo],
    });
  };

  const postPet = async (e) => {
    e.preventDefault();
    console.log(newPetInfo);
    console.log(headers);
    const res = await axios.post(
      `${baseUrl}/pets/createpet`,
      newPetInfo,
      headers
    );
    await console.log(res.data);
  };

  const handleDietChange = (e) => {
    setDietInput(e.target.value);
  };

  const addDiet = (e) => {
    setDietaryInfo([...dietaryInfo, dietInput]);
    ref.current.value = "";
  };

  const removeDiet = (e) => {
    e.preventDefault();
    setDietaryInfo([]);
    ref.current.value = "";
  };

  const handleHypo = () => {
    setHypo(!hypo);
    console.log(hypo);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setAdoptionStatus(e.target.name);
  };

  return (
    <div className="profileForm">
      <h1>Add a new pet</h1>
      <Form onSubmit={postPet}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Type of Animal</Form.Label>
            <Form.Control
              required
              type={"text"}
              name={"typeOf"}
              placeholder={"Type"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Form.Control
              required
              type={"text"}
              name={"name"}
              placeholder={"Name"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label column sm={2}>
              Height (cm){" "}
            </Form.Label>
            <Form.Control
              required
              type={"number"}
              name={"height"}
              placeholder={"Height"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label column sm={2}>
              Weight (g)
            </Form.Label>
            <Form.Control
              required
              type={"number"}
              name={"weight"}
              placeholder={"Weight"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label column sm={2}>
              Breed
            </Form.Label>
            <Form.Control
              required
              type={"text"}
              name={"breed"}
              placeholder={"Breed"}
              onChange={handleChange}
              className={"changeItem mb-3"}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label column sm={2}>
              Color
            </Form.Label>
            <Form.Control
              required
              type={"text"}
              name={"color"}
              placeholder={"Color"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
        </Row>
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
            <Dropdown.Item as="button" name={"available"} onClick={handleDrop}>
              available
            </Dropdown.Item>
            <Dropdown.Item as="button" name={"adopted"} onClick={handleDrop}>
              adopted
            </Dropdown.Item>
            <Dropdown.Item as="button" name={"fostered"} onClick={handleDrop}>
              fostered
            </Dropdown.Item>
          </DropdownButton>
        </Form.Group>
        <Form.Group>
          <Form.Label column sm={2}>
            Picture
          </Form.Label>
          <Form.Control
            type={"text"}
            name={"picture"}
            placeholder={"picture"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group>
          <Form.Label column sm={2}>
            Bio
          </Form.Label>
          <Form.Control
            as={'textarea'}
            name={"bio"}
            placeholder={"bio"}
            onChange={handleChange}
            className={"changeItem"}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            name={"hypoallergenic"}
            onChange={handleHypo}
            label={
              <span className={"switchlabel"}>{`Hypoallergenic: ${hypo}`}</span>
            }
            className={"switch"}
          />
        </Form.Group>
        <Form.Label>Dietary Restrictions</Form.Label>
        <InputGroup>
          <Form.Control
            type={"text"}
            name={"dietary"}
            ref={ref}
            onChange={handleDietChange}
            className={"changeItem"}
          ></Form.Control>
          <InputGroup.Text id="basic-addon2" onClick={addDiet}>
            Add
          </InputGroup.Text>
          <InputGroup.Text id="basic-addon2" onClick={removeDiet}>
            Clear
          </InputGroup.Text>
        </InputGroup>
        <div className={"diet"}>{dietaryInfo.join(", ")}</div>

        <Button className={"button"} type={"submit"} variant="secondary mb-5">
          Post Pet
        </Button>
      </Form>
    </div>
  );
}
