import {useState, useEffect} from 'react'
import {Table, Form, Button, Row, Col} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {usePerfilMutation} from '../slices/utilizadoresApiSlice'
import {setCredentials} from '../slices/authSlice'

const PerfilScreen = () => {
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const dispatch = useDispatch()
	const {utilizadorInfo} = useSelector((state) => state.auth)

	const [atualizarPerfil, {isLoading:loadingAtualizarPerfil}] = usePerfilMutation();
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
			
		</Row>
	)
}

export default PerfilScreen