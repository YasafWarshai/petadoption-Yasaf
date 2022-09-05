import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import PetCard from '../Components/PetCard';
import { useContext, useEffect, useState } from 'react';
import petContext from '../Context/PetContext';
import authContext from '../Context/AuthContext';
import { useNavigate } from 'react-router';


function MyPets() {

  const {  petsList, setPetsList } = useContext(petContext)
  const { baseUrl, headers, token } = useContext(authContext)
const navigate = useNavigate()

  const getPets = async () => {
   const res = await axios.get(`${baseUrl}/pets`, headers);
    await setPetsList(res.data);
    await console.log(petsList)
    console.log('here')
}

useEffect(() => {
 if (!token){
  navigate('/')}
}, [])


  useEffect(() => {
    getPets()
  }, [])
  

  return (
    <>
    <Container className='pt-5' fluid>
    <Row xs={1}  md={2} lg={3} className="g-1">
      {Array.from(petsList).map((pet) => (
        <Col key={pet._id}>
          <PetCard 
          owner={pet.owner}
          className='petCard' 
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
          dietary={Array.from(pet.dietary)}
          />
        </Col>
      ))}
    </Row>
    </Container>
    </>
  );
}

export default MyPets;