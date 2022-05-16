<style>
.form-control:focus {
  box-shadow: none;
}

.form-control-underlined {
  border-width: 0;
  border-bottom-width: 1px;
  border-radius: 0;
  padding-left: 0;
}

.form-control::placeholder {
  font-size: 0.95rem;
  color: #aaa;
  font-style: italic;
}
</style>

<template>
  <div class="container pt-3">
    <header class="jumbotron">
      <h3>
        <strong>Golden Memories</strong> User Control
      </h3>
    </header>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
    <div class="container">
      <div v-for="user in userList" :key="user.id" class="card mt-2 border-5 pt-2 active pb-0 px-3">
        <div class="card-body ">
          <div class="row">
            <div class="col-12 ">
              <h4 class="card-title ">
                <img v-if="user.photo" v-bind:src="user.photo" alt="" class="rounded-circle img-fluid " width="35" height="35">
                <img v-else src="/img/avatar.webp" alt="" class="rounded-circle img-fluid " width="35" height="35">
                <b class="ml-2">{{ user.name }}</b>
              </h4>
            </div>
            <div class="col">
              <h6 class="card-subtitle mb-2 text-muted">
                <div class="card-text text-muted">
                  <div><font-awesome-icon icon="at" class="mr-2"/> {{ user.email }}</div>
                  <div><font-awesome-icon icon="calendar-days" class="mr-2"/> {{ moment(user.created).format('YYYY-MM-DD HH:mm') }}</div>
                  <div v-if="user.active" class="text-success"><font-awesome-icon icon="lock" class="mr-2"/> Allowed</div>
                  <div v-else class="text-danger"><font-awesome-icon icon="lock" class="mr-2"/> Blocked</div>
                  <div v-if="isUserAdmin(user)" class="text-info"><font-awesome-icon icon="id-badge" class="mr-2"/> Administrative privileges</div>
                  <div v-else><font-awesome-icon icon="id-badge" class="mr-2"/> Normal user</div>
                </div>
              </h6>
            </div>
          </div>
        </div>
        <div class="card-footer bg-white px-0 ">
          <div class="row">
            <div class=" col-md-auto ">
              <a v-if="user.active" href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-danger" @click="allowUser(user.id, !user.active)">
                <font-awesome-icon icon="ban" class="mr-1"/> 
                <small>BLOCK</small>
              </a>
              <a v-else href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-success" @click="allowUser(user.id, !user.active)">
                <font-awesome-icon icon="thumbs-up" class="mr-1"/> 
                <small>ALLOW</small>
              </a>
              <i class="mdi mdi-settings-outline"></i>
              <a v-if="isUserAdmin(user)" href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-warning" @click="promoteUser(user.id, !isUserAdmin(user))">
                <font-awesome-icon icon="arrow-down" class="mr-1"/> 
                <small>REVOKE</small>
              </a>
              <a v-else href="#" class="btn btn-outlined btn-black text-muted bg-transparent text-primary" @click="promoteUser(user.id, !isUserAdmin(user))">
                <font-awesome-icon icon="arrow-up" class="mr-1"/> 
                <small>PROMOTE</small>
              </a>
              <span class="vl ml-3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";
import moment from 'moment';

export default {
  name: 'Users',
  data() {
    return {
      userList: [],
      successful: false,
      message: "",
    };
  },
  computed: {
    currentAuthData() {
      return this.$store.state.auth.authData;
    }
  },
  methods: {
    isUserAdmin(user) {
      if (user && user.roles) {
        return user.roles.find(x => x.name === 'admin') !== undefined
      }
      return false;
    },
    allowUser(user_id, state) {
      console.log(state);
      UserService.allowUser(user_id, state).then(
        (response) => {
          this.message = response.data.message;
          this.successful = true;
          this.updateUserList();
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
    promoteUser(user_id, state) {
      console.log(state);
      UserService.promoteUser(user_id, state).then(
        (response) => {
          this.message = response.data.message;
          this.successful = true;
          this.updateUserList();
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
    updateUserList() {
      UserService.getUserList().then(
        (response) => {
          this.userList = response.data;
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
    moment,
  },

  mounted() {
    if (!this.currentAuthData) {
      this.$router.push('/login');
    }
    
    this.updateUserList();
  },
};

</script>
