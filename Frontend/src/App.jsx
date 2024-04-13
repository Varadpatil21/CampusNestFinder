import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search';
import { Book } from './pages/Book/Book';
import { SignUp } from './components/SignUp/SignUp';
import { Login } from './components/Login/Login';
import { Reset } from './components/Reset/Reset';
import { Navbar } from './components/Navbar';
import { AddRoom } from './pages/AddRoom/AddRoom';

function App() {
  return (
    <AuthProvider> {/* Wrap your entire application with the AuthProvider */}
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/book-room' element={<Book />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/add-room' element={<AddRoom />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot' element={<Reset />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
