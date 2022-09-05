import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useContext } from 'react'
import authContext from '../Context/AuthContext';


function ProfileCard() {

    const { userInfo, setUserInfo} = useContext(authContext)


  return (
    <>
    <h1>User Info</h1>
    <Card  className={'profCard'}style={{ width: '18rem' }}>
      <Card.Body className={'card-header'}>
        <Card.Title > <h2>{userInfo.firstName} {userInfo.lastName}</h2> </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item> <h5>{`Email: ${userInfo.email}`}</h5> </ListGroup.Item>
        <ListGroup.Item><h5>{userInfo.phone ? `Phone: ${userInfo.phone}` : 'No Phone'} </h5> </ListGroup.Item>
        {userInfo.bio  ?   <ListGroup.Item><h5>{userInfo.bio} </h5> </ListGroup.Item> : ''}
      </ListGroup>
    </Card>
    </>
  );
}

export default ProfileCard;