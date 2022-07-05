import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

function Profile() {
    const userContext = useContext(UserContext);

    return (
        <div style={{ margin: '2%', textAlign: "center"}}>
            <h2 style={{margin: '2%'}}>Welcome to Quiz Application</h2>
            {!userContext.user ?
                <Container><Link to='/profile'><i>Please log in to see more content</i></Link></Container>
                :
                <h3>You can start your quiz from the menu</h3>
            }
        </div>
    );
}

export default Profile;