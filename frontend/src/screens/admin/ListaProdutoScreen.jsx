import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {useGetProdutosQuery, useCriarProdutoMutation, useDeleteProdutoMutation} from '../../slices/produtosApiSlice.js'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import Paginate from '../../components/Paginate'

const ListaProdutoScreen = () => {
	const {pageNumber} = useParams()
	const {data, isLoading, error, refetch} = useGetProdutosQuery({pageNumber})
	const [criarProduto, {isLoading: loadingCreate}] = useCriarProdutoMutation()
	const [deleteProduto, {isLoading: loadingDelete}] = useDeleteProdutoMutation()
	
	const deleteHandler = async (id) => {
		if(window.confirm('Tens a certeza que queres apagar o produto?')){
			try {
				await deleteProduto(id)
				toast.success('Produto apagado')
				refetch()
			} catch(err) {
				toast.error(err?.data?.message || err.error)
			}
		}
	}

	const criarProdutoHandler = async() => {
		if(window.confirm('Tens a certeza que queres criar um produto novv0?')){
			try {
				await criarProduto()
				refetch()
			} catch(err){
				toast.error(err?.data?.message || err.error)
			}
		}
	}
	return <>
		<Row className='align-items-center'>
			<Col>
				<h1>Produtos</h1>
			</Col>
			<Col className='text-end'>
				<Button className='btn-sm m-3' onClick={criarProdutoHandler}>
					<FaEdit/> Criar Produto
				</Button>
			</Col>
		</Row>
		{loadingCreate && <Loader/>}
		{loadingDelete && <Loader/>}
		{isLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
			<>
				<Table striped hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NOME</th>
							<th>PRECO</th>
							<th>BANDA</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.produtos.map((produto) => (
							<tr key={produto._id}>
								<td>{produto._id}</td>
								<td>{produto.nome}</td>
								<td>{produto.preco}</td>
								<td>{produto.banda}</td>
								<td>
									<LinkContainer to={`/admin/produto/${produto._id}/edit`}>
											<Button className='btn-sm mx-2' variant='light'>
												<FaEdit/>
											</Button>
											
										</LinkContainer>
									<Button className='btn-sm mx-2' variant='danger' onClick={() => deleteHandler(produto._id)}>
												<FaTrash/>
											</Button>	
								</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Paginate pages={data.pages} page={data.page} isAdmin={true}/>
			</>
		)}
	</>
}

export default ListaProdutoScreen