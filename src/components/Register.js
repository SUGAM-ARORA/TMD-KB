import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // Form data state
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Destructure form data for easier access
  const { username, email, password } = formData;

  // Handle input changes and update state
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ username, email, password });

      // Send request to backend for registration
      const res = await axios.post('/api/auth/register', body, config);
      
      console.log('User registered successfully:', res.data);

      // Store the token in localStorage (for maintaining the session)
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Error in registration:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        value={username}
        onChange={onChange}
        placeholder="Username"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">
        Register
      </button>
    </form>
  );
};

export default Register;
