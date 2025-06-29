import LoginPage from './Pages/loginPage'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import AdminUsersPage from './Pages/adminUsersPage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path='admin' element={<AdminUsersPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
