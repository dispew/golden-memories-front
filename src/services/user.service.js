import axios from 'axios';
import HeaderBuilder from './auth-header';
const USERS_API_URL = 'http://localhost:5000/api/users/';

class UserService {

  getPublicContent() {
    return axios.get(USERS_API_URL + 'list', { headers: HeaderBuilder.getAuthHeader() });
  }

  getUserList() {
    return axios.get(USERS_API_URL + 'list', { headers: HeaderBuilder.getAuthHeader() });
  }

  allowUser(user_id, state) {
    return axios.post(USERS_API_URL + 'allow/' + user_id, {active: state}, { headers: HeaderBuilder.getAuthHeader() });
  }

  promoteUser(user_id, state) {
    return axios.post(USERS_API_URL + 'promote/' + user_id, {active: state}, { headers: HeaderBuilder.getAuthHeader() });
  }
}

export default new UserService();
