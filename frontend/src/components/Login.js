import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { Button, Col, Container, Row } from 'react-bootstrap';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <Container style={{ marginLeft: '35%' }}>
            {userContext.user ? <Navigate replace to="/" /> : ""}
            <Form onSubmit={Login}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Username
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => (setUsername(e.target.value))}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Password
                    </Form.Label>
                    <Col sm="3">
                        <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => (setPassword(e.target.value))}/>
                    </Col>
                </Form.Group>
                <Col style={{marginTop: "3%"}} sm={{span: 1, offset: 2}}><input type="submit" name="submit" value="Log in" /></Col>
                <Col style={{marginTop: "3%"}} sm={{span: 1, offset: 2}}><Link to='/fb'>Facebook</Link></Col>
            </Form>
        </Container>
    );
}

export default Login;