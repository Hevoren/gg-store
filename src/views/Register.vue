<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link to="{name: 'login'}">Need an account?</router-link>
          </p>
          VALIDATION ERRORS
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username">
            </fieldset>

            <fieldset class="form-group">
              <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Email">
            </fieldset>

            <fieldset class="form-group">
              <input
                  type="Password"
                  class="form-control form-control-lg"
                  placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
    Register Page
  </div>
</template>

<script>
export default {
  name: 'GgRegister',
  methods: {
    onSubmit() {
      console.log('submitted from');
    }
  }
}
</script>
