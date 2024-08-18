import {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const EncomendarScreen = () => {
	const navigate = useNavigate()
	const carrinho = useSelector((state) => state.carrinho)
	useEffect(() => {
		if(!carrinho.enderecoPostal.endereco){
			navigate('/compra')
		} else if(!carrinho.metodoPagamento){
			navigate('/pagamento')
		}
	}, [carrinho.metodoPagamento, carrinho.enderecoPostal.endereco, navigate])
	return <>
		<CheckoutSteps step1 step2 step3 step4/>
		<Row>
			<Col md={8}>
			Column
			</Col>
			<Col md={4}>
			Column
			</Col>
		</Row>
	</>
}

export default EncomendarScreen