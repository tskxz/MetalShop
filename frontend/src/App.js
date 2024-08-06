import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import React from 'react'

const App = () => {
  return ( 
   <>
   <Header/>
   <main className="py-3">
      <Container> 
        <h1>Bem vindo ao MetalShop</h1>
      </Container>
   </main>
   <Footer/>
   </>
  )
}

export default App
