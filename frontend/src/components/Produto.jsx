import {Card, CardBody} from "react-bootstrap"
import { Link } from 'react-router-dom';
import React from 'react'
import Rating from './Rating';

const Produto = ({produto}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <Link to={`/produto/${produto._id}`}>
            <Card.Img src={produto.imagem} variant="top" />
        </Link>

        <CardBody>
            <Link to={`/produto/${produto._id}`}>
                <Card.Title as="div">
                    <strong>{produto.nome}</strong>
                </Card.Title>
            </Link>
            
            <Card.Text as="div" className="product-title">
                <Rating value={produto.rating} text={`${produto.numReviews} reviews`}/>
            </Card.Text>

            <Card.Text as="h3">
                ${produto.preco}
            </Card.Text>
        </CardBody>
    </Card>
  )
}

export default Produto
