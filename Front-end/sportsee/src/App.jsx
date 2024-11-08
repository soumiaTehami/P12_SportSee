import Home from './pages/Home';
import Error from './pages/Error';
import User from './pages/User';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/User/:userid" element={<User />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </BrowserRouter>
    
   
  );
}

export default App;
