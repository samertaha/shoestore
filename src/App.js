import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './copmponents/Header';
import Home from './pages/Home';
import Contact from './pages/contact';
import Products from './pages/products';
import Product from './pages/product';

function App() {
  return (
    <div className='container'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
        <Route exact path='/products'>
          <Products />
        </Route>
        <Route path='/product/:id' component={Product} />` */}
      </Switch>
    </div>
  );
}

export default App;
