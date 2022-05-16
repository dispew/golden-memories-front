<style>
body {
    background-color: #f9f9fa
}

.padding {
    padding: 0.5rem !important
}

.user-card-full {
    overflow: hidden;
}

.card {
    border-radius: 5px;
    -webkit-box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
    box-shadow: 0 1px 20px 0 rgba(69,90,100,0.08);
    border: none;
    margin-bottom: 30px;
}

.user-card-full .user-profile {
    border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
        background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
    background: linear-gradient(to right, #ee5a6f, #f29263);
}

.user-profile {
    padding: 20px 0;
}

.card-block {
    padding: 1.25rem;
}

.img-radius {
    border-radius: 5px;
}


 
h6 {
    font-size: 14px;
}

.card .card-block p {
    line-height: 25px;
}

@media only screen and (min-width: 1400px){
  p {
      font-size: 14px;
  }
}

.card-block {
    padding: 1.25rem;
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}

.card .card-block p {
    line-height: 25px;
}

.text-muted {
    color: #919aa3 !important;
}

.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
    font-weight: 600;
}

.user-card-full .social-link li {
    display: inline-block;
}

.user-card-full .social-link li a {
    font-size: 20px;
    margin: 0 10px 0 0;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

</style>

<template>
  <div class="container pt-3">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentAuthData.user.name }}</strong> Profile
      </h3>
    </header>
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <div class="row container d-flex justify-content-center">
          <div class="col-xl-9 col-lg-10 col-md-12">
            <div class="card user-card-full">
              <div class="row ml-0 mr-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="mb-5">
                      <img v-if="currentAuthData.user.photo" v-bind:src="currentAuthData.user.photo" class="img-radius" alt="User-Profile-Image"
                       width="100" height="100">
                      <img v-else src="/img/avatar.webp" class="img-radius" alt="User-Profile-Image"
                        width="100" height="100">
                    </div>
                    <h6 class="f-w-600">{{ currentAuthData.user.name }}</h6>
                    <p>
                      <ul class="list-group list-group-flush">
                        <li v-for="role in currentAuthData.user.roles" :key="role" class="badge badge-light mt-1">
                          <font-awesome-icon icon="id-badge" /> {{ role }}
                        </li>
                      </ul>
                    </p>
                    <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="mb-2 pb-5 b-b-default f-w-600">Information</h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="mb-1 f-w-600">Email</p>
                        <h6 class="text-muted f-w-400">
                          <font-awesome-icon icon="at" /> {{ currentAuthData.user.email }}
                          </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-1 f-w-600">Since</p>
                        <h6 class="text-muted f-w-400">
                          <font-awesome-icon icon="calendar-days" /> {{ moment(currentAuthData.user.created).format('YYYY-MM-DD HH:mm') }}
                          </h6>
                      </div>
                    </div>
                    <h6 class="mb-2 mt-4 pb-1 b-b-default f-w-600">Projects</h6>
                    <div class="row">
                      <div class="col-sm-6">
                        <p class="mb-1 f-w-600">Photos posted</p>
                        <h6 class="text-muted f-w-400">
                          <font-awesome-icon icon="image" /> {{ currentAuthData.user.post_count }}
                        </h6>
                      </div>
                      <div class="col-sm-6">
                        <p class="mb-1 f-w-600">Likes received</p>
                        <h6 class="text-muted f-w-400">
                          <font-awesome-icon icon="heart" /> {{ currentAuthData.user.like_count }}
                        </h6>
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
</template>

<script>
import moment from 'moment';
export default {
  name: 'Profile',
  computed: {
    currentAuthData() {
      return this.$store.state.auth.authData;
    }
  },
  methods: {
    moment,
  },
  mounted() {
    if (!this.currentAuthData) {
      this.$router.push('/login');
    }
  },
};
</script>
