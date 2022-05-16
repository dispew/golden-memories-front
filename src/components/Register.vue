<style>
#upload {
    opacity: 0;
}

#upload-label {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
}

.image-area {
    border: 2px dashed #2196f3;
    padding: 1rem;
    position: relative;
}

.image-area::before {
    color: #2196f3;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    z-index: 1;
}

.image-area img {
    z-index: 2;
    position: relative;
}

.golden-button {
  border-radius: 24px;
}

input:focus {
  box-shadow: none !important;
}
</style>

<template>
  <div class="container pt-3">
    <header class="jumbotron">
      <h3>
        <strong>Golden Memories</strong> User Sign up
      </h3>
    </header>
    <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
      {{ message }}
    </div>
    <div class="row py-4">
      <div class="col-lg-8 mx-auto">
        <div v-if="imageData" class="image-area my-4">
          <img id="imageResult" v-bind:src="imageData" alt="" class="img-fluid rounded shadow-sm mx-auto d-block">
        </div>
        <Form @submit="handleRegister" :validation-schema="userSchema">
          <div v-if="!successful">

            <div class="input-group mt-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <Field id="upload" name="image" type="file" @change="renderPhoto" class="form-control border-0" />
                <label id="upload-label" for="upload" class="text-muted">{{ fileName }}</label>
                <div class="input-group-append">
                    <label for="upload" class="btn btn-light m-0 rounded-pill px-4"> 
                      <font-awesome-icon icon="file-arrow-up" class="mr-2 text-muted"/>
                      <span class="text-uppercase font-weight-bold text-muted">Choose an avatar image</span>
                    </label>
                </div>
            </div>
            <b><ErrorMessage name="image" class="error-feedback small text-danger" /></b>

            <div class="input-group mt-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <Field id="name" name="name" type="text" class="form-control border-0" placeholder="Name" />
            </div>
            <b><ErrorMessage name="name" class="error-feedback small text-danger" /></b>

            <div class="input-group mt-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <Field id="username" name="username" type="email" class="form-control border-0" placeholder="E-mail" />
            </div>
            <b><ErrorMessage name="username" class="error-feedback small text-danger" /></b>

            <div class="input-group mt-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                <Field id="password" name="password" type="password" class="form-control border-0" placeholder="Password" />
            </div>
            <b><ErrorMessage name="password" class="error-feedback small text-danger" /></b>

            <div class="form-group">
              <button class="btn btn-primary btl-lg btn-block golden-button mt-3" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const userSchema = yup.object().shape({
      image: yup
        .mixed()
        .required("A file image is required!"),
      name: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      username: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      userSchema,
      imageData: null,
      fileName: "Choose an image"
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/gallery");
    }
  },
  methods: {
    handleRegister(userData) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      const formData = new FormData();
      formData.append("image", userData.image[0]);
      formData.append("name", userData.name);
      formData.append("email", userData.username);
      formData.append("password", userData.password);

      this.$store.dispatch("auth/register", formData).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          setTimeout(() => this.$router.push('/login'), 2000);
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
    renderPhoto(event) {
      if (event.target.files && event.target.files[0]) {
        this.fileName = event.target.files[0].name;
        this.imageData = URL.createObjectURL(event.target.files[0]);
      }
    },
  },
};
</script>
