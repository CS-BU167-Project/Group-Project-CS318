import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from './api';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await authAPI.register(email, password);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="form-section">
        <img src="/header.png" alt="Logo" className="logo" />
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Enter your email" className="input-field" required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <div className="input-container">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="Enter your password" className="input-field" required />
              <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <div className="input-container">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" className="input-field" required />
              <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <button onClick={() => navigate('/')} className="back-button">Back</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
      <div className="image-section">
        <img src="/placeholder.jpg" alt="Register Illustration" />
      </div>
    </div>
  );
}

export default Register;