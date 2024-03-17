// src/components/EditTodoForm.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { selectTodoById, updateTodo } from '../features/todos/todosSlice';

const EditTodoForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const todo = useSelector((state) => selectTodoById(state, id));
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title || '');
    }
  }, [todo]);

  const handleUpdateTodo = () => {
    if (title.trim() !== '') {
      dispatch(updateTodo({ id: todo.id, changes: { title } }));
      navigate(`/todo/${todo.id}`);
    } else {
      setError(true); // Set error to true if title is empty
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Edit Todo
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError(false); // Reset error state when input changes
        }}
        variant="outlined"
        margin="normal"
        error={error} // Pass error state directly to the error prop
        helperText={error ? 'Title is required' : ''}
      />
      <Button onClick={handleUpdateTodo} variant="contained" color="primary">
        Update
      </Button>
    </div>
  );
};

export default EditTodoForm;
