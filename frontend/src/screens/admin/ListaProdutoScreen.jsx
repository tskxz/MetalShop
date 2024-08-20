import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {FaTimes, FaEdit, FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader'
import {useGetProdutosQuery} from '../../slices/produtosApiSlice.js'

const ListaProdutoScreen = () => {
	const {data: produtos, isLoading, error} = useGetProdutosQuery()
	const deleteHandler = (id) => {
		console.log('delete', id)
	}
	return <>
		<Row className='align-items-center'>
			<Col>
				<h1>Produtos</h1>
			</Col>
			<Col className='text-end'>
				<Button className='btn-sm m-3'>
					<FaEdit/> Criar Produto
				</Button>
			</Col>
		</Row>

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
						{produtos.map((produto) => (
							<tr key={produto._id}>
								<td>{produto._id}</td>
								<td>{produto.nome}</td>
								<td>{produto.preco}</td>
								<td>{produto.banda}</td>
								<td>
									<LinkContainer to={`/produto/${produto._id}/edit`}>
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
			</>
		)}
	</>
}

export default ListaProdutoScreen