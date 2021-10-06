<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
          <h3>Modifier le profil</h3>
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
          <button @click.prevent="updateUser()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Sauvegarder</button>
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
      pseudo: '',
      email: '',
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
    if (localStorage.user) {
      this.pseudo = JSON.parse(localStorage.user).pseudo
      this.email = JSON.parse(localStorage.user).email
    }
  },
  methods: {
    updateUser () {
      const postDataSignup = {email: this.email, password: this.password, pseudo: this.pseudo}
      const id = this.$route.params.id
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      console.log('Appel update user avec : ', postDataSignup)
      // axios
      //   .put(`http://localhost:3000/user/${id}`, postDataSignup, config)
      //   .then(response => {
      //     console.log('reponse update user ', response)
      //     localStorage.setItem('user', JSON.stringify(response.data))
      //     this.$router.push('/')
      //     window.location.reload()
      //   })
      //   .catch(error => {
      //     console.log('Erreur lors de la mise à jour du profil ', error.response.data)
      //     if (error.response.data.error.errors.pseudo != null) {
      //       this.errorPseudo = error.response.data.error.errors.pseudo.message
      //     } else {
      //       this.errorPseudo = ''
      //     }
      //     if (error.response.data.error.errors.email != null) {
      //       this.errorEmail = error.response.data.error.errors.email.message
      //     } else {
      //       this.errorEmail = ''
      //     }
      //   })
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
