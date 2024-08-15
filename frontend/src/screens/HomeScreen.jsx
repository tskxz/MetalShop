import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Produto from '../components/Produto.jsx'
import { useGetProdutosQuery } from '../slices/produtosApiSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'

const HomeScreen = () => {
  const {data: produtos, isLoading, error} = useGetProdutosQuery();
  return (
    <>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
       <h1>Os Nossos Produtos</h1>
       <Row>
           { produtos.map( (produto) => (
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
