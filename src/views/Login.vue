<template>
  <div class="login">
    <h1 class="title">Sign In</h1>

    <gg-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
    />
    <form action="/" @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input class="input-type" type="text" placeholder="Email" v-model="email" />
        <input class="input-type" placeholder="Password" v-model="password" />
      </div>
      <input
        :disabled="isSubmitting"
        class="form-button"
        type="submit"
        value="Login"
      />
    </form>
    <p class="text-xs-center">
      <router-link to="/register" class="offer">Need an account?</router-link>
    </p>
  </div>
</template>

<script>
import GgValidationErrors from "@/components/ValidationErrors";

export default {
  name: "GgLogin",
  components: {
    GgValidationErrors,
  },

  data() {
    return {
      email: "",
      password: "",
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
        .dispatch("login", {
          email: this.email,
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
  color: #91bfcb;
  text-align: center;
}

.offer {
  text-decoration: none;
  color: #91bfcb;
  font-weight: bold;
}

.login {
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
