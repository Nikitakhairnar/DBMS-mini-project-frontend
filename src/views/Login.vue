<template>
    <div class="login">
        <div class="container-fluid h-custom">
            <div
                class="
                    row
                    d-flex
                    justify-content-center
                    align-items-center
                    h-100
                "
            >
                <div class="col-md-9 col-lg-6 col-xl-5 mb-lg-0 mb-3">
                    <img src="/img/login.svg" class="img-fluid" alt="" />
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-0">
                    <form>
                        <div
                            class="
                                d-flex
                                flex-row
                                align-items-center
                                justify-content-center justify-content-lg-start
                            "
                        >
                            <p class="lead fw-normal mb-0 me-3">Sign in with</p>
                            <button
                                type="button"
                                class="btn btn-primary btn-floating mx-1"
                            >
                                <i class="fab fa-facebook-f"></i>
                            </button>

                            <button
                                type="button"
                                class="btn btn-primary btn-floating mx-1"
                            >
                                <i class="fab fa-twitter"></i>
                            </button>

                            <button
                                type="button"
                                class="btn btn-primary btn-floating mx-1"
                            >
                                <i class="fab fa-linkedin-in"></i>
                            </button>
							
                        </div>

                        <div class="divider d-flex align-items-center my-4">
                            <p class="fw-bold mx-auto mb-0">Or</p>
						</div>

                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input
                                type="email"
                                id="form3Example3"
                                class="form-control form-control-lg"
                                placeholder="Enter a valid email address"
                                v-model="email"
                            />
                            <label class="form-label" for="form3Example3"
                                >Email address</label
                            >
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input
                                type="password"
                                id="form3Example4"
                                class="form-control form-control-lg"
                                placeholder="Enter password"
                                v-model="password"
                            />
                            <label class="form-label" for="form3Example4"
                                >Password</label
                            >
                        </div>

                        <div
                            class="
                                d-flex
                                justify-content-between
                                align-items-center
                            "
                        >
                            <!-- Checkbox -->
                            <div class="form-check mb-0">
                                <input
                                    class="form-check-input me-2"
                                    type="checkbox"
                                    value=""
                                    id="form2Example3"
                                />
                                <label
                                    class="form-check-label"
                                    for="form2Example3"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a href="#!" class="text-body">Forgot password?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button
                                type="button"
                                class="btn btn-primary btn-lg shadow"
                                style="
                                    padding-left: 2.5rem;
                                    padding-right: 2.5rem;
                                "
                                @click="loginUser"
                            >
                                Login
                            </button>

                            <p class="small fw-bold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <router-link
                                    class="link-danger"
                                    :to="{ name: 'Signup' }"
                                    >Register</router-link
                                >
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Login",
    computed: {
        email: {
            get() {
                return this.$store.state.authentication.email;
            },
            set(value) {
                this.$store.commit("updateEmail", value);
            },
        },
        password: {
            get() {
                return this.$store.state.authentication.password;
            },
            set(value) {
                this.$store.commit("updatePassword", value);
            },
        },
    },
	data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "745489409648-02f4v90o22ldbl5ssj2t0dp9pk89s4uu.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 250,
                    height: 50,
                    longtitle: true
                }
            }
        },
    methods: {
        async loginUser() {
            await this.$store.dispatch("loginUser")
            this.$router.push({name: 'Home'})
        },
		onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        }
    },
    beforeRouteLeave(to,from,next) {
        this.$store.commit("resetStates");
        next();
    }
}
</script>
