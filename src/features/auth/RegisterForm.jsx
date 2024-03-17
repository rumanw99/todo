import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@material-ui/core';
import { register } from './authSlice';
import { useStyles } from '../../theme/useStyles';

const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(register(values));
        // Redirect to the login interface after successful registration
        navigate('/login');
      } catch (err) {
        setError(true);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.root}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        {...formik.getFieldProps('email')}
        error={error || (formik.touched.email && formik.errors.email)}
        helperText={(error || formik.touched.email) && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        {...formik.getFieldProps('password')}
        error={error || (formik.touched.password && formik.errors.password)}
        helperText={(error || formik.touched.password) && formik.errors.password}
      />
      {error && <Typography color="error">Registration failed</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </form>
  );
};

export default RegisterForm;
