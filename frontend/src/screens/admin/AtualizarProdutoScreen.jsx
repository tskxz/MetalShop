import {useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import {toast} from 'react-toastify'
import {useAtualizarProdutoMutation, useGetProdutoQuery} from '../../slices/produtosApiSlice.js'

const AtualizarProdutoScreen = () => {
	const {id: produtoId} = useParams();
	const [nome, setNome] = useState("")
	const [preco, setPreco] = useState(0)
	const [imagem, setImagem] = useState("")
	const [banda, setBanda] = useState("")
	const [descricao, setDescricao] = useState("")
	const [categoria, setCategoria] = useState("")
	const [genero, setGenero] = useState("")
	const [tamanho, setTamanho] = useState("")
	const [cor, setCor] = useState("")
	const [emStock, setEmStock] = useState(0)

	const {data: produto, isLoading, refetch, error} = useGetProdutoQuery(produtoId);
	const [atualizarProduto, {isLoading: loadingUpdate}] = useAtualizarProdutoMutation()

	const navigate = useNavigate()

	useEffect(() => {
		if(produto){
			setNome(produto.nome)
			setPreco(produto.preco)
			setImagem(produto.imagem)
			setBanda(produto.banda)
			setDescricao(produto.descricao)
			setCategoria(produto.categoria)
			setGenero(produto.genero)
			setTamanho(produto.tamanho)
			setCor(produto.cor)
			setEmStock(produto.emStock)

		}
	}, [produto])
	const submitHandler = async(e) => {
		e.preventDefault()
		const produtoAtualizado = {
			produtoId,
			nome,
			preco,
			banda,
			imagem,
			descricao,
			categoria,
			genero,
			tamanho,
			cor,
			emStock
		};

		const result = await atualizarProduto(produtoAtualizado)
		if(result.error){
			toast.error(result.error)
		} else {
			toast.success('produto atualizado')
			navigate('/admin/listaproduto')
		}
	}
	return <>
		<Link to="/admin/listaproduto" className='btn btn-light my-3'>
		Voltar
		</Link>
		<FormContainer>
			<h1>Editar produto</h1>
			{loadingUpdate && <Loader/>}
			{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='nome'>
						<Form.Label>Nome</Form.Label>
							<Form.Control type='nome' placeholder='escreve o nome' value={nome} onChange={(e) => setNome(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>


					<Form.Group controlId='preco'>
						<Form.Label>Preco</Form.Label>
							<Form.Control type='number' placeholder='escreve o preco' value={preco} onChange={(e) => setPreco(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='banda'>
						<Form.Label>Banda</Form.Label>
							<Form.Control type='text' placeholder='escreve a banda' value={banda} onChange={(e) => setBanda(e.target.value)}>
								
							</Form.Control>
					</Form.Group>

					<Form.Group controlId='descricao'>
						<Form.Label>Descricao</Form.Label>
							<Form.Control type='text' placeholder='escreve a descricao' value={descricao} onChange={(e) => setDescricao(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='image'>
		              <Form.Label>Imagem</Form.Label>
		              <Form.Control type='text' placeholder='Enter image url' value={imagem} onChange={(e) => setImagem(e.target.value)}></Form.Control>
		             </Form.Group>

					<Form.Group controlId='categoria'>
						<Form.Label>Categoria</Form.Label>
							<Form.Control type='text' placeholder='escreve a categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='genero'>
						<Form.Label>Genero</Form.Label>
							<Form.Control type='text' placeholder='escreve a genero' value={genero} onChange={(e) => setGenero(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='tamanho'>
						<Form.Label>Tamanho</Form.Label>
							<Form.Control type='text' placeholder='escreve a tamanho' value={tamanho} onChange={(e) => setTamanho(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>

					<Form.Group controlId='cor'>
						<Form.Label>Cor</Form.Label>
							<Form.Control type='text' placeholder='escreve a cor' value={cor} onChange={(e) => setCor(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>
					<Form.Group controlId='emStock'>
						<Form.Label>Em Stock</Form.Label>
							<Form.Control type='number' placeholder='escreve a descricao' value={emStock} onChange={(e) => setEmStock(e.target.value)}>
								
							</Form.Control>
						
					</Form.Group>
					<Button type='submit' variant='primary' className='my-2'>Atualizar produto</Button>
				</Form>
			)}
		</FormContainer>
	</>
}

export default AtualizarProdutoScreen