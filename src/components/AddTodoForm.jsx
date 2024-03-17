// src/components/AddTodoForm.js

import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { addTodo } from '../features/todos/todosSlice';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const navgite = useNavigate();
  const [title, setTitle] = useState('');

  const handleAddTodo = () => {
    if (title.trim() !== '') {
      dispatch(addTodo({ title }));
      navgite('/todo');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add Todo
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button onClick={handleAddTodo} variant="contained" color="primary">
        Add
      </Button>
    </div>
  );
};

export default AddTodoForm;
