<template>
  <div class="mb-3 container my-5">
    <HourGlassLoading v-if="loading"></HourGlassLoading>
    <b-card
      v-if="!loading"
      title="Sign in"
      class="card mx-auto text-center p-4"
    >
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-4 mt-4">
          <b-form-input
            id="userEmail"
            type="email"
            v-model.trim="$v.email.$model"
            placeholder="Enter Email"
            :class="{ error: $v.email.$error, valid: !$v.email.$invalid }"
          >
          </b-form-input>
          <transition name="bounce">
            <div v-if="$v.email.$error" class="text-left errorMessage">
              <p v-if="!$v.email.required">Email is Required !</p>
              <p v-else-if="$v.email.$invalid">Please enter valid Email !</p>
              <p v-else-if="$v.email.emailValidation">
                Please enter valid Email !
              </p>
            </div>
          </transition>
        </b-form-group>

        <b-form-group class="mb-4 mt-4 block-inline">
          <b-input-group>
            <b-form-input
              id="userPassword"
              :type="show ? 'text' : 'password'"
              placeholder="Enter Password"
              v-model.trim="$v.password.$model"
              :class="{
                error: $v.password.$error,
                valid: !$v.password.$invalid,
              }"
            ></b-form-input>
            <template #append>
              <button
                class="button icon round-corners px-3"
                @click.prevent="show = !show"
              >
                <span class="is-small is-right">
                  <b-icon
                    icon="eye-fill"
                    scale="2"
                    variant="info"
                    v-if="show"
                  ></b-icon>
                  <b-icon
                    scale="2"
                    icon="eye-slash-fill"
                    variant="info"
                    v-if="!show"
                  ></b-icon>
                </span>
              </button>
            </template>
          </b-input-group>
          <transition name="bounce">
            <div v-if="$v.password.$error" class="text-left errorMessage">
              <p v-if="!$v.password.required">Password is Required !</p>
              <p v-else-if="!$v.password.minLength">
                Password should contain 8 Minimum Character !
              </p>
              <p v-else-if="!$v.password.passwordValidation">
                Password must have at least 1 character , 1 digit, 1 special
                characters, and should be atleast 8 characters in length.
              </p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-button type="submit" class="w-100 signin-btn" variant="primary"
            >Sign in</b-button
          >
        </b-form-group>
        <b-form-group>
          <b-card-text class="text-justify">
            Dont have an account ? <b-link to="/register">Sign up here</b-link>
          </b-card-text>
        </b-form-group>
      </b-form>
    </b-card>
    <div v-if="!loading" class="text-muted container my-5">
      <div>
        <small><strong>NOTE</strong></small>
      </div>
      <div>
        <small>Email : kshirsagar@gmail.com</small>
      </div>
      <div>
        <small> Password : Ukshirsagar@2</small>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  passwordValidation,
  emailValidation,
} from "@/service/patternValidation";
import { required, email, minLength } from "vuelidate/lib/validators";
import HourGlassLoading from "../HourGlassLoading.vue";
//import {userLogin} from '@/service/user'
export default {
  name: "UserLogin",
  components: {
    HourGlassLoading,
  },
  data() {
    return {
      show: false,
      email: "",
      password: "",
      loading: false,
      error: null,
    };
  },
  validations: {
    email: {
      required,
      email,
      emailValidation,
    },
    password: {
      required,
      minLength: minLength(8),
      passwordValidation,
    },
  },
  methods: {
    async submitLogin() {
      const loginDetails = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;

      try {
        await this.$store.dispatch("userLogin", loginDetails);

        Vue.$toast.open({
          message: `Welcome ${this.$store.state.auth.name} `,
          type: "success",
          position: "bottom",
        });
        this.$router.push("/calendar");
      } catch (error) {
        Vue.$toast.open({
          message: error.message,
          type: "error",
          position: "bottom",
        });
      } finally {
        this.loading = false;
      }
    },
    onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "FAIL";
      } else {
        this.submitStatus = "SUCCESS";
        this.submitLogin();
      }
    },
  },
};
</script>

<style scoped>
.round-corners {
  border: 1px solid #ced4da;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}
@media only screen and (min-width: 750px) {
  .card {
    width: 60%;
  }
}
.card {
  box-shadow: 0.05rem 0.1rem 0.3rem -0.03rem rgba(0, 0, 0, 0.45);
  background-image: linear-gradient(
    to bottom,
    rgb(161, 183, 187),
    rgb(198, 220, 224)
  );
}
.card:hover {
  box-shadow: 0 15px 10px -10px rgba(31, 31, 31, 0.5);
  transition: all 0.3s ease;
}
.signin-btn:hover {
  text-decoration: none;
  font-weight: bold;
}

/* validations css */
.valid {
  border: 1.5px solid rgb(55, 161, 14);
  color: rgb(26, 82, 4);
}
form div .error {
  border: 1.5px solid red;
  color: rgb(247, 10, 10);
}
.errorMessage {
  transition: visibility 0s, opacity 0.5s linear;
  color: rgb(233, 64, 22);
  font-size: 0.8em;
}
/* animation of validation messages */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>