import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@material-ui/core';
import { login } from './authSlice';
import { useStyles } from '../../theme/useStyles';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Dispatch login action
        await dispatch(login(values));
        
        // Store username and password in local storage
        localStorage.setItem('username', values.email);
        localStorage.setItem('password', values.password);
        
        // Navigate to Todo page
        navigate('/todo');
      } catch (err) {
        setError('Invalid email or password');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        autoComplete="username" // Added autocomplete attribute
        {...formik.getFieldProps('email')}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        autoComplete="current-password" // Added autocomplete attribute
        {...formik.getFieldProps('password')}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Typography variant="body2">
        Dont have an account? <Link to="/register">Register</Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
