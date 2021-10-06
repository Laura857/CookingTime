<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
          <h3>Inscription</h3>
          <div class="form-group mt-2">
              <label>Pseudo</label>
              <p class="errorMessage">{{errorPseudo}}</p>
              <input v-model="pseudo" type="text" class="form-control form-control-lg" />
          </div>

          <div class="form-group mt-2">
            <label>Email</label>
            <p class="errorMessage">{{errorEmail}}</p>
            <input v-model="email" type="email" class="form-control form-control-lg" />
            <div class="errorMessage">{{ validation.firstError('email') }}</div>
          </div>

          <div class="form-group mt-2">
              <label>Mot de passe</label>
              <input v-model="password" type="password" class="form-control form-control-lg" />
              <div class="errorMessage">{{ validation.firstError('password') }}</div>
          </div>
          <p class="errorMessage">{{error}}</p>
          <button @click.prevent="signUpPost()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Inscription</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import { Validator } from 'simple-vue-validator'

export default {
  name: 'Signup',
  data () {
    return {
      pseudo: null,
      email: null,
      password: null,
      errorEmail: '',
      errorPseudo: '',
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
    signUpPost () {
      const postDataSignup = {email: this.email, password: this.password, pseudo: this.pseudo}
      console.log('Appel put signup avec : ', postDataSignup)
      axios
        .post('http://localhost:3000/user/signup', postDataSignup)
        .then(response => {
          console.log('reponse put signup', response)
          // LOGIN
          const postDataLogin = {email: this.email, password: this.password}
          axios
            .post('http://localhost:3000/user/login', postDataLogin)
            .then(response => {
              console.log('reponse put signup', response)
              localStorage.setItem('user', JSON.stringify(response.data))
              console.log('Après la connexion on a stocké : ', localStorage)
              this.$router.push('/')
              window.location.reload()
            })
            .catch(error => {
              console.log('Erreur lors de l\'appel à /login', error.response.data)
              if (error.response.data.error != null) {
                this.error = error.response.data.error
              } else {
                this.error = ''
              }
            })
        })
        .catch(error => {
          console.log('Erreur lors de l\'appel à /signup', error.response.data)
          if (error.response.data.error.errors.pseudo != null) {
            this.errorPseudo = error.response.data.error.errors.pseudo.message
          } else {
            this.errorPseudo = ''
          }
          if (error.response.data.error.errors.email != null) {
            this.errorEmail = error.response.data.error.errors.email.message
          } else {
            this.errorEmail = ''
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
