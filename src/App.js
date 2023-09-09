import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { CartProvider } from './components/ContextReducer';
import { ChakraProvider } from "@chakra-ui/react"
import MyOrder from './pages/MyOrder';

function App() {
  return (
    <CartProvider>
      <ChakraProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path='/myorder' element={<MyOrder/>}/>
          </Routes>
        </div>
      </Router>
      </ChakraProvider>
    </CartProvider>
  );
}

export default App;
