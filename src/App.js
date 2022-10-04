import './App.css';
import SignIn from './pages/SignIn/SignIn';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Protected from './components/Protection/Protection';
function App() {
  return (
    <>
    <Navbar/>
      <Routes>

        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Protected Component={Home }/>} />
      </Routes>
    </>
  );
}

export default App;
