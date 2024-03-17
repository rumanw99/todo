// src/Routes.js

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import AddTodoForm from './components/AddTodoForm';
import EditTodoForm from './components/EditTodoForm';

const App = () => {
  const isAuthenticated = /* Your authentication logic here */ false; // You should replace this with your actual authentication logic

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/todo" element={<TodoList />} />
      <Route path="/todo/:id" element={<TodoDetail />} />
      <Route path="/todo/new" element={<AddTodoForm />} />
      <Route path="/todo/:id/edit" element={<EditTodoForm />} />
    </Routes>
  );
};

export default App;
