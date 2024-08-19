import {Link, useParams} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useGetEncomendaDetailsQuery} from '../slices/encomendasApiSlice';

const EncomendaScreen = () => {
	const {id: encomendaId} = useParams();
	const {data: encomenda, refetch, isLoading, error} = useGetEncomendaDetailsQuery(encomendaId)
	console.log(encomenda)
	return isLoading ? <Loader/> : error ? <Message variant='danger'/> : (
		<>
			<h1>Encomenda {encomendaId}</h1>
			<Row>
				<Col md={8}>
					<ListGroup>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Nome: {encomenda.utilizador.nome}</strong>
							</p>
							<p>
								<strong>Email: {encomenda.utilizador.email}</strong>
							</p>
							<p>
								<strong>Endereco: {encomenda.enderecoPostal.endereco}, {encomenda.enderecoPostal.cidade}{' '}{encomenda.enderecoPostal.codigoPostal}, {encomenda.enderecoPostal.pais}</strong>
							</p>
							{encomenda.isEntregue ? (
								<Message variant='success'>
									Entregue em {encomenda.entregeEm}
								</Message>
							) : (
								<Message variant='danger'>
									Não entregue
								</Message>
							)}						
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Método de pagamento</h2>
							<p>
								<strong>Método: </strong>
								{encomenda.metodoPagamento}
							</p>
							{encomenda.isPago ? (
								<Message variant='success'>
									Pago em {encomenda.pagoEm}
								</Message>
							) : (
								<Message variant='danger'>
									Não pago
								</Message>
							)}
							
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Itens de encomenda</h2>
							{encomenda.encomendaItens.map((item, index) => (
								<ListGroup.Item>
									<Row>
										<Col md={1}>
											<Image src={item.imagem} alt={item.nome} fluid rounded/>
										</Col>
										<Col>
											<Link to={`/produtos/${item.produto}`}>
												{item.nome}
											</Link>
										</Col>

										<Col md={4}>
											{item.quantidade} x ${item.preco} = ${item.quantidade*item.preco}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Resumo da encomenda</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Itens</Col>
									<Col>${encomenda.precoItens}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Envio</Col>
									<Col>${encomenda.precoEnvio}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Taxa</Col>
									<Col>${encomenda.precoTaxa}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${encomenda.precoTotal}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default EncomendaScreen