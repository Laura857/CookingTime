<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
            <h3>Connexion</h3>

            <div class="form-group">
                <label>Email</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Mot de passe</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <div class="clearfix">
              <p class="forgot-password mt-2 float-left d-inline-block">
                <router-link to="/forgot-password">Mot de passe oublié ?</router-link>
              </p>
              <button type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Connexion</button>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
