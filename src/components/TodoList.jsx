import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { fetchTodos, selectAllTodos, deleteTodo, toggleTodo } from '../features/todos/todosSlice';
import { logout } from '../features/auth/authSlice';
import { selectUser } from '../features/auth/authSlice';
import { useStyles } from '../theme/useStyles';
import ReactPaginate from 'react-paginate';

const TodoList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const status = useSelector((state) => state.todos.status);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [pageNumber, setPageNumber] = useState(0);
  const user = useSelector(selectUser);

  const todosPerPage = 10;
  const pagesVisited = pageNumber * todosPerPage;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  let filteredTodos = todos;
  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (filter === 'pending') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  const displayTodos = filteredTodos.slice(pagesVisited, pagesVisited + todosPerPage).map((todo) => (
    <ListItem key={todo.id} className={classes.listItem}>
      <ListItemText primary={todo.title} />
      <div className={classes.actionButtons}>
        <Button onClick={() => handleToggle(todo.id)} variant="outlined" color={todo.completed ? 'default' : 'primary'}>
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>
        {user && (
          <>
            <Button component={Link} to={`/todo/${todo.id}/edit`} variant="outlined" color="secondary">
              Edit
            </Button>
            <Button onClick={() => handleDelete(todo.id)} variant="outlined" color="secondary">
              Delete
            </Button>
          </>
        )}
      </div>
    </ListItem>
  ));

  const pageCount = Math.ceil(filteredTodos.length / todosPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded') {
    content = (
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <div className={classes.header}>
          <Button component={Link} to="/todo/new" variant="contained" color="primary" className={classes.addButton}>
            Add Todo
          </Button>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        </div>
        <div className={classes.filterButtons}>
          <Button onClick={() => setFilter('all')} color={filter === 'all' ? 'primary' : 'default'}>All</Button>
          <Button onClick={() => setFilter('completed')} color={filter === 'completed' ? 'primary' : 'default'}>Completed</Button>
          <Button onClick={() => setFilter('pending')} color={filter === 'pending' ? 'primary' : 'default'}>Pending</Button>
        </div>
        <List>
          {displayTodos}
        </List>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={classes.pagination}
          activeClassName={classes.active}
          previousClassName={classes.paginationButton}
          nextClassName={classes.paginationButton}
          disabledClassName={classes.disabledPaginationButton}
          pageClassName={classes.paginationButton}
          breakClassName={classes.breakPagination}
        />
      </div>
    );
  } else if (status === 'failed') {
    content = <Typography color="error">Failed to fetch todos</Typography>;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default TodoList;
