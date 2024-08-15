import React from 'react'
import { useParams } from 'react-router-dom'
import {useGetProdutoQuery} from '../slices/produtosApiSlice'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';

const ProdutoScreen = () => {
  const {id: produtoId} = useParams()
  const {data: produto, isLoading, error}  = useGetProdutoQuery(produtoId);
    return(
    <>
    {isLoading ? (<h2>Loading</h2>) : error ? (<div>{error?.data?.message || error.error}</div>) : (<>
    <Link className='btn btn-light my-3' to='/'> Go Back </Link>
      <Row>
        <Col md={5}>
          <Image src={produto.imagem} alt={produto.nome} fluid />
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>{produto.nome}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating value={produto.rating} text={`${produto.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            Preco: ${produto.preco} 
          </ListGroup.Item>
          <ListGroup.Item>
            Descricao: ${produto.descricao} 
          </ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Preco: </Col>
                <Col>
                  <strong>{produto.preco}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status: </Col>
                <Col>
                  <strong>{produto.emStock > 0 ? 'Em Stock' : 'Fora do stock'}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button className='btn-block' type='button' disabled={produto.emStock === 0}>Adicionar ao carrinho</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
         </Col>
      </Row>
    </>)}
      
    </>
  )
}


export default ProdutoScreen
