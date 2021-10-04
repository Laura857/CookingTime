<template>
  <div class="cookingRecipe">
    <h1>Toutes nos supers recettes</h1>
    <p>{{ cookingRecipe }}</p>
  </div>
</template>

// <script>
// // import axios from 'axios'

// export default {
//   data () {
//     return {
//       cookingRecipe: []
//     }
//   },
//   // mounted () {
//   //   console.log('Appel get')
//   //   axios
//   //     .get('localhost:3000/cookingRecipe')
//   //     .then(response => {
//   //       console.log('reponse get', response)
//   //       this.cookingRecipe = response.data
//   //     })
//   //     .catch(error => console.log(error))
//   // },
//   mounted () {
//     console.log('Appel get')
//     fetch('https://localhost:3000/cookingRecipe')
//       .then(response => response.json())
//       .then(result => {
//         console.log('reponse get', result)
//         this.cookingRecipe = result
//       })
//       .catch(error => console.log(error))
//   },
//   methods: {}
// }
//</script>

<script>
const COOKING_RECIPE = "https://localhost:3000/cookingRecipe";

export default {
  data: () => ({
    error: "",
    cookingRecipe: []
  }),

  mounted() {
    fetch(COOKING_RECIPE)
      .then(response => response.json())
      .then(result => {
        this.cookingRecipe = result;
      });
  },
  methods: {}
};
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
