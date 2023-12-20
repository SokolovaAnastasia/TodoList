<template lang="pug">
.container.sectionzero(v-if="!$store.state.person[0]")
  .sectionzero__subcontainer
    h1.sectionzero__title Я рада приветствовать Вас. Здесь вы можете:
    ul.sectionzero__list.listreset
      li.sectionzero__listitem составлять списки дел на день, на месяц, на год и даже на “когда-нибудь”
      li.sectionzero__listitem составлять список срочных дел
      li.sectionzero__listitem записывать свои мысли
      li.sectionzero__listitem хранить номера телефонв и почту Ваших  знакомых
      li.sectionzero__listitem вести календарь
    h2.sectionzero__subtitle Давайте познакомимся
    input.sectionzero__input(type="text" placeholder="например, “Анастасия”" v-model="names")
    router-link(:to="{name: 'PageOne'}")
      input(type="button" value="Сохранить" @click="addname").sectionzero__btn.btn.yellowbtn
PageOne(v-else)

</template>
<script>
import PageOne from './PageOne.vue'

export default {
  data() {
    return {
      names: "",
    };
  },
  components: {
    PageOne
  },
  methods: {
    addname() {
      this.$store.commit("addPers", {
        names: this.names,
      });

    },
  },
  // created() {
  //   this.$store.commit("delete")
  // }

};
</script>
