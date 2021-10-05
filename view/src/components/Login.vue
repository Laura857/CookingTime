<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
            <h3>Connexion</h3>

            <div class="form-group">
                <label>Email</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
                <div class="errorMessage">{{ validation.firstError('email') }}</div>
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
                <div class="errorMessage">{{ validation.firstError('password') }}</div>
            </div>
            <p class="errorMessage">{{error}}</p>
            <div class="clearfix">
              <p class="forgot-password mt-2 float-left d-inline-block">
                <router-link to="#">Mot de passe oublié ?</router-link>
              </p>
              <button @click.prevent="loginPost()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Connexion</button>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Validator } from 'simple-vue-validator'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null,
      error: ''
    }
  },
  validators: {
    email (value) {
      return Validator.value(value).required().email()
    },
    password (value) {
      return Validator.value(value).required().minLength(6)
    }
  },
  mounted () {
  },
  methods: {
    loginPost () {
      const postDataLogin = {email: this.email, password: this.password}
      console.log('Appel put login avec : ', postDataLogin)
      axios
        .post('http://localhost:3000/user/login', postDataLogin)
        .then(response => {
          console.log('reponse put signup', response)
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Erreur lors de l\'appel à /login', error.response.data)
          if (error.response.data.error != null) {
            this.error = error.response.data.error
          } else {
            this.error = ''
          }
        })
    }
  }
}
</script>

<style>
.errorMessage {
  color: red;
  margin: 0;
}
</style>
