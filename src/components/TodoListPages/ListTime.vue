<template lang="pug">
li.sectionseven__listitem.flex
  label(:for= "name").sectionseven__time {{this.time}}
  input.sectionseven__input(maxlength="25" type="text" :id= "name" @change="changeInp" v-model="inpValue")
  div.sectionseven__btncontainer.flex(v-if="this.$store.getters.doneArr(this.day, this.time)")
    p.sectionseven__text( :class="{ sectionseven__inputdelet: this.$store.getters.doneArr(this.day, this.time).donevalue}") {{ this.$store.getters.doneArr(this.day, this.time).textvalue }}
    button.sectionseven__change.btn(v-if="!this.$store.getters.doneArr(this.day, this.time).donevalue"  @click="showModal")
    button.sectionseven__delet.btn(v-if="!this.$store.getters.doneArr(this.day, this.time).donevalue" @click="toggle()")
    button.sectionseven__fully.btn( @click="fully()")
BaseModalVue(ref="modal" :valueday="this.day" :valuetime="this.time" :text="this.text")
BaseModalVue(ref="modaltwo")
  template(v-slot:title)
    h1.modal__deletetitle Вы действительно хотите удалить дело "{{ textvaluetwo.textvalue }}" ?
  template(v-slot:body)
    button.modal__deletebtn.yellowbtn.btn(@click="okdelel") Удалить
</template>
<script>
import BaseModalVue from "../mixins/BaseModal.vue";
export default {
  components: {
    BaseModalVue,
  },
  data() {
    return {
      isActive: false,
      donevalue: false,
      textvaluetwo: "",
      delobj: "",
    };
  },
  props: ["namber", "day", "time", "name"],
  methods: {
    changeInp() {
      this.$store.commit("addTodoDay", {
        day: this.day,
        time: this.time,
        textvalue: this.inpValue,
        donevalue: this.isActive,
      });
      this.inpValue = "";
    },
    delet() {
      this.isActive = true;
      return "lll";
    },
    toggle() {
      this.$store.dispatch(
        "toggleTodo",
        this.$store.getters.doneArrindex(this.day, this.time)
      );
      this.isActive = true;
      this.inpValue = "";
    },
    showModal() {
      this.$refs.modal.show = true;
    },
    fully() {
      this.$refs.modaltwo.show = true;
      this.textvaluetwo = this.$store.getters.doneArr(this.day, this.time);
    },
    okdelel() {
      this.$store.commit(
        "deleteElTodolist",
        this.$store.getters.doneArr(this.day, this.time)
      );
      this.$refs.modaltwo.show = false;
    },
  },
  computed: {
    text() {
      if (this.$store.getters.doneArr(this.day, this.time) !== undefined) {
        return this.$store.getters.doneArr(this.day, this.time).textvalue;
      }
      return "";
    },
  },
};
</script>
