import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import authContext from "../Context/AuthContext";
import { Navigate } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function LoginModal() {
  const [show, setShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState({});
  const [signupInfo, setSignupInfo] = useState({});
  const { setToken, baseUrl, setWelcomeName, setUserInfo } =
    useContext(authContext);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleLoginInput = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/users/login`, loginInfo);
      if (res.data.token) {
        sessionStorage.setItem("token", JSON.stringify(res.data.token));
        setToken(res.data.token);
        setUserInfo(res.data.user);
        console.log(res.data.user);
        handleClose();
      }
      setLoginInfo({});
      handleClose();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSignupInput = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value, bio: "" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log(signupInfo);
      const res = await axios.post(`${baseUrl}/users/signup`, signupInfo);
      if (res.status === 200) {
        setSignupInfo({});
        toast.success("user created! please log in");
        handleClose();
      }
    } catch (err) {
      toast.warn("error signing up");
    }
  };
  return (
    <>
      <ToastContainer />
      <Button className="button-second" variant="success" onClick={handleShow}>
        Login/Sign Up{" "}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Control
              type={"email"}
              name={"email"}
              placeholder={"email"}
              onChange={handleLoginInput}
              className={"loginEmailInput"}
              required
            ></Form.Control>
            <Form.Control
              type={"password"}
              name={"password"}
              autoComplete={"off"}
              onChange={handleLoginInput}
              placeholder={"password"}
              className={"loginPasswordInput"}
              required
            ></Form.Control>
            <Button className={"button"} variant="primary" type={"submit"}>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Control
              type={"text"}
              required
              name={"firstName"}
              placeholder={"First Name"}
              onChange={handleSignupInput}
              className={"signupFirstName"}
            ></Form.Control>
            <Form.Control
              type={"text"}
              required
              name={"lastName"}
              placeholder={"Last Name"}
              onChange={handleSignupInput}
              className={"signupLastName"}
            ></Form.Control>
            <Form.Control
              type={"email"}
              required
              name={"email"}
              placeholder={"email"}
              onChange={handleSignupInput}
              className={"signupEmailInput"}
            ></Form.Control>
            <Form.Control
              type={"password"}
              required
              name={"password"}
              autoComplete={"off"}
              onChange={handleSignupInput}
              placeholder={"password"}
              className={"signupPasswordInput"}
            ></Form.Control>
            <Form.Control
              type={"password"}
              required
              name={"repassword"}
              autoComplete={"off"}
              onChange={handleSignupInput}
              placeholder={"password"}
              className={"signupPasswordInput"}
            ></Form.Control>
            <Form.Control
              type={"number"}
              name={"phone"}
              onChange={handleSignupInput}
              placeholder={"phone #"}
              className={"signupPhoneInput"}
            ></Form.Control>
            <Button className="button" variant="primary" type={"submit"}>
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
