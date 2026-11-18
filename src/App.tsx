import Layout from './layout/Layout';
import { MouseProvider } from './context/MouseContext';

function App() {
  return (
    <MouseProvider>
      <Layout />
    </MouseProvider>
  )
}

export default App
