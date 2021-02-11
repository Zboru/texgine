<template>
    <div class="login-wrapper p-d-flex p-jc-end">
        <div class="login-box p-md-3 p-shadow-2 p-m-2">
            <div class="p-grid p-fluid p-p-5 p-mt-6" v-show="!passwordRecovery">
                <p class="sign-in-text p-col-6">Welcome, please use the form to sign-in to texGine application</p>
                <div class="email-container p-col-12">
                    <label for="email">Email</label>
                    <InputText id="email" v-model="user.email" placeholder="john@doe.com"></InputText>
                </div>
                <div class="password-container p-col-12">
                    <label for="password">Password</label>
                    <InputText id="password" v-model="user.password" type="password"
                               placeholder="mighty_flowers1"></InputText>
                </div>
                <div class="sign-in-container p-col-6">
                    <Button label="Sign in" icon="pi pi-sign-in" @click="signIn"></Button>
                </div>
                <div class="forgot-password-container p-col-6 p-d-flex p-ai-end p-jc-end">
                    <a href="javascript:void(0)" @click="passwordRecovery = true;">Forgot password?</a>
                </div>
            </div>
            <div class="p-grid p-fluid p-p-5 p-mt-6" v-show="passwordRecovery">
                <p class="password-recovery-text p-col-6">
                    Provide your account information.
                </p>
                <div class="email-container p-col-12">
                    <label for="email_recovery">Email</label>
                    <InputText id="email_recovery" v-model="user.email" placeholder="john@doe.com"></InputText>
                </div>
                <div class="recovery-container p-col-6">
                    <Button label="Send reset email" @click="recoverPassword" icon="mdi mdi-email-alert-outline"></Button>
                </div>
                <div class="cancel-container p-col-6 p-d-flex p-ai-end p-jc-end">
                    <a href="javascript:void(0)" @click="passwordRecovery = false;">Cancel recovery</a>
                </div>
            </div>
        </div>
        <Toast position="bottomright"/>
    </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';

export default {
    layout: "none",
    components: {InputText, Button, Toast},
    name: "Index",
    data() {
        return {
            user: {
                email: null,
                password: null,
            },
            passwordRecovery: false,
        }
    },
    methods: {
        signIn() {
            this.$inertia.post('/login', this.user, {
                onError: (errors) => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Authorization error',
                        detail: 'Something went wrong! Check your credentials.',
                        life: 3000
                    });
                },
            })
        },
        recoverPassword() {
            this.$inertia.post('/forgot-password', this.user, {
                onError: (errors) => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Password recovery error',
                        detail: 'We can\'t find a user with that email address.',
                        life: 3000
                    });
                },
                onSuccess: () => {
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Password recovery success',
                        detail: 'Mail containing password reset link was sent!',
                        life: 3000
                    });
                    this.passwordRecovery = false;
                }
            });
        }
    }
}
</script>

<style scoped>
.login-wrapper {
    background-image: url("/images/auth/background.jpg");
    background-size: cover;
    width: 100%;
    height: 100vh;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
}

.login-box {
    background: white;
}

.login-box label {
    display: block;
    margin-bottom: 5px;
}
</style>
