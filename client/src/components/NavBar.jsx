import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import {Link} from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const NavBar = () => {

    const { user, logoutUser } = useContext(AuthContext)


    return  <Navbar bg="transparent" className="mb-4" style={{height : "3.75rem"}}>
     <Container>
      <h2>
       <Link to="/" className="link-light text-decoration-none">
        TextMe
        </Link> 
        </h2>
      { user && <span className="text-light"> <span style={{ color: 'green' }}> &bull;</span> {user?.name}</span>}
        <Nav>
            <Stack direction="horizontal" gap="3" >
              {!user && (
               <>
               <Link to="/login" className="link-light text-decoration-none">
               Login
              </Link>
              <Link to="/register" className="link-grey text-decoration-none">
               Sign up
              </Link> 
               </>) }  

            
            {
                   user && (<>
                   <Link onClick={( ) => logoutUser()} to="/login" className="link-danger text-decoration-none">
                    Log out
                  </Link>
                   </>)
                 }

            </Stack>
        </Nav>
      
     </Container>
    </Navbar> ;
}
 
export default NavBar;