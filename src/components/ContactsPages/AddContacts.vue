<template lang="pug">
.container.sectionthree
  LeftBlok
  .sectionthree__container.subcontainer
    h1.sectionthree__title.maintitle Новый контакт
    .sectionthree__formcontainer.formcontainer
      form(class="sectionthree__form").pagemin.flex
        div.containerlabel(class="sectionthree__containerlabel").flex
          label.formlabel(class="sectionthree__label" for="name") Имя
          input.forminput( oninput="this.value=this.value.replace(/[^a-zA-Z, ' ', а-яА-Я]/g,'');" class="sectionthree__input" id="name" placeholder="Например «Андрей»..." v-model="name")
          p.form__err(v-if="errName") {{ errNametext }}
        div.containerlabel(class="sectionthree__containerlabel").flex
          label.formlabel(class="sectionthree__label"  for="tel") Телефон
          input.forminput(class="sectionthree__input" id="tel" placeholder="+7(___)-___-__-__" v-model="tel" v-maska data-maska="+7 - ### - ### - ## - ##")
          p.form__err(v-if="errTel") {{ errTeltext }}
        div.containerlabel(class="sectionthree__containerlabel").flex
          label.formlabel(class="sectionthree__label"  for="email") E-mail
          input.forminput(class="sectionthree__input" id="email" placeholder="Например «pochta@domain.ru»..." v-model="email")
          p.form__err(v-if="errEmail") {{ errEmailtext }}
        div.containerlabel(class="sectionthree__containerlabel").flex
          p.formlabel(class="sectionthree__label") Категория
          SelectBase(:ids="'selectCustom3'" @updateParent="onUpdateSalary")
          p.form__err(v-if="errCategory") {{ errCategorytext }}
        div.containerbtn.flex
          input(:class="{sectionthree__adddel: this.$router.currentRoute.value.params.name === '-'}" class="sectionthree__add sectionthree__btn yellowbtn btn" type="button" value="Добавить" @click="savenewContacts")
          input(v-if="this.$router.currentRoute.value.params.name !== '-' " :class="{sectionthree__del: this.$router.currentRoute.value.params.name !== '-'}" class=" sectionthree__btn yellowbtn btn" type="button" value="Удалить" @click="deleteContacts")
</template>
<script>
import { vMaska } from "maska";
import Choices from "choices.js";
import LeftBlok from "../mixins/LeftBlok";
import SelectBase from "./SelectBase.vue";
export default {
  directives: { maska: vMaska },
  components: {
    LeftBlok,
    SelectBase,
  },
  data() {
    return {
      name: "",
      tel: "",
      email: "",
      categories: "",
      errName: false,
      errTel: false,
      errEmail: false,
      errCategory: false,
    };
  },

  methods: {
    onUpdateSalary(someData) {
      this.categories = someData.idvalue;
    },
    savenewContacts() {
      this.$store.commit('deleteContactss',
      this.$store.getters.doneContacts(this.$router.currentRoute.value.params.name, this.$router.currentRoute.value.params.tel, this.$router.currentRoute.value.params.mail))
      const expression =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (this.name === "") {
        this.errName = true;
        this.errNametext = "Введите имя";

        this.errTel = false;
        this.errEmail = false;
        this.errCategory = false;
      } else if (this.tel === "" || this.tel.split("").length < 24) {
        this.errTel = true;
        this.errTeltext = "Введите телефон";

        this.errName = false;
        this.errEmail = false;
        this.errCategory = false;
      } else if (expression.test(String(this.email).toLowerCase()) === false) {
        this.errEmail = true;
        this.errEmailtext = "Введите корректный email";

        this.errName = false;
        this.errTel = false;
        this.errCategory = false;
      } else if (this.categories === "") {
        this.errCategory = true;
        this.errCategorytext = "Выберите категорию";

        this.errName = false;
        this.errTel = false;
        this.errEmail = false;
      } else {

        this.$store.commit("addContacts", {
          names: this.name,
          teles: this.tel,
          emailles: this.email,
          categories: this.categories,
          create: `${new Date().getDate()}.${
            new Date().getMonth() + 1
          }.${new Date().getFullYear().toString().split('')[2]}${new Date().getFullYear().toString().split('')[3]}`,
        });

        this.name = "";
        (this.tel = ""), (this.email = ""), (this.categories = "");
        this.$router.go(-1);
        this.errName = false;
        this.errTel = false;
      }
    },
    deleteContacts() {
      this.$store.commit('deleteContactss',
      this.$store.getters.doneContacts(this.name, this.tel, this.email))
      this.$router.go(-1);
    }
  },

  mounted() {
    const selectElement3 = document.querySelector("#selectCustom3");
    new Choices(selectElement3, {
      searchEnabled: false,
      itemSelectText: "",
    });

    if (this.$router.currentRoute.value.params.name !== "-") {
      this.name = this.$router.currentRoute.value.params.name;
      this.tel = this.$router.currentRoute.value.params.tel;
      this.email = this.$router.currentRoute.value.params.mail;
      this.categories = this.$router.currentRoute.value.params.category;
    }
  },
};
</script>
