import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import FirestoreDemo from './components/FirestoreDemo';
import { useUserRole } from './hooks/useUserRole';

function App() {
  const [apiMessage, setApiMessage] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:3001/')
      .then((res) => res.text())
      .then((data) => setApiMessage(data))
      .catch((err) => setApiMessage('Error connecting to backend'));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Backend says: <strong>{apiMessage}</strong>
          </p>
          <nav>
            <Link to="/login">Go to Login</Link>
          </nav>
          <FirestoreDemo />
          <UserRoleDemo />
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Add more routes here for your app */}
          </Routes>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Router>
  );
}

function UserRoleDemo() {
  const { role, loading } = useUserRole();
  if (loading) return <div>Loading user role...</div>;
  if (!role) return <div>No role found or not logged in.</div>;
  return <div>Your role is: <strong>{role}</strong></div>;
}

export default App;
