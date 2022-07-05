import { useState, useContext } from 'react';
import { UserContext } from '../userContext';
import Form from 'react-bootstrap/Form'
import { Button, Col, Container, Row } from 'react-bootstrap';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);
    const userContext = useContext(UserContext);

    async function Register(e){
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if(data._id !== undefined){
            userContext.setUserContext(data);
            window.location.href="/";
        }
        else{
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return(
        <Container>
            <Form onSubmit={Register}>
                <Form.Group as={Row} className="mb-3 offset-4" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="text" placeholder="Email" value={email} onChange={(e) => (setEmail(e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 offset-4" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3 offset-4" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => (setPassword(e.target.value))}/>
                    </Col>
                </Form.Group>
                <Col style={{marginTop: "3%"}} sm={{span: 1, offset: 6}}><input type="submit" name="submit" value="Sign Up" /></Col>
            </Form>
        </Container>
    );
}

export default Register;

/*
<form onSubmit={Register} style={{ margin: '1%' }}>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e)=>(setUsername(e.target.value))}/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
            <input type="submit" name="submit" value="Login" />
            <label>{error}</label>
</form>
*/