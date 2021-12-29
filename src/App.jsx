import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import './app.css';
import Product from './components/Product/Product';
import MyUmami from './components/MyUmami/MyUmami';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="main">
          <Switch>
            <Route exact path="/">
              <Search />
            </Route>
            <Route exact path="/product/:id">
              <Product />
            </Route>
            <Route path="/my-umami">
              <MyUmami />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
