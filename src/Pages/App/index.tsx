import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './App.routes'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

function App() {
  AOS.init();
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App
