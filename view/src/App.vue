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
    <div class="float-right">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Connexion</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Inscription</a>
        </li>
      </ul>
    </div>
  </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
