<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <p class="text-xs-center">
      <router-link to="/login" class="offer">Have an account?</router-link>
    </p>
    <gg-validation-errors v-if="validationErrors" :validation-errors="validationErrors" class="errors"/>
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
          .then(() => {
            this.$router.push({name: "home"});
          });
    },
  },
};
</script>

<style>
.title {
  color: #378BA4;
  text-align: center;
}

.offer {
  text-decoration: none;
  color: #012E4A;
  font-weight: bold;
}

.errors {
  color: red;
  font-weight: bold;
}

.register {
  width: 700px;
  margin: 100px auto ;
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
  background-color: #81BECE;
}
</style>