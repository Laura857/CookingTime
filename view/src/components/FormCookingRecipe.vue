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

        <div class="form-group mt-2">
          <label>Url image</label>
          <textarea v-model="urlImage" class="form-control form-control-lg" />
        </div>
        <button @click.prevent="save()" type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Sauvegarder</button>
      </form>
    </div>
    <div id="threejs" class="flex" style="float: right"></div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
import * as THREE from 'three'

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
      instruction: '',
      urlImage: '',
      token: '',
      socket: io('http://localhost:3001')
    }
  },
  mounted () {
    if (localStorage.token) {
      this.isToken = true
      this.token = localStorage.token
    }
    console.log('Form cooking recipe mode : ', localStorage.modeFormCookingRecipe)
    if (localStorage.modeFormCookingRecipe === 'update') {
      this.mode = localStorage.modeFormCookingRecipe
      const id = this.$route.params.id
      console.log('Appel get /cookingRecipe/' + id)
      axios
        .get(`http://localhost:3000/cookingRecipe/${id}`)
        .then(response => {
          console.log('Réponse get /cookingRecipe/', id, response)
          this.name = response.data.name
          this.ingredients = response.data.ingredients
          this.instruction = response.data.instruction
          this.urlImage = response.data.urlImage
        })
        .catch(error => console.log(error))
    } else if (localStorage.modeFormCookingRecipe === 'create') {
      this.mode = localStorage.modeFormCookingRecipe
    }
    this.threejs()
  },
  methods: {
    threejs () {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 2000)
      scene.background = new THREE.Color('#FFFFFF')
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(100, 100)
      document.getElementById('threejs').appendChild(renderer.domElement)

      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: '#42b983' })
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)

      camera.position.z = 5

      const animate = function () {
        requestAnimationFrame(animate)
        cube.rotation.x += 0.01
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
      }
      animate()
    },
    updateCookingRecipe () {
      const id = this.$route.params.id
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      const dataUpdate = {name: this.name, ingredients: this.ingredients, instruction: this.instruction, urlImage: this.urlImage}
      console.log('Appel put update cooking recipe avec : ', dataUpdate)
      axios
        .put(`http://localhost:3000/cookingRecipe/${id}`, dataUpdate, config)
        .then(response => {
          console.log('Réponse put cookingRecipe', response)
          localStorage.removeItem('modeFormCookingRecipe')
          this.socket.emit('notification', `La recette ${this.name} a été modifiée 🤗`)
          this.$router.push('/')
        })
        .catch(error => {
          console.log('Erreur lors de l\'appel à /cookingRecipe/' + id, error.response.data)
        })
    },
    createCookingRecipe () {
      const dataCreate = {name: this.name, ingredients: this.ingredients, instruction: this.instruction, urlImage: this.urlImage}
      const config = {
        headers: { Authorization: `Bearer ${this.token}` }
      }
      console.log('Appel post create cooking recipe avec : ', dataCreate)
      axios
        .post('http://localhost:3000/cookingRecipe/', dataCreate, config)
        .then(response => {
          console.log('Réponse de la création de recette ', response)
          localStorage.removeItem('modeFormCookingRecipe')
          this.socket.emit('notification', `Une nouvelle recette ${this.name} a été ajoutée 🥰`)
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
