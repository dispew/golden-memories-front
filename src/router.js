import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import moment from 'moment';

// lazy-loaded
const Profile = () => import("./components/Profile.vue")
const Gallery = () => import("./components/Gallery.vue")
const Mananger = () => import("./components/Manager.vue")
const Users = () => import("./components/Users.vue")
const Upload = () => import("./components/Upload.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/gallery",
    name: "gallery",
    // lazy-loaded
    component: Gallery,
  },
  {
    path: "/manager",
    name: "manager",
    // lazy-loaded
    component: Mananger,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
  {
    path: "/users",
    name: "users",
    // lazy-loaded
    component: Users,
  },
  {
    path: "/upload",
    name: "upload",
    // lazy-loaded
    component: Upload,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('authData');
    // trying to access a restricted page + not logged in
    // redirect to login page

    // console.log(loggedIn['expires'], moment(loggedIn.expires), moment(), moment(loggedIn.expires) < moment());
    // if (loggedIn){
    //   let expires = JSON.parse(loggedIn).expires;
    //   if(moment(expires) < moment()) {
    //     next('/logout');
    //   }
    // }

    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });

export default router;


