<template>
  <div class="cookingRecipe p-3">
    <h1>Toutes nos supers recettes</h1>
    <!-- <p>{{ cookingRecipe }}</p> -->
  <b-container>
    <div class="list-unstyled" v-for="cookingRecipe in cookingRecipes" :key="cookingRecipe._id">
      <b-card>
      <!-- Bootstrap Jumbotron -->
      <b-jumbotron>
        <!-- ligne -->
        <b-row>
          <b-col cols="8">
            <h1>{{cookingRecipe.name}}</h1>
            <p>{{cookingRecipe.ingredients}}</p>
            <p>{{cookingRecipe.instruction}}</p>
          </b-col>
        </b-row>
      </b-jumbotron>
      </b-card>
    </div>
  </b-container>
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
    console.log('Appel get')
    axios
      .get('http://localhost:3000/cookingRecipe')
      .then(response => {
        console.log('reponse get', response)
        this.cookingRecipes = response.data
      })
      .catch(error => console.log(error))
  },
  methods: {}
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
