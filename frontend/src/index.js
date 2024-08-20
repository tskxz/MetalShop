import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import {Provider} from 'react-redux'
import store from './store.js'

//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProdutoScreen from './screens/ProdutoScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PagamentoScreen from './screens/PagamentoScreen';
import EncomendarScreen from './screens/EncomendarScreen';
import EncomendaScreen from './screens/EncomendaScreen';
import PerfilScreen from './screens/PerfilScreen';
import AdminRoute from './components/AdminRoute';
import ListaEncomendaScreen from './screens/admin/ListaEncomendaScreen'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index={true} path="/" element={<HomeScreen/>} /> 
      <Route path="/produto/:id" element={<ProdutoScreen/>} /> 
      <Route path="/carrinho" element={<CarrinhoScreen/>} /> 
      <Route path="/login" element={<LoginScreen/>} /> 
      <Route path="/register" element={<RegisterScreen/>} /> 
      
      <Route path="" element={<PrivateRoute/>}>
        <Route path="/compra" element={<ShippingScreen/>} /> 
        <Route path="/pagamento" element={<PagamentoScreen/>} /> 
        <Route path="/encomendar" element={<EncomendarScreen/>} /> 
        <Route path="/encomenda/:id" element={<EncomendaScreen/>} /> 
        <Route path="/perfil" element={<PerfilScreen/>} /> 
      </Route>

      <Route path="" element={<AdminRoute/>}>
        <Route path="/admin/listaencomenda" element={<ListaEncomendaScreen/>} /> 
      </Route>

    </Route>

     
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
