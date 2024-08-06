import React from 'react'
import {Row, Col} from 'react-bootstrap'
import produtos from '../produtos.js'

const HomeScreen = () => {
  return (
    <>
        <h1>Os Nossos Produtos</h1>
        <Row>
            { produtos.map( (produto) => (
                <Col sm={12} md={6} lg={4} xl={3}>
                    <h3>{produto.nome}</h3>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen
