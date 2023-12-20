<template  lang="pug">
.container.sectiontwo
  LeftBlok
  .sectiontwo__container.subcontainer
    h1.sectiontwo__title.maintitle Мои контакты
    .sectiontwo__containerselects.flex
      SelectBase(:ids="'selectCustom1'"  @updateParent="onUpdateSalary")
      select.sectiontwo__select(select-one name="select2" id="selectCustom2" data-type="select-one" v-model="dateName")
        option.sectiontwo__opt(value="Date") По дате
        option.sectiontwo__opt(value="Name") По имени
      router-link(:to="{name: 'AddContacts', params: {name: '-', tel: '-', mail: '-', category: '-'} }")
        button.sectiontwo__btn.btn Добавить контакт
    .sectiontwo__tablecontainer
      table.sectiontwo__table
        tr.sectiontwo__trth
          th.sectiontwo__th.contact
            p.sectiontwo__text КОНТАКТ
          th.sectiontwo__th.telefon
            p.sectiontwo__text ТЕЛЕФОН
          th.sectiontwo__th.email
            p e-mail
          th.sectiontwo__th.create
            p.sectiontwo__text создан
        tr(v-for="el in this.$store.state.contacts" v-if="this.categories === 'Relatives'" @click="this.$router.push({ name: 'AddContacts', params: {name: el.names, tel: el.teles, mail: el.emailles, category: el.categories} })")
          td(v-if="el.categories === 'Relatives'").sectiontwo__td.contact
            span.sectiontwo__span А
            span.sectiontwo__text {{ el.names }}
          td(v-if="el.categories === 'Relatives'").sectiontwo__td.telefon {{ el.teles }}
          td.sectiontwo__td.email(v-if="el.categories === 'Relatives'") {{ el.emailles }}
          td.sectiontwo__td.create(v-if="el.categories === 'Relatives'") {{ el.create }}
        tr(v-for="el in this.$store.state.contacts" v-else-if="this.categories === 'Colleaguesl'" @click="this.$router.push({ name: 'AddContacts', params: {name: el.names, tel: el.teles, mail: el.emailles, category: el.categories} })")
          td(v-if="el.categories === 'Colleaguesl'").sectiontwo__td.contact
            span.sectiontwo__span А
            span.sectiontwo__text {{ el.names }}
          td(v-if="el.categories === 'Colleaguesl'").sectiontwo__td.telefon {{ el.teles }}
          td.sectiontwo__td.email(v-if="el.categories === 'Colleaguesl'") {{ el.emailles }}
          td.sectiontwo__td.create(v-if="el.categories === 'Colleaguesl'") {{ el.create }}
        tr(v-for="el in this.$store.state.contacts" v-else-if="this.categories === 'Familiar'" @click="this.$router.push({ name: 'AddContacts', params: {name: el.names, tel: el.teles, mail: el.emailles, category: el.categories} })")
          td(v-if="el.categories === 'Familiar'").sectiontwo__td.contact
            span.sectiontwo__span А
            span.sectiontwo__text {{ el.names }}
          td(v-if="el.categories === 'Familiar'").sectiontwo__td.telefon {{ el.teles }}
          td.sectiontwo__td.email(v-if="el.categories === 'Familiar'") {{ el.emailles }}
          td.sectiontwo__td.create(v-if="el.categories === 'Familiar'") {{ el.create }}
        tr.sectiontwo__trtd(v-else v-for="el in this.$store.state.contacts" @click="this.$router.push({ name: 'AddContacts', params: {name: el.names, tel: el.teles, mail: el.emailles, category: el.categories} })")
          td.sectiontwo__td.contact
            span.sectiontwo__span {{ letter(el.names) }}
            span.sectiontwo__text {{ el.names }}
          td.sectiontwo__td.telefon {{ el.teles }}
          td.sectiontwo__td.email {{ el.emailles }}
          td.sectiontwo__td.create {{ el.create }}


</template>
<script>
import Choices from 'choices.js';
import LeftBlok from '../mixins/LeftBlok';
import SelectBase from './SelectBase.vue';
export default {
  data() {
  return {
 categories: '',
 dateName: ''
  }

  },
  components: {
    LeftBlok, SelectBase
  },
  methods: {
    onUpdateSalary(someData) {
      this.categories = someData.idvalue
    },
    letter(letters) {
return letters.split('')[0].toUpperCase()
    }

  },
  watch: {
    dateName(newValue) {

      if(newValue === 'Name') {
 this.$store.commit('changeSubsequenceName')
      }
      if(newValue === 'Date') {
 this.$store.commit('changeSubsequenceDate')
      }

      // здесь осталось сделать сортиовку по дате и имение
    }
  },
  mounted() {
const selectElement = document.querySelector('#selectCustom1');
new Choices(selectElement, {
  searchEnabled: false,
    itemSelectText: '',
});
const selectElement2 = document.querySelector('#selectCustom2');
new Choices(selectElement2, {
  searchEnabled: false,
    itemSelectText: '',
});
  }
}
</script>