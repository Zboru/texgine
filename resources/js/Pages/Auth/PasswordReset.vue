<template>
    <div class="login-wrapper p-d-flex p-jc-end">
        <div class="login-box p-md-3 p-shadow-2 p-m-2">
            <div class="p-grid p-fluid p-p-5 p-mt-6">
                <p class="sign-in-text p-col-6">Please use the form to reset your password</p>
                <div class="email-container p-col-12">
                    <label for="email">Email</label>
                    <InputText id="email" disabled v-model="user.email" placeholder="john@doe.com"></InputText>
                </div>
                <div class="password-container p-col-12">
                    <label for="password">Password</label>
                    <InputText id="password" v-model="user.password" type="password"
                               placeholder="mighty_flowers1"></InputText>
                </div>
                <div class="password-confirmation-container p-col-12">
                    <label for="password-confirmation">Password</label>
                    <InputText id="password-confirmation" v-model="user.password_confirmation" type="password"
                               placeholder="mighty_flowers1"></InputText>
                </div>
                <div class="sign-in-container p-col-6">
                    <Button label="Reset password" icon="mdi mdi-18px mdi-lock-check-outline" @click="signIn"></Button>
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
    name: "PasswordReset",
    props: ['request'],
    data() {
        return {
            user: {
                email: this.request.email,
                password: null,
                password_confirmation: null,
                token: null
            },
        }
    },
    mounted() {
        this.user.token = window.location.pathname.replace('/reset-password/', '');
    },
    methods: {
        signIn() {
            this.$inertia.post('/reset-password', this.user, {
                onError: (errors) => {
                    this.$toast.add({
                        severity: 'error',
                        summary: 'Password recovery error',
                        detail: 'Something went wrong! Passwords do not match.',
                        life: 3000
                    });
                },
                onSuccess: () => {
                    console.log("Success")
                    this.$toast.add({
                        severity: 'success',
                        summary: 'Password recovery success',
                        detail: 'Sign in using your new credentials.',
                        life: 3000
                    });
                }
            })
        },
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
