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
      token: '',
      pseudo: '',
      email: '',
      errorEmail: '',
      errorPseudo: '',
      error: ''
    }
  },
  validators: {
    email (value) {
      return Validator.value(value).required().email()
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
      this.pseudo = localStorage.pseudo
      this.email = localStorage.email
    }
  },
  methods: {
    updateUser () {
      const putUpdate = {email: this.email, pseudo: this.pseudo}
      const id = this.$route.params.id
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      console.log(`Appel update user avec : http://localhost:3000/user/${id}`, putUpdate)
      axios
        .put(`http://localhost:3000/user/${id}`, putUpdate, config)
        .then(response => {
          console.log('reponse update user ', response)
          localStorage.setItem('pseudo', this.pseudo)
          localStorage.setItem('email', this.email)
          this.$router.push('/')
          window.location.reload()
        })
        .catch(error => {
          console.log('Erreur lors de la mise à jour du profil ', error.response.data)
          this.error = 'Erreur lors de la mise à jour'
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
