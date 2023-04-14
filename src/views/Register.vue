<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <p class="text-xs-center">
      <router-link to="{name: 'login'}">Need an account?</router-link>
    </p>
    <gg-validation-errors v-if="validationErrors" :validation-errors="validationErrors"/>
    <form action="/" @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input type="text" placeholder="Fio" v-model="fio"/>
        <input type="text" placeholder="Email" v-model="email"/>
        <input type="Password" placeholder="Password" v-model="password"/>
      </div>
      <input :disabled="isSubmitting" class="form-button" type="submit" value="Register">
    </form>
  </div>
</template>

<script>
import GgValidationErrors from "@/components/ValidationErrors";

export default {
  name: "GgRegister",
  components: {
    GgValidationErrors,
  },
  data() {
    return {
      email: "",
      password: "",
      fio: "",
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    },
  },

  methods: {
    onSubmit() {
      console.log("submitted from");
      this.$store
          .dispatch("register", {
            email: this.email,
            fio: this.fio,
            password: this.password,
          })
          .then((user) => {
            console.log("successfully register user", user);
            this.$router.push({name: "home"});
          });
    },
  },
};
</script>

<style>
.title {
  text-align: center;
}

.register {
  width: 700px;
  margin: auto;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}
input{
  margin-top: 10px;
  padding: 10px;
}
.form-button{
  width: 100%;
}
</style>