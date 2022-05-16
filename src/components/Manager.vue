<style>

.custom-switch-lg .custom-control-label::before {
    left: -2.25rem;
    width: 3rem;
    border-radius: 1.5rem;
}

.custom-switch-lg .custom-control-label::after {
    top: calc(.25rem + 3px);
    left: calc(-2.25rem + 4px);
    width: calc(1.5rem - 6px);
    height: calc(1.5rem - 6px);
    border-radius: 1.5rem;
}

.custom-switch-lg .custom-control-input:checked ~ .custom-control-label::after {
    transform: translateX(1.4rem);
}

.custom-switch-lg .custom-control-label::before {
    height: 1.5rem;
}

.custom-switch-lg .custom-control-label {
    padding-left: 1.5rem;
    line-height: 1.7rem;
}

</style>

<template>
  <div class="container pt-3">
    <header class="jumbotron">
      <h3>
        <strong>Golden Memories</strong> Photo Admission
      </h3>
    </header>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
    <div class="d-flex justify-content-end">
      <div class="custom-control custom-switch custom-switch-lg">
        <input class="custom-control-input" id="approveSwitch" name="show-approved" type="checkbox" 
          checked v-model="approvedOnly">
        <label class="custom-control-label font-italic" for="approveSwitch">Not approved only</label>
      </div>
    </div>
    <div class="container">
      <template v-for="photo in photoList" :key="photo.id" >
        <div v-if="!photo.approved || !approvedOnly" class="card mt-2 border-5 pt-2 active pb-0 px-3">
          <div class="card-body">
            <div class="row">
              <div class="col-12 ">
                <h4 class="card-title ">
                  <b>{{ photo.message }}</b>
                </h4>
              </div>
              <div class="col-2">
                <img data-toggle="modal" data-target="#image-gallery" class="mr-3 " alt="..." width="150" height="150"
                        v-bind:data-id="photo.id"
                        v-bind:src="photo.thumb"
                        @click="onClick(photo.id)">
              </div>
              <div class="col">
                <h6 class="card-subtitle mb-2 text-muted">
                  <div class="card-text text-muted">
                    <div class="mb-1"><font-awesome-icon icon="at" class="mr-1"/> {{ photo.owner.name }}</div>
                    <div class="mb-1"><font-awesome-icon icon="calendar-days" class="mr-1"/> {{ moment(photo.created).format('YYYY-MM-DD HH:mm') }}</div>
                    <div class="mb-1"><font-awesome-icon icon="comment" class="mr-1"/> {{ photo.comment_count }}</div>
                    <div class="mb-1"><font-awesome-icon icon="heart" class="mr-1"/> {{ photo.like_count }}</div>
                    <div v-if="photo.approved" class="text-success mb-1"><font-awesome-icon icon="lock" class="mr-1"/> Approved</div>
                    <div v-else class="text-warning mb-1"><font-awesome-icon icon="lock" class="mr-1"/> Not approved</div>
                    <div v-if="photo.banned" class="text-danger mb-1"><font-awesome-icon icon="id-badge" class="mr-1"/> Banned</div>
                    <div v-else></div>
                  </div>
                </h6>
              </div>
            </div>
          </div>
          <div class="card-footer bg-white px-0 ">
            <div class="row">
              <div class=" col-md-auto ">
                <a v-if="photo.approved" href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-danger"
                @click="reviewPhoto(photo.id, !photo.approved, photo.banned)">
                  <font-awesome-icon icon="xmark" class="mr-1"/> 
                  <small>REVOKE</small>
                </a>
                <a v-else href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-success" 
                @click="reviewPhoto(photo.id, !photo.approved, photo.banned)">
                  <font-awesome-icon icon="check" class="mr-1"/> 
                  <small>APPROVE</small>
                </a>
                <i class="mdi mdi-settings-outline"></i>
                <a v-if="!photo.banned" href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-warning" 
                  @click="reviewPhoto(photo.id, photo.approved, !photo.banned)">
                  <font-awesome-icon icon="ban" class="mr-1"/> 
                  <small>BAN</small>
                </a>
                <a v-else href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-primary" 
                  @click="reviewPhoto(photo.id, photo.approved, !photo.banned)">
                  <font-awesome-icon icon="thumbs-up" class="mr-1"/> 
                  <small>UNBAN</small>
                </a>
                <span class="vl ml-3"></span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="modal fade bg-light" id="image-gallery" tabindex="-1" role="dialog" aria-labelledby="photoModal" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">×</span><span class="sr-only">Close</span>
            </button>
          </div>
          <div class="modal-body">
            <img id="image-gallery-image" class="img-responsive img-fluid col-md-12" v-if="currentPhoto !== null" v-bind:src="currentPhoto.photo">
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoService from "../services/photo.service";
import moment from 'moment';

export default {
  name: 'Manager',
  data() {
    return {
      currentPhoto: null,
      photoList: [],
      successful: false,
      message: "",
      approvedOnly: false,
    };
  },
  computed: {
    currentAuthData() {
      return this.$store.state.auth.authData;
    }
  },
  methods: {
    onClick(photo_id) {
      this.getPhoto(photo_id);
    },
    updateModal(photo) {
      if(photo !== null && photo !== undefined) {
        this.currentPhoto = photo;
      }
    },
    reviewPhoto(photo_id, state) {
      PhotoService.approvePhoto(photo_id, state).then(
        (response) => {
          this.message = response.data.message;
          this.successful = true;
          this.updatePhotoList();
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    getPhoto(photo_id) {
      PhotoService.getPhoto(photo_id).then(
        (response) => {
          this.updateModal(response.data);
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      );
    },
    updatePhotoList() {
      PhotoService.getPendingPhotoList().then(
        (response) => {
          this.photoList = response.data;
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
  },
};

</script>
