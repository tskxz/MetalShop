import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useGetProdutoQuery} from '../slices/produtosApiSlice'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { adicionarToCarrinho } from '../slices/carrinhoSlice';

const ProdutoScreen = () => {
  const {id: produtoId} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);
 
  const {data: produto, isLoading, error}  = useGetProdutoQuery(produtoId);

  const adicionarToCarrinhoHandler = () => {
    dispatch(adicionarToCarrinho({...produto, quantidade}));
    navigate('/carrinho');
  }
    return(
    <>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
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
            {produto.emStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantidade</Col>
                  <Col>
                    <Form.Control as='select' value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
                      {[...Array(produto.emStock).keys()].map((x) => (<option key={x+1} value={x+1}>{x+1}</option>))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Button className='btn-block' type='button' disabled={produto.emStock === 0} onClick={adicionarToCarrinhoHandler}>Adicionar ao carrinho</Button>
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
