import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Search from "./components/Search";
import Phone from "./components/Phone";
function App() {
  return (
    <div className={'container-fluid p-0'}>
      <Header />
      <Routes>
        <Route path={''} index element={<HomePage />}/>
        <Route path={'login'} element={<Login />}/>
        <Route path={'register'} element={<Register />} />
        <Route path={'search'} element={<Search />}/>
        <Route path={'phone/:phoneId'} element={<Phone />}/>
      </Routes>
    </div>
  );
}

export default App;
