import React, { useState, useEffect } from 'react';
import './css/header.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

function Header() {
  
  const[detectRoute, setRoute ] = useState(false);


  function getCookiesMap(cookiesString) {
    return cookiesString.split(";")
      .map(function(cookieString) {
          return cookieString.trim().split("=");
      })
      .reduce(function(acc, curr) {
          acc[curr[0]] = curr[1];
          return acc;
      }, {});
  }


  useEffect(() => {
    var cookies = getCookiesMap(document.cookie);
    var cookieValue = cookies["auth_token"];

    if(cookieValue){
      setRoute({
        detectRoute: true,
      }) 
    }

  },[]);


const logoutHandler = () => {

      document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}

  
  return (
        <>
          <Navbar bg="white" expand="sm" fixed="top" style={{width:'100vw'},{height:'9vh'}}>
            <Container >
              <Navbar.Brand href="#home"> <img
                                  src="https://vyaparwebsiteimages.vypcdn.in/logo1.svg"
                                  width="60%"
                                  height="60%"
                                  className="d-inline-block align-top"
                                  alt="React Bootstrap logo"
                              /></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav"  className=''>
                <Nav className=''>
                  {detectRoute ?  <Nav.Link href="/" className='' onClick={logoutHandler}>Logout</Nav.Link> :  <Nav.Link href="/" className=''>Login</Nav.Link>}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
    )
}

export default Header
