import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react'
import {Row, Col} from 'react-bootstrap'
import Produto from '../components/Produto.jsx'

const HomeScreen = () => {

  const [produtos, setProdutos] = useState([]);
  
  useEffect(() => {
    const fetchProdutos = async () => {
      const {data} = await axios.get('/api/produtos');
      setProdutos(data)
    };

    fetchProdutos();
  }, [])

  return (
    <>
        <h1>Os Nossos Produtos</h1>
        <Row>
            { produtos.map( (produto) => (
                <Col key={produto._id} sm={12} md={6} lg={4} xl={3}>
                    <Produto produto={produto} />
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen
