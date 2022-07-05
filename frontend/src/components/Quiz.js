import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import "../index.css"
import 'bootstrap/dist/css/bootstrap.min.css';



function Quiz() {
    const [questionIndex, setIndex] = useState(0);
    const [error, setError] = useState("");
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const userContext = useContext(UserContext);
    var [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    //var question, choice_1, choice_2, choice_3, choice_4;
    /*
        useEffect(async function() {
            
        }, []);*/

    async function Quiz(e) {
        /*e.preventDefault();
        const res = await fetch("http://localhost:3001/users/quiz", {
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
        }*/
    }

    async function startQuiz() {
        try {
            const res = await fetch("http://localhost:3001/users/quiz", { credentials: "include" });
            const data = await res.json();
            //console.log(data);
            setStarted(true);
            //await setQuestions(data.results);
            var dumpquest = data.results[9];
            var arr = data.results;
            arr.push(dumpquest);
            await setQuestions(arr);
            var dt = Date.now();
            sessionStorage.setItem("time", dt);
        }
        catch (e) {
            console.log(e);
        }


    }

    useEffect(function () {
        if (questionIndex === 10) {
            setFinished(true);
        }
    }, [questionIndex]);

    async function nextQuestion() {
        var now = Date.now();
        var userAnswerRadio = document.querySelector('input[name="answer"]:checked');
        if (userAnswerRadio === null) {
            alert("You cannot leave a question empty");
            return;
        }
        var userAnswer = userAnswerRadio.value;

        var prevTime = sessionStorage.getItem("time");
        var time = (now - prevTime) / 1000;

        console.log(time);

        //console.log(userAnswer.value);
        //console.log("----------\n----------");
        const res = await fetch("http://localhost:3001/users/quiz",
            {
                method: "POST",
                body: JSON.stringify({
                    duration: time,
                    answer: userAnswer,
                    index: questionIndex,
                    username: userContext.user.username
                }),
                headers: { "Content-Type": "application/json" }
            });
        const data = await res.json();
        if (questionIndex === 9) {
            //const data = await res.json();
            console.log(data);
            setScore(data);
        }
        setIndex(questionIndex + 1);
        userAnswerRadio.checked = false;
        var dt = Date.now();
        sessionStorage.setItem("time", dt);
    }

    function createMarkup(str) {
        return {
           __html: str    };
     }; 

    return (

        <Container style={{ margin: '1%' }}>
            {userContext.user ?
                <Container>
                    {!started ?
                        
                        <Button id='startquiz' onClick={startQuiz}>Start the Quiz</Button>
                        :
                        <Container>
                            {!finished ?
                                <Container>
                                    <h4 style={{margin: "2%"}}>Q{questionIndex+1}-) <span dangerouslySetInnerHTML={createMarkup(questions[questionIndex].question)}></span></h4>
                                    <Container style={{margin: "2%"}}>
                                        <Row>
                                            <Col><input type="radio" value={questions[questionIndex].answers[0]} name="answer" /> <span dangerouslySetInnerHTML={createMarkup(questions[questionIndex].answers[0])}></span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col><input type="radio" value={questions[questionIndex].answers[1]} name="answer" /> <span dangerouslySetInnerHTML={createMarkup(questions[questionIndex].answers[1])}></span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col><input type="radio" value={questions[questionIndex].answers[2]} name="answer" /> <span dangerouslySetInnerHTML={createMarkup(questions[questionIndex].answers[2])}></span></Col>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Col><input type="radio" value={questions[questionIndex].answers[3]} name="answer" /> <span dangerouslySetInnerHTML={createMarkup(questions[questionIndex].answers[3])}></span></Col>
                                        </Row>
                                    </Container>

                                    <Button style={{margin: "2%"}} variant="outline-primary" onClick={nextQuestion}>Next Question</Button>
                                </Container>
                                :
                                <Container><h4><b>You finished the test!<br></br>Your score is: {score}</b></h4></Container>
                            }
                        </Container>
                    }
                </Container>
                :
                <h3><b>Please Log in to see the Quiz</b></h3>
            }
        </Container>


    );
}

export default Quiz;
/* <div dangerouslySetInnerHTML={createMarkup(questions[questionIndex].question)}></div>
*/