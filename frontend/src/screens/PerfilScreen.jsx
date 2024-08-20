import {useState, useEffect} from 'react'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {usePerfilMutation} from '../slices/utilizadoresApiSlice'
import {setCredentials} from '../slices/authSlice'
import {useGetMinhasEncomendasQuery} from '../slices/encomendasApiSlice'
import {FaTimes} from 'react-icons/fa'

const PerfilScreen = () => {
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const dispatch = useDispatch()
	const {utilizadorInfo} = useSelector((state) => state.auth)

	const [atualizarPerfil, {isLoading:loadingAtualizarPerfil}] = usePerfilMutation();

	const {data: encomendas, isLoading, error} = useGetMinhasEncomendasQuery()
	console.log(encomendas)
	useEffect(() => {
		if(utilizadorInfo){
			setNome(utilizadorInfo.nome)
			setEmail(utilizadorInfo.email);
		}
	}, [utilizadorInfo, utilizadorInfo.nome, utilizadorInfo.email])

	const submitHandler = async (e) => {
		e.preventDefault()
		if(password!==confirmPassword){
			toast.error('a tua paççeworde naum esta iguale...')
		} else {
			try {
				const res = await atualizarPerfil({_id:utilizadorInfo._id, nome, email, password}).unwrap();
				dispatch(setCredentials(res))
				toast.success('perfil atualizado!')
			} catch(err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	return (
		<Row>
			<Col md={3}>
				<h2>Perfil do utilizador</h2>
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='nome' className='my-2'>
						<Form.Label>Nome</Form.Label>
						<Form.Control type='nome' placeholder='enter nome' value={nome} onChange={(e) => setNome(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='email' className='my-2'>
						<Form.Label>Emaileee</Form.Label>
						<Form.Control type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='my-2'>
						<Form.Label>paçeeeworde</Form.Label>
						<Form.Control type='password' placeholder='o teu paçseuorde' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='password' className='my-2'>
						<Form.Label>confirmare a paçeeeworde</Form.Label>
						<Form.Control type='password' placeholder='confirmare paçseuorde' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary' className='my-2'>atualizare</Button>
					{loadingAtualizarPerfil && <Loader/>}
				</Form>
			</Col>
			<Col md={9}>
				<h2>Minhas encomendas</h2>
				{isLoading ? (<Loader/>): error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (
					<Table striped hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>Total</th>
								<th>Pago</th>
								<th>Entregue</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{encomendas.map((encomenda) => (

								<tr key={encomenda._id}>
									<td>{encomenda._id}</td>
									<td>{encomenda.createdAt.substring(0,10)}</td>
									<td>{encomenda.precoTotal}</td>
									<td>
										{encomenda.isPago ? (
										encomenda.pagoEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										{encomenda.isEntrege ? (
										encomenda.entregeEm.substring(0,10)
										) : (
											<FaTimes style={{color: 'red'}}/>
										)}
									</td>
									<td>
										<LinkContainer to={`/encomenda/${encomenda._id}`}>
											<Button className='btn-sm' variant='light'>
												Detalhes
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
			
		</Row>
	)
}

export default PerfilScreen