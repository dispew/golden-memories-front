<style>
  .main-home {
    background-image: url('/img/home-bg.webp');
    padding: 0;
    min-height: 100vh;
  }

  .jumbotron-home {
    background-color: #FFFFFF33 !important;
    background-image: none;
  }
</style>
<template>
  <div class="container pt-5 main-home">
    <header class="jumbotron jumbotron-home">
      <h3>Golden Memories</h3>
      <h5>Share with us our wedding photos that you have snapped!</h5>
    </header>
  </div>
</template>

<script>
// import UserService from "../services/user.service";
// export default {
//   name: "Home",
//   data() {
//     return {
//       content: "",
//     };
//   },
//   mounted() {
//     UserService.getPublicContent().then(
//       (response) => {
//         this.content = response.data;
//       },
//       (error) => {
//         this.content =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
//       }
//     );
//   },
// };
</script>
