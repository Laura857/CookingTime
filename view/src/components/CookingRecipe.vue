<template>
  <div class="cookingRecipe">
    <h1>Toutes nos supers recettes</h1>
    <p>{{ cookingRecipe }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      cookingRecipe: []
    }
  },
  mounted () {
    console.log('Appel get')
    axios
      .get('http://localhost:3000/cookingRecipe')
      .then(response => {
        console.log('reponse get', response)
        this.cookingRecipe = response.data
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
