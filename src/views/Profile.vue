<template>
  <div>
    <personal-section />
    <password-section />
    <language-section />
  </div>
</template>

<script>
import PersonalSection from '../components/Profile/PersonalSection.vue';
import PasswordSection from '../components/Profile/PasswordSection.vue';
import LanguageSection from '../components/Profile/LanguageSection.vue';

export default {
  components: { LanguageSection, PasswordSection, PersonalSection },
};
</script>
