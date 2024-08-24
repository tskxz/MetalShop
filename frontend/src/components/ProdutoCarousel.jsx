import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {useGetTopProdutosQuery} from '../slices/produtosApiSlice.js'

const ProdutoCarousel = () => {
	const {data: produtos, isLoading, error} = useGetTopProdutosQuery()
	return isLoading ? <Loader/> : error ? <Message variant='danger'>{Error}</Message> : (
		<Carousel pause='hover' className='bg-primary mb-4'>
			{produtos.map(produto=>(
				<Carousel.Item key={produto._id}>
					<Link to={`/produto/${produto._id}`}>
						<div className="carousel-image-container">
						    <Image className='carousel-image' src={produto.imagem} alt={produto.nome} fluid />
						</div>
						<Carousel.Caption className='carousel-caption'>
							<h2>{produto.nome} (${produto.preco})</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default ProdutoCarousel