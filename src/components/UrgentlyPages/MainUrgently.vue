<template lang="pug">
.container.sectionten
  LeftBlok
  .sectionten__container.subcontainer
    h1.sectionten__title.maintitle Срочные дела
    .sectionten__subkontainer
      p.sectionten__nourgently(v-if="this.$store.state.urgent == ''") У Вас пока нет срочных дел
      ul.sectionten__list
        li.sectionten__listitem.flex(v-for="el in this.$store.state.urgent")
          p.sectionten__text(:class="{overdue: new Date().getTime() > new Date(`${el.timeTo}`).getTime() === true}, {sectionten__active: el.done}" ) {{ el.case  }}
          p.sectionten__span(:class="{overdue: new Date().getTime() > new Date(`${el.timeTo}`).getTime() === true}") До {{ el.timeTo  }}
          .sectionseven__btncontainer
            button.sectionseven__change.btn(v-if="(!el.done)" @click="showModal(el)")
            button.sectionseven__delet.btn(v-if="(!el.done)" @click="doneEl(el)")
            button.sectionseven__fully.btn( @click="deletes(el)")
        BaseModal(ref="modalone" :text="this.textel" :valuetime="this.timeto")
    button.sectionten__btn.yellowbtn(@click="showModalTwo") добавить
BaseModal(ref="modalTwo")
  template(v-slot:head)
    button.modal__closem.btn(@click="close") x
  template(v-slot:title)
    h3.sectionten__formtitle Добавить срочное дело
  template(v-slot:body)
    form.sectionten__form.flex
      input.sectionten__forminput(type="text" v-model="urgenttextadd" maxlength="30")
      label.sectionten__label(for="date") На какое число
      input.sectionten__forminput(id="date" type="text" v-model="urgentdateadd" v-maska data-maska="####.##.##" placeholder="2023.09.27")
      p.sectionten__err(v-if="err") Введите корректную дату
      p.sectionten__err(v-if="errlength") Слишком много срочных дел
      p.sectionten__err(v-if="erryear") Срочное дело должно быть в пределах года
      input.sectionten__formadd.yellowbtn(type="button" value="Добавить" @click="createurgent")
BaseModal(ref="modalThree")
  template(v-slot:title)
    h1.modal__deletetitle Вы действительно хотите удалить дело "{{ element.case }}" ?
  template(v-slot:body)
    button.modal__deletebtn.yellowbtn.btn(@click="okdelel(element)") Удалить
</template>
<script>
import { vMaska } from "maska";
import BaseModal from "../mixins/BaseModal.vue";
import LeftBlok from "../mixins/LeftBlok";
export default {
  directives: { maska: vMaska },
  components: {
    LeftBlok,
    BaseModal,
  },
  data() {
    return {
      err: false,
      errlength: false,
      textel: "",
      timeto: "",
      element: '',
      erryear: false
    };

  },
  methods: {
    close() {
      this.$refs.modalTwo.show = false;
      this.err = false;
      this.errlength = false;
      this.rryear= false
      this.urgentdateadd = "";
      this.urgenttextadd = "";
    },
    showModalTwo() {
      this.$refs.modalTwo.show = true;
    },
    createurgent() {
      if (
        isNaN(new Date(this.urgentdateadd).getDate()) === true ||
        new Date().getTime() > new Date(`${this.urgentdateadd}`).getTime() === true

      ) {
        this.err = true;
      }
     else if (this.$store.state.urgent.length > 12) {
        this.errlength = true;
        setTimeout(() => {
          this.errlength = false;
        }, "3000");
      }
else if(+this.urgentdateadd.split('.')[0] > new Date().getFullYear() + 1) {
  this.erryear = true;
        setTimeout(() => {
          this.erryear = false;
        }, "3000");
}
      else {
        this.$store.commit("addUrgent", {
          case: this.urgenttextadd,
          timeTo: this.urgentdateadd,
        });
        this.urgenttextadd = "";
        this.urgentdateadd = "";
        this.$refs.modalTwo.show = false;
        this.err = false;
      }
    },
    showModal(el) {
      this.$refs.modalone.show = true;
      this.textel = el.case;
      this.timeto = el.timeTo;
    },
    doneEl(el) {
      this.$store.dispatch(
        "toggleUrgently",
        this.$store.getters.doneArrUrgently(el.case)
      );
    },
    deletes(el) {
      this.element = el
     this.$refs.modalThree.show = true;

    },
    okdelel(el) {
      this.$store.commit("deleteElUrgenty", el);
      this.$refs.modalThree.show = false;
    },
  },
};
</script>
