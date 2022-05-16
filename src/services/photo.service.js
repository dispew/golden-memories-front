import axios from 'axios';
import HeaderBuilder from './auth-header';
const PHOTOS_API_URL = 'http://localhost:5000/api/photos/';

class PhotoService {

  getViewablePhotoList() {
    return axios.get(PHOTOS_API_URL + 'list', { headers: HeaderBuilder.getAuthHeader() });
  }

  getPendingPhotoList() {
    return axios.get(PHOTOS_API_URL + 'pending', { headers: HeaderBuilder.getAuthHeader() });
  }

  getPhoto(photo_id) {
    return axios.get(PHOTOS_API_URL + 'get/' + photo_id, { headers: HeaderBuilder.getAuthHeader() });
  }

  addComment(photo_id, comment) {
    return axios.post(PHOTOS_API_URL + 'comment/' + photo_id, { message: comment }, { headers: HeaderBuilder.getAuthHeader() });
  }

  addLike(photo_id) {
    return axios.post(PHOTOS_API_URL + 'like/' + photo_id, {}, { headers: HeaderBuilder.getAuthHeader() });
  }

  approvePhoto(photo_id, approve, ban) {
    return axios.post(PHOTOS_API_URL + 'approve/' + photo_id, { approve: approve, ban: ban }, { headers: HeaderBuilder.getAuthHeader() });
  }

  uploadPhoto(photoData) {
    return axios.post(PHOTOS_API_URL + 'create', photoData, { headers: HeaderBuilder.getUploadHeader() });
  }
}

export default new PhotoService();
