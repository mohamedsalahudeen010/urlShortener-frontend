
import './App.css';
import { Route, Switch } from 'react-router-dom';
import SignUpPage from './components/signUp';
import MainPage from './components/main';
import ForgetPage from './components/forgetPassword';
import UrlShortenerPage from './components/UrlShortenerPage';

function App() {
  
  return (
    <div className="App">
     
    <Switch>
      <Route exact path="/">
    <MainPage></MainPage>
      </Route>
      <Route path="/signup">
       <SignUpPage></SignUpPage>

      </Route>

      <Route path="/forgetPassword">
      
<ForgetPage></ForgetPage>
      </Route>

    <Route path="/urlShortener">
      <UrlShortenerPage></UrlShortenerPage>
    </Route>


    </Switch>
    
    </div>
  );
}

export default App;
