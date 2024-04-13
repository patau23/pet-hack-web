import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import AuthPage from './modules/AuthPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardPage from './modules/DashboardPage';
import { useAppDispatch } from './app/hooks';
import { setUser } from './features/authSlice';
import { ConfigProvider } from 'antd';
import NotFound from './components/NotFound';


function App() {
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dispatch(setUser(user));
  }, [])

  return (
    <div className="App">
      <ConfigProvider prefixCls='pet-hack' theme={{ token: { colorPrimary: '#000000' } }}>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } />
          <Route path='/not-found' element={<NotFound></NotFound>} />
          <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;