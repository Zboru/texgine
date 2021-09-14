<template>
  <div>
    <personal-section />
    <password-section />
  </div>
</template>

<script>
import PersonalSection from '../components/Profile/PersonalSection.vue';
import PasswordSection from '../components/Profile/PasswordSection.vue';

export default {
  components: { PasswordSection, PersonalSection },
};
</script>
