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
              <div class="h3 mb-0">
                <router-link class="nav-link" to="#"><b-icon icon="suit-heart-fill"></b-icon></router-link>
              </div>
            </li>
            <li class="nav-item">
              <div class="h2 mb-0">
                <router-link class="nav-link" to="#"><b-icon icon="person-fill"></b-icon></router-link>
              </div>
            </li>
            <li class="nav-item">
              <p>Hello {{pseudo}} !</p>
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
      isToken: true,
      pseudo: 'Laura'
    }
  }
}
</script>
