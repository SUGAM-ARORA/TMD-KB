import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // Handle input changes and update state
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = JSON.stringify({ email, password });

      // Send request to backend for login
      const res = await axios.post('/api/auth/login', body, config);
      
      console.log('User logged in successfully:', res.data);

      // Store the token in localStorage (for maintaining the session)
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Error in login:', err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
        Login
      </button>
    </form>
  );
};

// Removed redundant onSubmit function
// const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const body = { email, password };
//       const res = await axios.post('/api/auth/login', body, { headers: { 'Content-Type': 'application/json' } });
      
//       // Store JWT in localStorage after successful login
//       localStorage.setItem('token', res.data.token);
      
//       console.log('User logged in successfully');
//     } catch (err) {
//       console.error('Login failed:', err.response.data);
//     }
//   };  

export default Login;
