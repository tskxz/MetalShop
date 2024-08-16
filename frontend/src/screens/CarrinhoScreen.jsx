import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import {FaTrash} from 'react-icons/fa'
import Message from '../components/Message'

const CarrinhoScreen = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const carrinho = useSelector((state) => state.carrinho);
	const {carrinhoItens} = carrinho;

	return (
		<Row>
			<Col md={8}>
				<h1 style={{marginBottom: '20px'}}>Carrinho de compras</h1>
				{carrinhoItens.length === 0 ? (
					<Message>O teu carrinho está vazio <Link to='/'>Voltar atras</Link></Message>
				) : (
					<ListGroup variant='flush'>
						Itens
					</ListGroup>
				)}
			</Col>
		</Row>
	)
}

export default CarrinhoScreen