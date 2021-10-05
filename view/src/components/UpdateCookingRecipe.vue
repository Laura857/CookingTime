<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
          <h3>Modification recette</h3>
          <div class="form-group mt-2">
              <label>Nom</label>
              <input v-model="name" type="text" class="form-control form-control-lg" />
          </div>

          <div class="form-group mt-2">
              <label>Ingrédients</label>
              <textarea v-model="ingredients" class="form-control form-control-lg" />
          </div>

          <div class="form-group mt-2">
              <label>Instructions</label>
              <textarea v-model="instruction" class="form-control form-control-lg" />
          </div>
          <button @click.prevent="updateCookingRecipe()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Sauvegarder</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UpdateCookingRecipe',
  data () {
    return {
      name: '',
      ingredients: '',
      instruction: ''
    }
  },
  mounted () {
    const id = this.$route.params.id
    console.log('Appel get /cookingRecipe/', id)
    axios
      .get(`http://localhost:3000/cookingRecipe/${id}`)
      .then(response => {
        console.log('reponse get /cookingRecipe/', id, response)
        this.name = response.data.name
        this.ingredients = response.data.ingredients
        this.instruction = response.data.instruction
      })
      .catch(error => console.log(error))
  },
  methods: {
    updateCookingRecipe () {
      const id = this.$route.params.id
      const putDataLogin = {name: this.name, ingredients: this.ingredients, instruction: this.instruction}
      console.log('Appel put login avec : ', putDataLogin)
      axios
        .put(`http://localhost:3000/cookingRecipe/${id}`, putDataLogin)
        .then(response => {
          console.log('reponse put cookingRecipe', response)
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Erreur lors de l\'appel à /cookingRecipe/', id, error.response.data)
        })
    }
  }
}
</script>
