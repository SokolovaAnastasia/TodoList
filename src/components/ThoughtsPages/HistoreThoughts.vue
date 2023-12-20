<template lang="pug">
.container.sectionnine
  LeftBlok
  .sectionnine__container.subcontainer
    h1.sectionnine__title.maintitle Мои мысли
    router-link(:to="{name: 'MainThoughts'}")
      button.btn.blackbtn.sectionnine__create Создать новую мысль
    h2.sectionnine__subtitle {{this.$router.currentRoute._rawValue.params.mounth }}
    .sectionnine__subkontainer.flex
      .sectionnine__left
        p.sectionnine__text(v-if="this.$store.getters.needTo(this.$router.currentRoute._rawValue.params.mounthnumber) == ''") В этом месяце Вы не делились мыслями
        ul.sectionnine__btnlist.listreset.flex
          li.sectionnine__btnlistitem(v-for="item in this.$store.getters.needTo(this.$router.currentRoute._rawValue.params.mounthnumber)" key="this.$router.currentRoute._rawValue.params.mounthnumber")
            button.sectionnine__btn.btn(@click="showModal(item)") {{ `${item.newdatehoughts.split('.')[0]}.${item.newdatehoughts.split('.')[1]}  ${item.newtimetehoughts}` }}
      BaseModalVue(ref="modal")
        template(v-slot:title)
          h3.modal__thoughttitle Ваши мысли {{ this.date  }} в {{ this.time }}
        template(v-slot:body)
          .modal__thoughttextaria
            p.modal__thoughttext {{ this.valueTextaria }}
      MonthsComponent

</template>
<script>
import BaseModalVue from "../mixins/BaseModal.vue";
import MonthsComponent from "./MonthsComponent";
import LeftBlok from "../mixins/LeftBlok";
export default {
  data() {
return {
  date: '',
  valueTextaria: '',
  time: ''
}
  },
components: {
    MonthsComponent, LeftBlok, BaseModalVue
},
methods: {
  showModal(item) {
      this.$refs.modal.show = true;
this.date = item.newdatehoughts
this.valueTextaria = item.newThoughts
this.time = item.newtimetehoughts
    },
},

}

// нужно при клике на кнопку с числом открывать блокнот с текстом который написан этого числа
</script>