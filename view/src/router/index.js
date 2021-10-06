import Vue from 'vue'
import Router from 'vue-router'
import CookingRecipe from '@/components/CookingRecipe'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import FormCookingRecipe from '@/components/FormCookingRecipe.vue'
import UpdateUser from '@/components/UpdateUser.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CookingRecipe',
      component: CookingRecipe
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/cookingRecipe/:id',
      name: 'FormCookingRecipe',
      component: FormCookingRecipe
    },
    {
      path: '/updateUser',
      name: 'UpdateUser',
      component: UpdateUser
    }
  ]
})
