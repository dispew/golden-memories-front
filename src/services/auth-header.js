class HeaderBuilder {

  getAuthHeader() {
    let header = {}
    let authData = JSON.parse(localStorage.getItem('authData'));
    
    if (authData && authData.access_token) {
      header["Authorization"] = 'Bearer ' + authData.access_token;
    }

    return header;
  }

  getUploadHeader() {   
    let header = this.getAuthHeader();

    header["Content-Type"] = "multipart/form-data";

    return header;
  }

}

export default new HeaderBuilder(); 
  