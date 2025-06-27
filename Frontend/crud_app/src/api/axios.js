import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api', // Update to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});
