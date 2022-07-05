import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header style={{ margin: '2%' }}>
            <h1 style = {{ margin: '1.5%', display: 'flex',  justifyContent:'center', alignItems:'center'}}>{props.title}</h1>
            <nav style = {{ margin: '1%', display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <>
                                    <li><Link to='/profile'>Profile</Link></li>
                                    <li><Link to='/logout'>Logout</Link></li>
                                    <li><Link to='/quiz'>Quiz</Link></li>
                                    <li><Link to='/leadership'>Leadership</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/register'>Register</Link></li>
                                    <li><Link to='/quiz'>Quiz</Link></li>
                                    <li><Link to='/leadership'>Leadership</Link></li>
                                </>

                        )}
                    </UserContext.Consumer>
                </ul>
            </nav>
            <hr></hr>
        </header >
    );
}

export default Header;