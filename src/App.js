import './App.css';
import Products from './product';
import Create from './Create';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

          <Routes>

              <Route path='/' element={<Products/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/create' element={<Create/>}/>

          </Routes>

      </BrowserRouter>

      {/* <Create/> */}
      {/* <Products/> */}
    </div>
  );
}

export default App;
