import React from 'react'
import {Badge, Navbar, Nav, Container} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector} from 'react-redux'

const Header = () => {
    const {carrinhoItens} = useSelector((state) => state.carrinho)
    console.log(carrinhoItens)
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>MetalShop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <LinkContainer to='carrinho'>
                            <Nav.Link>
                               <FaShoppingCart/> Carrinho
                               {
                                carrinhoItens.length > 0 && (
                                    <Badge pill bg='success' style={{marginLeft: '5px'}}>{carrinhoItens.reduce((a, c) => a+c.quantidade, 0)}</Badge>
                                )
                               }
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='login'>
                            <Nav.Link><FaUser/> Entrar </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
