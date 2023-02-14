<template>
  <div class="mb-3 container my-5">
    <HourGlassLoading v-if="loading"></HourGlassLoading>
    <b-card
      v-if="!loading"
      title="Sign up"
      class="card mx-auto text-center p-4"
    >
      <b-form @submit.prevent="onSubmit">
        <b-form-group class="mb-4 mt-4">
          <b-form-input
            id="userName"
            placeholder="Enter Name"
            v-model="$v.name.$model"
            :class="{ error: $v.name.$error, valid: !$v.name.$invalid }"
          >
          </b-form-input>
          <transition name="bounce">
            <div v-if="$v.name.$error" class="errorMessage">
              <p v-if="!$v.name.required">Username is Required !</p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group
          class="mb-4 mt-4 text-left"
          description="We will never share your email with anyone else"
        >
          <b-form-input
            id="userEmail"
            type="email"
            placeholder="Enter Email"
            v-model="$v.email.$model"
            :class="{ error: $v.email.$error, valid: !$v.email.$invalid }"
          ></b-form-input>
          <transition name="bounce">
            <div v-if="$v.email.$error" class="errorMessage">
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
              v-model="$v.password.$model"
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
            <div v-if="$v.password.$error" class="errorMessage">
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
        <b-form-group class="mb-4 mt-4 block-inline">
          <b-input-group>
            <b-form-input
              id="userConfirmPassword"
              :type="confirmPassShow ? 'text' : 'password'"
              placeholder="Enter Confirm Password"
              v-model="$v.confirmPassword.$model"
              :class="{
                error: $v.confirmPassword.$error,
                valid: password != '' ? !$v.confirmPassword.$invalid : '',
              }"
            ></b-form-input>
            <template #append>
              <button
                class="button icon round-corners px-3"
                @click.prevent="confirmPassShow = !confirmPassShow"
              >
                <span class="is-small is-right">
                  <b-icon
                    icon="eye-fill"
                    scale="2"
                    variant="info"
                    v-if="confirmPassShow"
                  ></b-icon>
                  <b-icon
                    scale="2"
                    icon="eye-slash-fill"
                    variant="info"
                    v-if="!confirmPassShow"
                  ></b-icon>
                </span>
              </button>
            </template>
          </b-input-group>
          <transition name="bounce">
            <div v-if="$v.confirmPassword.$error" class="errorMessage">
              <p v-if="!$v.confirmPassword.sameAsPassword">
                Password must be identical.
              </p>
            </div>
          </transition>
        </b-form-group>
        <b-form-group class="mb-4">
          <b-button type="submit" class="w-100 signin-btn" variant="primary"
            >Sign up</b-button
          >
        </b-form-group>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import {
  passwordValidation,
  emailValidation,
} from "@/service/patternValidation";
import { registerNewUser } from "@/service/user";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import HourGlassLoading from "../HourGlassLoading.vue";
export default {
  name: "UserRegister",
  components: {
    HourGlassLoading,
  },
  data() {
    return {
      show: false,
      loading: false,
      confirmPassShow: false,
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    };
  },
  validations: {
    name: {
      required,
    },
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
    confirmPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    async submitNewLogin() {
      this.loading = true;

      const newDetails = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        console.log(newDetails);
        const newUser = await registerNewUser(newDetails);
        console.log(newUser);
        Vue.$toast.open({
          message: `Congratulations new user is registered!`,
          type: "success",
          position: "bottom",
        });
        this.name = null;
        this.email = null;
        this.password = "";
        this.confirmPassword = null;
        this.$nextTick(() => {
          this.$v.$reset();
        });
        this.$router.push("/");
      } catch (error) {
        Vue.$toast.open({
          message: error.request.response,
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
        this.submitNewLogin();
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