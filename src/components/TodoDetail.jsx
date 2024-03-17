// src/components/TodoDetail.js
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Typography } from '@material-ui/core';
import { selectTodoById, fetchTodos } from '../features/todos/todosSlice';
import { useStyles } from '../theme/useStyles';

const TodoDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const todo = useSelector((state) => selectTodoById(state, id));
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos(id));
    }
  }, [status, dispatch, id]);

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded' && todo) {
    content = (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {todo.title}
        </Typography>
        <Typography variant="body1">{todo.completed ? 'Completed' : 'Not Completed'}</Typography>
      </div>
    );
  } else if (status === 'failed') {
    content = <Typography color="error">Failed to fetch todo</Typography>;
  }

  return <div>{content}</div>;
};

export default TodoDetail;
