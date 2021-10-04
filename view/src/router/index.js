import Vue from 'vue'
import Router from 'vue-router'
import CookingRecipe from '@/components/CookingRecipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CookingRecipe',
      component: CookingRecipe
    }
  ]
})
