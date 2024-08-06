import {Card, CardBody} from "react-bootstrap"
import React from 'react'

const Produto = ({produto}) => {
  return (
    <Card className="my-3 p-3 rounded">
        <a href={`/produto/${produto._id}`}>
            <Card.Img src={produto.imagem} variant="top" />
        </a>

        <CardBody>
            <a href={`/produto/${produto._id}`}>
                <Card.Title as="div">
                    <strong>{produto.nome}</strong>
                </Card.Title>
            </a>

            <Card.Text as="h3">
                ${produto.preco}
            </Card.Text>
        </CardBody>
    </Card>
  )
}

export default Produto
