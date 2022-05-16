import axios from 'axios';
import authHeader from './auth-header';
const AUTH_API_URL = 'http://localhost:5000/api/auth/';
const USER_API_URL = 'http://localhost:5000/api/users/';

class AuthService {
  login(userData) {
    return axios
      .post(AUTH_API_URL + 'signin', {
        username: userData.username,
        password: userData.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('authData', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('authData');
  }

  register(userData) {
    return axios.post(USER_API_URL + 'register', userData, { headers: { "Content-Type": "multipart/form-data" } });
  }
}

export default new AuthService();
