<template>
  <div class="register">
    <h1 class="title">Sign In</h1>
    <p class="text-xs-center">
      <router-link to="/register" class="offer">Need an account?</router-link>
    </p>
    <gg-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
    />
    <form action="/" @submit.prevent="onSubmit">
      <div class="input-wrapper">
        <input type="text" placeholder="Email" v-model="email" />
        <input type="Password" placeholder="Password" v-model="password" />
      </div>
      <input
        :disabled="isSubmitting"
        class="form-button"
        type="submit"
        value="Login"
      />
    </form>
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

.register {
  width: 700px;
  margin: 100px auto;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}
input {
  border-radius: 10px;
  border: 0px;
  margin-top: 10px;
  padding: 10px;
}
.form-button {
  width: 100%;
  background-color: #91bfcb;
}
</style>
