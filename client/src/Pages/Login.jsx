import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import { useContext } from "react";
import { AuthContext } from '../context/AuthContext';


const Login = () => {

     const {  
        loginUser, 
        loginError, 
        loginInfo, 
        updateLoginInfo, 
        isLoginLoading}  = useContext(AuthContext);


    return (
     <>
    <Form onSubmit = {loginUser}>
        <Row style={{
            justifyContent: "center",
            height: '100vh',
            paddingTop: "10%",

        }}>
            <Col xs={6}>
            <Stack gap="3">
                <h2 style={{color :'white'}}>
                   Login
                </h2>
                <Form.Control type="email" placeholder="Email" onChange = {(e) => updateLoginInfo({...loginInfo, email: e.target.value})} />
                <Form.Control type="password" placeholder="Password" onChange = {(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                <Button variant="primary" type="submit" >
                    {isLoginLoading? "Please wait..." :  "Log In"}
                </Button>


                {loginError?.error && 
                <Alert variant="danger">
                     <p>{loginError?.message}</p> 
                </Alert>}
            </Stack>
            </Col>
        </Row>
    </Form>
    
    </> 
)}
 
export default Login;
