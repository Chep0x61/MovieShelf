import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PageNotFound from "./pages/pageNotFound";
import Home from "./pages/Home";
import Detailed from "./pages/Detailed";
import Add from "./pages/Add";
import Edit from "./pages/Edit";

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <div>
          < Link to='/' className='brand-logo center'>Movie Shelter</Link>  
          </div>
        </nav>
        <Routes>
          <Route path='*' element={<PageNotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/contents' element={<Home />} />
          <Route path='/contents/:id' element={<Detailed />} />
          <Route path='/contents/edit/:id' element={<Edit />} />
          <Route path='/contents/add' element={<Add />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;