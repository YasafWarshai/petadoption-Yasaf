import { Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from "react-router-dom";
import favicon from '../Images/favicon.png'
import LoginModal from './LoginModal';
import { useContext } from 'react';
import authContext from '../Context/AuthContext';



function NavBar() {
  const navigate = useNavigate()
const { token, setToken, setUserInfo } = useContext(authContext)

  function logout(){
    try {
      sessionStorage.clear('token')
      setUserInfo({})
      setToken('')
     navigate('/')  
    } catch (err){
      console.log(err)
    }
    }



  return (
    <Navbar style={{margin: "0", padding: "0"}} bg="light" expand="lg">
      <Container fluid className='navigation'>
        <Navbar.Brand href="/"><Image rounded className='logo' alt={'PetConnect'} src={favicon}></Image></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link className="navItem" to="/">
        Home
      </Link>
      <Link className="navItem" to="/profile">
        Profile
      </Link>
      <Link className="navItem" to="/mypets">
        My Pets
      </Link>
      <Link className="navItem" to="/addpet">
      Add Pet
      </Link>
      <Link className="navItem" to="/search">
     Search
      </Link>
          </Nav>
          {token ? <Button onClick={logout} className={"button-second"} variant="success">logout</Button> : <LoginModal />}
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;