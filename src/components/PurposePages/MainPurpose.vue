<template lang="pug">
.container.sectionfive
  LeftBlok
  .sectionfive__container.subcontainer
    h1.sectionfive__title.maintitle Мои цели
    .sectionfive__formcontainer.flex
      .sectionfive__formone
        h2.sectionfive__subtitle На месяц
        ul.sectionfive__list.listreset
          li.sectionfive__listitem.sectionfive__listitemmonth.flex(v-for="el in 10")
            input.sectionfive__inp(v-model="inputmounth" @change="addInMounth")
            .sectionfive__btncontainer.flex(v-if="$store.getters.arrPurposeMounth[el - 1]")
              p.sectionfive__textvalue(:class="{sectionfive__active: $store.getters.arrPurposeMounth[el - 1].done}") {{$store.getters.arrPurposeMounth[el - 1].purpose}}
              button.sectionfive__btngroupdelete.btn(v-if="!$store.getters.arrPurposeMounth[el - 1].done" @click="goto($store.getters.arrPurposeMounth[el - 1].purpose)")
              button.sectionfive__btngroupchange.btn(v-if="!$store.getters.arrPurposeMounth[el - 1].done" @click="okWork($store.getters.arrPurposeMounth[el - 1].purpose)")
              button.sectionfive__delel.btn( @click="delel($store.getters.arrPurposeMounth[el - 1])")
      .sectionfive__formtwo
        h2.sectionfive__subtitle На год
        ul.sectionfive__list
          li.sectionfive__listitem.sectionfive__listitemyear.flex(v-for="el in 10" key="listitemyear")
            input.sectionfive__inp(v-model="inputyear" @change="addInYear")
            .sectionfive__btncontainer.flex(v-if="$store.getters.arrPurposeYear[el - 1]")
              p.sectionfive__textvalue(:class="{sectionfive__active: $store.getters.arrPurposeYear[el - 1].done}") {{$store.getters.arrPurposeYear[el - 1].purpose}}
              button.sectionfive__btngroupdelete.btn(v-if="!$store.getters.arrPurposeYear[el - 1].done" @click="goto($store.getters.arrPurposeYear[el - 1].purpose)")
              button.sectionfive__btngroupchange.btn(v-if="!$store.getters.arrPurposeYear[el - 1].done" @click="okWorkYeaer($store.getters.arrPurposeYear[el - 1].purpose)")
              button.sectionfive__delel.btn( @click="delel($store.getters.arrPurposeYear[el - 1])")
      .sectionfive__formthree
        h2.sectionfive__subtitle На когда-нибудь
        ul.sectionfive__list
          li.sectionfive__listitem.sectionfive__listitemsomeday.flex(v-for="el in 10" key="listitemsomeday")
            input.sectionfive__inp(v-model="inputsomeday" @change="addInSomeday")
            .sectionfive__btncontainer.flex(v-if="$store.getters.arrPurpose[el - 1]")
              p.sectionfive__textvalue(:class="{sectionfive__active: $store.getters.arrPurpose[el - 1].done}") {{$store.getters.arrPurpose[el - 1].purpose}}
              button.sectionfive__btngroupdelete.btn(v-if="!$store.getters.arrPurpose[el - 1].done" @click="goto($store.getters.arrPurpose[el - 1].purpose)")
              button.sectionfive__btngroupchange.btn(v-if="!$store.getters.arrPurpose[el - 1].done" @click="okWorkSomeday($store.getters.arrPurpose[el - 1].purpose)")
              button.sectionfive__delel.btn( @click="delel($store.getters.arrPurpose[el - 1])")
      BaseModal(ref="modal" :text="textvalue" :Yearel="Year" :Mounthel="Mounth" :Somedayel="Someday" )
      BaseModal(ref="modaltwo")
        template(v-slot:title)
          h1.sectionfive__deletetitle Вы действительно хотите удалить дело "{{ this.textvaluetwo }}"" ?
        template(v-slot:body)
          button.sectionfive__deletebtn.btn.yellowbtn(@click="okdelel(delobj)") Удалить
</template>
<script>
import LeftBlok from "../mixins/LeftBlok";
import BaseModal from "../mixins/BaseModal.vue";
export default {
  components: {
    LeftBlok, BaseModal
  },
  data() {
    return {
      done: false,
      textvalue: '',
      textvaluetwo: '',
      delobj: '',
      Year:'',
      Mounth: '',
      Someday: ''
    };
  },
  methods: {
    addInSomeday() {
      this.$store.commit("addPurpose", {
        purpose: this.inputsomeday,
        done: this.done,
      });
      this.inputsomeday = "";
    },
    addInYear() {
      this.$store.commit("addPurposeyear", {
        purpose: this.inputyear,
        done: this.done,
      });
      this.inputyear = "";
    },
    addInMounth() {
      this.$store.commit("addPurposemounth", {
        purpose: this.inputmounth,
        done: this.done,
      });
      this.inputmounth = "";
    },
    // для изменения сделано или нет
    okWork(inputmounth) {
      this.$store.dispatch(
        "togglePurpose",
        this.$store.getters.doneArrpurpose(inputmounth)
      );
      this.isActive = true
    },
    okWorkYeaer(inputmounth) {
      this.$store.dispatch(
        "togglePurposeYear",
        this.$store.getters.doneArrpurposeYear(inputmounth)
      );
    },
    okWorkSomeday(inputmounth) {
      this.$store.dispatch(
        "togglePurposeSomeday",
        this.$store.getters.doneArrpurposeSomeday(inputmounth)

      );
      console.log(inputmounth)
    },
    //

    goto(value) {
      this.textvalue = value
      this.Year = this.$store.getters.arrPurposeYear
      this.Mounth = this.$store.getters.arrPurposeMounth
      this.Someday = this.$store.getters.arrPurpose
this.$refs.modal.show = true

    },

    delel(el) {
      this.$refs.modaltwo.show = true
      this.textvaluetwo = el.purpose
      this.delobj = el
    },
    okdelel(el) {
this.$store.commit('deletePurposeMounth', el)
this.$store.commit('deletePurposeYear', el)
this.$store.commit('deletePurposeSomeday', el)
this.$refs.modaltwo.show = false
    },

  },
};
</script>

<!-- здесь осталось по нажатию на изменение предлагать перенести дело в другие цели или добавить в срочное или в ежедневник -->