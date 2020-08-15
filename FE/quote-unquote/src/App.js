import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import HomePage from './components/home_page';
import NewsPage from './components/show_news';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       quote-unquote
      </header>
      <a href='/' display="block">HOME </a>
      <Router>
        <switch> 
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/hindu" component={NewsPage}></Route>
          <Route exact path="/washpost" component={NewsPage}></Route>
        </switch>
      </Router>
    </div>
  );
}

export default App;
