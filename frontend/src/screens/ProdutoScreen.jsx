import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {useGetProdutoQuery, useCriarReviewMutation} from '../slices/produtosApiSlice'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { adicionarToCarrinho } from '../slices/carrinhoSlice';
import Meta from '../components/Meta'

const ProdutoScreen = () => {
  const {id: produtoId} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantidade, setQuantidade] = useState(1);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState(0) 
  const {data: produto, refetch, isLoading, error}  = useGetProdutoQuery(produtoId);
  const [criarReview, {isLoading:loadingProdutoReview}] = useCriarReviewMutation() 
  const {utilizadorInfo} = useSelector((state) => state.auth)
  const adicionarToCarrinhoHandler = () => {
    dispatch(adicionarToCarrinho({...produto, quantidade}));
    navigate('/carrinho');
  }

  const submitHandler = async(e) => {
    e.preventDefault()
    try{
      await criarReview({
        produtoId,
        rating,
        comentario
      }).unwrap()
      refetch()
      toast.success('review submitted')
      setRating(0)
      setComentario('')
    } catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }  
    return(
    <>
    {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.error}</Message>) : (<>
    <Link className='btn btn-light my-3' to='/'> Go Back </Link>
    <Meta title={produto.nome}/>
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
      <Row className='review'>
        <Col md={6}>
          <h2>Reviews</h2>
          {produto.reviews.length===0 && <Message>Sem reviews</Message>}
          <ListGroup variant='flush'>
            {produto.reviews.map(review => (
              <ListGroup.Item key={review._id}>
                <strong>{review.nome}</strong>
                <Rating value={review.rating}/>
                <p>{review.createdAt.substring(0,10)}</p>
                <p>{review.comentario}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <ListGroup.Item>
            <h2>Escreva uma review</h2>
            {loadingProdutoReview && <Loader/>}
            {utilizadorInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='rating' className='my-2'>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control as='select' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value=''>Select ...</option>
                    <option value='1'>1 - Poor</option>
                    <option value='2'>2 - Fair</option>
                    <option value='3'>3 - Good</option>
                    <option value='4'>4 - Very Good</option>
                    <option value='5'>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='comentario' className='my-2'>
                  <Form.Label>
                    Comentário
                  </Form.Label>
                  <Form.Control as='textarea' row='3' value={comentario} onChange={(e) => setComentario(e.target.value)}>
                  </Form.Control>
                </Form.Group>
                <Button disabled={loadingProdutoReview} type='submit' variant='primary'>Submit</Button>
              </Form>
            ) : (
            <Message>Por favor faça <Link to='/login'>login</Link> para escrever uma review</Message>)}
          </ListGroup.Item>
        </Col>
      </Row>
    </>)}
      
    </>
  )
}


export default ProdutoScreen
