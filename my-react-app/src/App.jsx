import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './Auth'
import Reg from './Reg'
import Reviews from './Reviews'
import Home from './Home'


function App() {
  const [flag, setFlag] = useState(() => {
    const flagValue = localStorage.getItem('flag')
    return flagValue ? flagValue === 'true' : false
  })
  useEffect(() => {
    localStorage.setItem('flag', flag.toString())
  }, [flag])
  
  const toggleActive = () => {
    setFlag(prev => !prev)
  }
  
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/auth' element={<Auth toggleActive={toggleActive} flag={flag} />}/>
          <Route path='/reg' element={<Reg />}/>
          <Route path='/reviews' element={<Reviews flag={flag} />}/>
        </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
