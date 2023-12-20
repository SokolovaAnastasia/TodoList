<template lang="pug">
.container.sectioneight
  LeftBlok
  .sectioneight__container.subcontainer
    h1.sectioneight__title.maintitle Мои мысли
    .sectioneight__thoughts.flex
      p.sectioneight__text {{ mounth }} {{ day}}
      form.sectioneight__form(action="#")
        textarea.sectioneight__textarea.sectioneight__textarea(v-model="textvalue")
        input.sectioneight__btn.yellowbtn.btn(type="button" value="добавить" @click="savetext")
      MonthsComponent
</template>
<script>
import MonthsComponent from "./MonthsComponent";
import LeftBlok from "../mixins/LeftBlok";
export default {
  data() {
    return {
      clas: "sectioneight",
      day: "",
      mounth: "",
      textvalue: "Дорогой дневник ,",
     mountharr: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ]
    };
  },
  components: {
    MonthsComponent,
    LeftBlok,
  },
  methods: {
    savetext() {

      this.$store.commit("addThoughts", {
        newThoughts: this.textvalue,
        newdatehoughts: `${new Date().getDate()}.${
          new Date().getMonth() + 1
        }.${new Date().getFullYear()}`,
        newtimetehoughts: `${new Date().getHours()}:${new Date().getMinutes()}`
      });
      this.textvalue = 'Дорогой дневник ,'
    },
  },
  created() {
    this.day = new Date().getDate();
    for (let i = 0; i < 13; i++) {
      if (new Date().getMonth() === i) {
        this.mounth = this.mountharr[i];
      }
    }
  },
};
</script>
