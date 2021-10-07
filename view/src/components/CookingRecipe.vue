<template>
  <div class="cookingRecipe p-3">
    <h1>Toutes nos supers recettes</h1>
    <button id="notification" class="d-lg-none" @click="showToast()">Show toast</button>
    <div class="container" id="app">
      <div class="row">
          <div v-for="cookingRecipe in cookingRecipes" v-bind:key="cookingRecipe._id" class="col-md-3 col-6 my-1">
              <div class="card h-100">
                  <img src="https://picsum.photos/600/300/?image=25" class="card-img-top">
                  <div class="card-body" style="align-items: baseline;">
                    <div class="card-title flex space-between">
                      <h5>{{ cookingRecipe.name }}</h5>
                      <div class="flex" v-if="isToken === true">
                        <router-link class="nav-link" v-on:click.native="setModeFormCookingRecipe('update', cookingRecipe._id)" to="#"><b-icon icon="pencil-fill"></b-icon></router-link>
                        <router-link class="nav-link" to="#" @click.native="deleteCookingRecipe(cookingRecipe)"><b-icon icon="trash-fill"></b-icon></router-link>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      <div v-if="isToken === true" class="h2 mb-0">
        <router-link class="nav-link" style="float: right;" v-on:click.native="setModeFormCookingRecipe('create', 'create')" to="#"><b-icon icon="plus-circle-fill"></b-icon></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
let notification =""
export default {
  data () {
    return {
      cookingRecipes: [],
      isToken: false,
      token: '',
      socket: io('http://localhost:3001')
    }
  },
  mounted () {
    // this.socket.emit('notification', 'Hello there from Vue.')
    if (localStorage.user) {
      this.isToken = true
      this.token = JSON.parse(localStorage.user).token
    }
    console.log('Appel get /cookingRecipe')
    axios
      .get('http://localhost:3000/cookingRecipe')
      .then(response => {
        console.log('reponse get', response)
        this.cookingRecipes = response.data
      })
      .catch(error => console.log(error))
    this.socket.on('broadcast', (data) => {
      notification = data
      document.getElementById('notification').click()
    })
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()
    },
    setModeFormCookingRecipe (mode, id) {
      console.log('On met à jour le mode pour le formulaire cooking recipe avec : ', mode)
      localStorage.setItem('modeFormCookingRecipe', mode)
      this.$router.push('/cookingRecipe/' + id)
    },
    deleteCookingRecipe (cookingRecipe) {
      this.boxOne = ''
      this.$bvModal.msgBoxConfirm('Vous allez supprimer la recette ' + cookingRecipe.name)
        .then(value => {
          if (value === true) {
            const config = {
              headers: { Authorization: `Bearer ${this.token}` }
            }
            axios
              .delete('http://localhost:3000/cookingRecipe/' + cookingRecipe._id, config)
              .then(response => {
                console.log('reponse delete /cookingRecipe', response)
                window.location.reload()
              })
              .catch(error => console.log(error))
          }
        })
        .catch(error => console.log('Une erreur est survenue lors du delete', error))
    },
    showToast () {
      this.$toast.success(` ${notification}`, {
        position: 'top-right',
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.flex{
  display: flex;
}
.space-between{
  justify-content: space-between;
}

</style>
