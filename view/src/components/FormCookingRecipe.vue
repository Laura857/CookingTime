<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
          <h3 v-if="mode === 'update'">Modification recette</h3>
          <h3 v-else>Création recette</h3>
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
          <button @click.prevent="save()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Sauvegarder</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  beforeDestroy () {
    console.log('Quand je quitte la page je veux delete le storage')
    localStorage.removeItem('modeFormCookingRecipe')
  },
  name: 'UpdateCookingRecipe',
  data () {
    return {
      mode: '',
      name: '',
      ingredients: '',
      instruction: ''
    }
  },
  mounted () {
    console.log('Form cooking recipe mode : ', localStorage.modeFormCookingRecipe)
    if (localStorage.modeFormCookingRecipe === 'update') {
      this.mode = localStorage.modeFormCookingRecipe
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
    } else if (localStorage.modeFormCookingRecipe === 'create') {
      this.mode = localStorage.modeFormCookingRecipe
    }
  },
  methods: {
    updateCookingRecipe () {
      const id = this.$route.params.id
      const dataUpdate = {name: this.name, ingredients: this.ingredients, instruction: this.instruction}
      console.log('Appel put update cooking recipe avec : ', dataUpdate)
      axios
        .put(`http://localhost:3000/cookingRecipe/${id}`, dataUpdate)
        .then(response => {
          console.log('reponse put cookingRecipe', response)
          localStorage.removeItem('modeFormCookingRecipe')
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Erreur lors de l\'appel à /cookingRecipe/', id, error.response.data)
        })
    },
    createCookingRecipe () {
      const dataCreate = {name: this.name, ingredients: this.ingredients, instruction: this.instruction}
      console.log('Appel post create cooking recipe avec : ', dataCreate)
      axios
        .post('http://localhost:3000/cookingRecipe/', dataCreate)
        .then(response => {
          console.log('reponse post create cooking recipe', response)
          localStorage.removeItem('modeFormCookingRecipe')
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Erreur lors de la création d\'une recette', error.response.data)
        })
    },
    save () {
      if (localStorage.modeFormCookingRecipe === 'update') {
        this.updateCookingRecipe()
      } else if (localStorage.modeFormCookingRecipe === 'create') {
        this.createCookingRecipe()
      }
    }
  }
}
</script>
