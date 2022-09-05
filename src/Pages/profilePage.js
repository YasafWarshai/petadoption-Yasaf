import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import authContext from "../Context/AuthContext";
import ProfileCard from "../Components/ProfileCard";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const { userInfo, setUserInfo, baseUrl, token } = useContext(authContext);
  const navigate = useNavigate()
  const [tempInfo, setTempInfo] = useState("");
  const [formStatus, setFormStatus] = useState("profileForm visually-hidden");

  useEffect(() => {
    if (!token){
      navigate('/')
    } else {
    setTempInfo(userInfo);
    }
  }, []);



  const handleChange = (e) => {
    setTempInfo({ ...tempInfo, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    const res = await axios.put(`${baseUrl}/users/edituser`, tempInfo);
    if (res.status === 200) {
      await console.log(res);
      await setUserInfo(tempInfo);
      await toggleForm();
    } else {
      window.alert("changes not processed");
    }
  };

  const toggleForm = () => {
    if (formStatus === "profileForm visually-hidden") {
      setFormStatus("profileForm");
    }
    if (formStatus === "profileForm") {
      setFormStatus("profileForm visually-hidden");
    }
  };

  return (
    <div className="profileBody">
      <ProfileCard />
      <Button
        variant={"secondary"}
        className={"button-second profButton"}
        onClick={toggleForm}
      >
        Edit User Info
      </Button>
      <div className={formStatus}>
        <Form>
          <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type={"text"}
              name={"firstName"}
              value={tempInfo.firstName}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 ">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={tempInfo.lastName}
              type={"text"}
              onChange={handleChange}
              name={"lastName"}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} className="mb-3 ">
            <Form.Label>Change Password</Form.Label>
            <Form.Control
              autoComplete="off"
              type={"password"}
              onChange={handleChange}
              name={"password"}
              className={"changeItem"}
            ></Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              autoComplete="off"
              type={"password"}
              name={"repassword"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} className="mb-3 ">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={tempInfo.email}
              type={"email"}
              name={"email"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} className="mb-3 ">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={tempInfo.phone}
              name={"phone"}
              type={"number"}
              onChange={handleChange}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group as={Col} className="mb-3 ">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              value={tempInfo.bio}
              type={"text"}
              onChange={handleChange}
              name={"bio"}
              className={"changeItem"}
            ></Form.Control>
          </Form.Group>
          </Row>
          <Button variant="primary" className={'button mb-5'} onClick={saveChanges}>
            Save Changes
          </Button>
        </Form>
      </div>
    </div>
  );
}
