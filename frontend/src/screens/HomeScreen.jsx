import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Produto from '../components/Produto.jsx'
import { useGetProdutosQuery } from '../slices/produtosApiSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import {useParams} from 'react-router-dom'

const HomeScreen = () => {
    const {pageNumber} = useParams()
  const {data, isLoading, error} = useGetProdutosQuery({pageNumber});
  return (
    <>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
       <h1>Os Nossos Produtos</h1>
       <Row>
           { data.produtos.map( (produto) => (
               <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                   <Produto produto={produto} />
               </Col>
           ))}
       </Row>
    </>) }
       
    </>
  )
}

export default HomeScreen
