<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
      <a class="navbar-brand" href="/">FoodList</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="float-center ">
          <input class=" mr-auto" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success " type="submit">Search</button>
        </form>
      </div>
      <div v-if="isToken === false">
        <div class="float-right">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/login">Connexion</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">Inscription</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="isToken === true">
        <div class="float-right">
          <ul class="navbar-nav mr-auto" style="align-items: baseline;">
            <li class="nav-item">
              <p>Hello {{pseudo}} !</p>
            </li>
            <li class="nav-item dropdown">
              <b-nav-item-dropdown text="Lang" right>
                <template v-slot:button-content>
                  <div class="h2 mb-0">
                    <b-icon icon="person-fill"></b-icon>
                  </div>
                </template>
                <b-dropdown-item href="#">Modifier le profil</b-dropdown-item>
                <b-dropdown-item  @click.prevent="logout()">Déconnexion</b-dropdown-item>
              </b-nav-item-dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isToken: false,
      pseudo: ''
    }
  },
  mounted () {
    console.log('Au chargement de la page : ', localStorage)
    if (localStorage.user) {
      this.pseudo = JSON.parse(localStorage.user).pseudo
      this.isToken = true
    }
  },
  methods: {
    logout () {
      console.log('Déconnexion Au revoir')
      localStorage.removeItem('pseudo')
      localStorage.removeItem('user')
      window.location.reload()
    }
  }
}
</script>

<style>
  .dropdown-toggle::after {
      content: none
  }
</style>
