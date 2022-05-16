<style>
.main {
  min-width: 100vw !important;
  padding: 0 !important;
}

.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('/img/login-bg.webp');
  background-size: cover;
  background-position: center center;
}

.bg-login {
  background-color: #EAF8BF;
}

.shine-text {
  color: #ECA400;
  padding: 10px;
  font-family: 'Rouge Script', cursive;
  letter-spacing: 5px;
  font-size: 90px;
  font-weight: bold;
}

.btn-login {
  color: #fff !important;
  background-color: #006992 !important;
}

.btn-login:hover {
  background-color: #0092CC !important;
}

</style>
<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <div class="col-md-6 bg-login">
        <div class="login d-flex align-items-center py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="shine-text">Golden Memories</h3>
                <p class="text-muted mb-4">Sign in to view our weeding photos.</p>
                <Form @submit="handleLogin" :validation-schema="schema">

                  <div v-if="message" class="form-group">
                    <div class="alert alert-danger" role="alert">
                      {{ message }}
                    </div>
                  </div>

                  <div class="form-group mb-3">
                    <Field id="inputEmail" name="username" type="email" placeholder="Email address" required=""
                        autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                  </div>
                  <ErrorMessage name="username" class="error-feedback small text-danger" />

                  <div class="form-group mb-3">
                    <Field id="inputPassword" name="password" type="password" placeholder="Password" required=""
                        class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                  </div>
                  <ErrorMessage name="password" class="error-feedback small text-danger" />

                  <div class="custom-control custom-checkbox mb-3">
                    <input id="customCheck1" type="checkbox" checked class="custom-control-input">
                    <label for="customCheck1" class="custom-control-label">Remember password</label>
                  </div>
                  <button type="submit"
                      class="btn btn-login btn-block text-uppercase mb-2 rounded-pill shadow-sm" :disabled="loading">
                    <span v-show="loading" class="spinner-border spinner-border-sm" ></span> Sign in
                  </button>
               </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="offset-md-3 col-md-6">
    <div class="card card-container">
      <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card img-fluid" />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Username</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm" ></span>
            <span>Login</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div> -->
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/gallery");
    }
  },
  methods: {
    handleLogin(userData) {
      this.loading = true;
      this.$store.dispatch("auth/login", userData).then(
        () => {
          this.$router.push("/gallery");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>