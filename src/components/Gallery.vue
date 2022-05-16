<style>
.btn:focus, .btn:active, button:focus, button:active {
  outline: none !important;
  box-shadow: none !important;
}

#image-gallery .modal-footer{
  display: block;
}

.thumb{
  margin-top: 15px;
  margin-bottom: 15px;
}

.like > svg{
  color: #FF0000;
}

.like {
  background-color: #FFEEEE;
  border: solid 1px #dddddd;
  border-radius: 12px;
}

.like:hover {
  background-color: #FFBBBB;
}

.avatar-shadow {
  -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15) !important;
  box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18),0 4px 15px 0 rgba(0,0,0,0.15) !important;
}

.blue-text {
  color: #2196f3 !important;
}

.card{
  box-shadow: 4px 4px 20px rgba(0,0,0,0.3);
}

img[lazy=loading] {
  margin: auto;
  border: 20px solid #EAF0F6;
  border-radius: 50%;
  border-top: 20px solid #cccccc;
  width: 200px;
  height: 200px;
  animation: spinner 4s linear infinite;
  position: relative;
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* img[lazy=error] {
  
}

img[lazy=loaded] {

} */

</style>

<template>
  <div class="container pt-3">
    <header class="jumbotron">
      <h3>
        <strong>Golden Memories</strong> Album
      </h3>
    </header>
    <section class="">
      <section class="">
        <!-- <div class="row"> -->
        <div v-masonry transition-duration="0.3s" item-selector=".item">
          <!-- <div v-for="photo in photoList" class="col-lg-3 col-md-4 col-xs-6 thumb" :key="photo.id"> -->
          <div v-masonry-tile v-for="photo in photoList" class="item thumb p-2" style="width: 33.3%" :key="photo.id">
            <div class="card">
              <a class="thumbnail" href="#" data-toggle="modal" data-target="#image-gallery" @click="onClick(photo.id)">
                <img class="card-img-top"
                      v-bind:data-id="photo.id"
                      v-bind:src="photo.thumb"
                      alt="Another alt text">
              </a>
              <div class="card-body">
                <span class="float-left">{{ photo.owner.name }}</span>
                <span class="float-right mx-1 text-primary"><font-awesome-icon icon="comment" class="mr-1"/>{{ photo.comment_count }}</span>
                <span class="float-right mx-1 text-danger"><font-awesome-icon icon="heart" class="mr-1"/>{{ photo.like_count }}</span>
              </div>
            </div>
          </div>
        </div>

      </section>
      <section class="">
        <div class="modal fade bg-light" id="image-gallery" tabindex="-1" role="dialog" aria-labelledby="photoModal" aria-hidden="true">
          <div class="modal-dialog" style="max-width: 80vw">
            <div class="modal-content">
              <div class="modal-header">
                <div class="profile-image">
                  <img v-if="currentPhoto && currentPhoto.owner.photo" class="rounded-circle" v-bind:src="currentPhoto.owner.photo" width="70">
                  <img v-else class="rounded-circle" src="/img/avatar.webp" width="70">
                </div>
                <h4 class="modal-title ml-4 mt-3" v-if="currentPhoto !== null">{{ currentPhoto.owner.name }}</h4>
                  <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <img id="image-gallery-image" class="img-responsive img-fluid col-md-12" v-if="currentPhoto !== null" v-bind:src="currentPhoto.photo">
                  </div>
                  <div class="col-md-6">
                    <div class="container mt-3 mb-3">
                      <div class="d-flex justify-content-center row">
                        <div class="d-flex flex-column col-md-12">
                          <div class="d-flex flex-row align-items-center text-left comment-top p-2 bg-white border-bottom px-4">
                            <div class="d-flex flex-column ml-3 w-100">
                              <div class="d-flex flex-row post-title">
                                <h5 v-if="currentPhoto !== null">{{ currentPhoto.message }}</h5>
                              </div>
                              <div class="d-flex flex-row justify-content-between post-title">
                                <button type="button" class="btn btn-light like" @click="likePhoto" 
                                data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">
                                  <font-awesome-icon icon="heart"/><span class="ml-2" v-if="currentPhoto !== null">{{ currentPhoto.likes.length }}</span>
                                </button>
                                <span class="">
                                  <small id="image-gallery-time" v-if="currentPhoto !== null">
                                    <font-awesome-icon icon="calendar-days"/> {{ moment(currentPhoto.created).fromNow() }}
                                  </small>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="coment-bottom bg-white p-2 px-4">
                            <div class="d-flex flex-row add-comment-section mt-4 mb-4">
                              <img v-if="currentAuthData.user.photo" class="img-fluid img-responsive rounded-circle mr-2" 
                                v-bind:src="currentAuthData.user.photo" width="38">
                              <img v-else class="img-fluid img-responsive rounded-circle mr-2" src="/img/avatar.webp" width="38">
                                <input id="comment-input" type="text" class="form-control mr-3" placeholder="Add comment">
                                <button class="btn btn-primary" type="button" @click="sendComment">Comment</button>
                              </div>

                              <div v-if="currentPhoto !== null">
                                <div class="card p-3 mb-3" v-for="comment in currentPhoto.comments" :key="comment.owner.id">
                                  <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center">
                                      <img v-if="comment.owner.photo" v-bind:src="comment.owner.photo" width="30" class="user-img rounded-circle mr-2">
                                      <img v-else src="/img/avatar.webp" width="30" class="user-img rounded-circle mr-2">
                                      <span><small class="font-weight-bold text-primary">{{ comment.owner.name }}</small></span>
                                    </div>
                                    <small>{{ moment(comment.created).fromNow() }}</small>
                                  </div>
                                  <div class="action d-flex justify-content-between mt-2 align-items-center">
                                    <div class="reply px-4">
                                        <small class="font-weight-bold">{{ comment.message }}</small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                </div>
              </div>
            </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import PhotoService from "../services/photo.service";
import $ from "jquery";
import moment from 'moment';

export default {
  name: 'Gallery',
  data() {
    return {
      currentPhoto: null,
      photoList: [],
    };
  },
  computed: {
    currentAuthData() {
      return this.$store.state.auth.authData;
    }
  },
  methods: {
    getNextUser() {
      // window.onscroll = () => {
      //   let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      //   if (bottomOfWindow) {
      //     axios.get(`https://randomuser.me/api/`).then(response => {
      //       this.users.push(response.data.results[0]);
      //     });
      //   }
      // }
    },
    onClick(photo_id) {
      this.getPhoto(photo_id);
    },
    updateModal(photo) {
      if(photo !== null && photo !== undefined) {
        this.currentPhoto = photo;
      }
    },
    sendComment(event) {
      if (this.currentPhoto !== null) {
        PhotoService.addComment(this.currentPhoto.id, $('#comment-input').val()).then(
          (response) => {
            this.updatePhotoList();
            this.getPhoto(this.currentPhoto.id);
            $('#comment-input').val('');
          },
          (error) => {
            this.content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    likePhoto(event) {
      if (this.currentPhoto !== null) {
        PhotoService.addLike(this.currentPhoto.id).then(
          (response) => {
            this.updatePhotoList();
            this.getPhoto(this.currentPhoto.id);
          },
          (error) => {
            this.content =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
    getPhoto(photo_id) {
      PhotoService.getPhoto(photo_id).then(
        (response) => {
          this.updateModal(response.data);
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    updatePhotoList() {
      PhotoService.getViewablePhotoList().then(
        (response) => {
          this.photoList = response.data;
          this.$redrawVueMasonry();
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    moment,
  },

  mounted() {
    if (!this.currentAuthData) {
      this.$router.push('/login');
    }
    
    this.updatePhotoList();

    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  },
};

</script>
