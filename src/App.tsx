import {Fragment} from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import { MouseProvider } from './context/MouseContext';

function App() {
  return (
    <MouseProvider>
      <Fragment>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Route>
        </Routes>
      </Fragment>
    </MouseProvider>
  )
}

export default App
