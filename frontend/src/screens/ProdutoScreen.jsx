import React from 'react'
import { useParams } from 'react-router-dom'
import produtos from '../produtos'

const ProdutoScreen = () => {
    
    const { id:produtoId } = useParams();
    const produto = produtos.find((p) => p._id === produtoId);
    console.log(produto)

    return (
    <div>
    
    </div>
  )
}


export default ProdutoScreen
