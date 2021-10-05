<template>
    <div class="container m-5">
      <div class="row d-flex justify-content-center">
        <form class="col-md-4">
          <h3>Inscription</h3>

          <div class="form-group">
              <label>Pseudo</label>
              <input type="text" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
              <label>Mot de passe</label>
              <input type="password" class="form-control form-control-lg" />
          </div>
            <button type="submit" class="btn btn-dark btn-lg  mt-2 float-right" style="float: right;">Inscription</button>
        </form>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Signup'
}
</script>
