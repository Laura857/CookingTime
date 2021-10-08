<template>
    <div id="threejs"></div>
</template>

<script>
import * as THREE from 'three'
import GLTFLoader from 'three-gltf-loader'

// eslint-disable-next-line
/* eslint-disable */ 
export default {
    data () {
      return {
        publicPath: process.env.BASE_URL
      }
    },
  mounted () {
    var scene, camera, renderer, hlight;

init();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.z = 500;
  hlight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(hlight);

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var loader = new GLTFLoader();
  loader.load('https://threejs.org/examples/models/gltf/Horse.glb', function(gltf) {
      scene.add(gltf.scene);
      renderer.render(scene, camera);
    },
    undefined,
    function(error) {
      console.error(error);
    });
}


  }
}
</script>