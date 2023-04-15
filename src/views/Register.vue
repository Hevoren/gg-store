<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>

    <gg-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
      class="errors"
    />
    <form action="/" @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input class="input-type" type="text" placeholder="Fio" v-model="fio" />
        <input class="input-type" type="text" placeholder="Email" v-model="email" />
        <input class="input-type" type="Password" placeholder="Password" v-model="password" />
      </div>
      <input
        :disabled="isSubmitting"
        class="form-button"
        type="submit"
        value="Register"
      />
    </form>
    <p class="text-xs-center">
      <router-link to="/login" class="offer">Have an account?</router-link>
    </p>
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
        .then(() => {
          this.$router.push({ name: "home" });
        });
    },
  },
};
</script>

<style>
.title {
  color: #378ba4;
  text-align: center;
}

.offer {
  text-decoration: none;
  color: #012e4a;
  font-weight: bold;
}

.errors {
  color: red;
  font-weight: bold;
}

.register {
  width: 400px;
  margin: 100px auto;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

.input-type {
  border-radius: 10px;
  border: 2px solid #91bfcb;
  box-shadow: none;
  margin-top: 10px;
  padding: 10px;
  color: black;
}

.input-type:focus{
  border: 2px solid black;
  box-shadow: none;
}

.form-button {
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background-color: #81bece;
}
</style>
