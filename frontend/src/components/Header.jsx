import React from 'react'
import {Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; 
import {LinkContainer} from 'react-router-bootstrap';
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../slices/utilizadoresApiSlice.js'
import {useNavigate} from 'react-router-dom'
import {logout} from '../slices/authSlice.js'
import SearchBox from '../components/SearchBox'

const Header = () => {
    const {carrinhoItens} = useSelector((state) => state.carrinho)
    const {utilizadorInfo} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout())
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

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
                    <SearchBox/>
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
                        {utilizadorInfo ? (
                            <NavDropdown title={utilizadorInfo.nome} id='username'>
                                <LinkContainer to='/perfil'>
                                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>):( <LinkContainer to='login'>
                            <Nav.Link><FaUser/> Entrar </Nav.Link>
                        </LinkContainer>)}
                        {utilizadorInfo && utilizadorInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/listaencomenda'>
                                    <NavDropdown.Item>Encomendas</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/listaproduto'>
                                    <NavDropdown.Item>Produtos</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/listautilizador'>
                                    <NavDropdown.Item>Utilizadores</NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        )}
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
