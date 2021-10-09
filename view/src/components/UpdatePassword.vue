<template>
  <div class="container m-5">
    <div class="row d-flex justify-content-center">
      <form class="col-md-4">
        <h3>Modifier le mot de passe</h3>
        <div class="form-group mt-2">
          <label>Mot de passe</label>
          <input v-model="password" type="password" class="form-control form-control-lg" />
          <div class="errorMessage">{{ validation.firstError('password') }}</div>
          </div>
        <p class="errorMessage">{{error}}</p>
        <button @click.prevent="updatePassword()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Sauvegarder</button>
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
      password: '',
      error: ''
    }
  },
  validators: {
    password (value) {
      return Validator.value(value).required().minLength(6)
    }
  },
  mounted () {
    if (localStorage.token) {
      this.token = localStorage.token
    }
  },
  methods: {
    updatePassword () {
      const updatePasswordData = {password: this.password}
      const id = this.$route.params.id
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      console.log(`Appel update password http://localhost:3000/user/${id} avec : `, updatePasswordData)
      axios
        .put(`http://localhost:3000/user/${id}`, updatePasswordData, config)
        .then(response => {
          console.log('Réponse de la mise à jour du mot de passe ', response)
          this.$router.push('/')
          window.location.reload()
        })
        .catch(error => {
          console.log('Erreur lors de la mise à jour du mot de passe ', error.response.data)
          this.error = 'Erreur lors de la mise à jour du mot de passe'
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
