<template>
  <div class="cookingRecipe p-3">
    <h1>Toutes nos supers recettes</h1>
    <!-- <p>{{ cookingRecipe }}</p> -->
    <div class="container" id="app">
      <div class="row">
          <div v-for="cookingRecipe in cookingRecipes" v-bind:key="cookingRecipe._id" class="col-md-3 col-6 my-1">
              <div class="card h-100">
                  <img src="https://picsum.photos/600/300/?image=25" class="card-img-top">
                  <div class="card-body" style="align-items: baseline;">
                    <div class="card-title">
                      {{ cookingRecipe.name }}
                      <router-link class="nav-link" style="float: right;" v-on:click.native="setModeFormCookingRecipe('update')" :to="`/cookingRecipe/${cookingRecipe._id}`"><b-icon icon="pencil-fill"></b-icon></router-link>
                      <router-link class="nav-link" style="float: right;" to="#"><b-icon icon="trash-fill"></b-icon></router-link>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="h2 mb-0">
        <router-link class="nav-link" style="float: right;" v-on:click.native="setModeFormCookingRecipe('create')" to="/cookingRecipe/create"><b-icon icon="plus-circle-fill"></b-icon></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      cookingRecipes: []
    }
  },
  mounted () {
    console.log('Appel get /cookingRecipe')
    axios
      .get('http://localhost:3000/cookingRecipe')
      .then(response => {
        console.log('reponse get', response)
        this.cookingRecipes = response.data
      })
      .catch(error => console.log(error))
  },
  methods: {
    setModeFormCookingRecipe (mode) {
      console.log('On met à jour le mode pour le formulaire cooking recipe avec : ', mode)
      localStorage.setItem('modeFormCookingRecipe', mode)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
