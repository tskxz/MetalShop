import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Produto from '../components/Produto.jsx'
import { useGetProdutosQuery } from '../slices/produtosApiSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import {useParams} from 'react-router-dom'
import Paginate from '../components/Paginate.jsx'
import {Link} from 'react-router-dom'
import ProdutoCarousel from '../components/ProdutoCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
    const {pageNumber, keyword} = useParams()
  const {data, isLoading, error} = useGetProdutosQuery({keyword, pageNumber});
  return (
    <>
    {!keyword ? <ProdutoCarousel/> : (<Link to='/' className='btn btn-light mb-4'> Go back </Link>)}
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
        <Meta/>
       <h1>Os Nossos Produtos</h1>
       <Row>
           { data.produtos.map( (produto) => (
               <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                   <Produto produto={produto} />
               </Col>
           ))}
       </Row>
       <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''}/>
    </>) }
       
    </>
  )
}

export default HomeScreen
