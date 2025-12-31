import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, clearError } from '../slices/authSlice';
import type { RootState, AppDispatch } from '../../../store/store';
import { TextField, Button, Alert, CircularProgress } from '@mui/material';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(login(formData));
    if (login.fulfilled.match(resultAction)) {
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Secure Login</h2>

      {error && <Alert severity="error">Login failed</Alert>}

      <TextField
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={20} /> : 'Login'}
      </Button>
    </form>
  );
};

export default LoginForm;
