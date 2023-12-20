<template lang="pug">
.modal( v-if="show")
  .modal__dark
    slot(name="head")
      button.modal__closem.btn(@click="close") x
      button.modal__backbtn.yellowbtn(@click="back" v-if="shoebtnback") Назад
    slot(name="title")
      .modal__containertext.flex
        p.modal__title Переместить дело
        p.modal__work "{{ text }}"
    slot(name="body")
      .modal__body.flex
          .modal__urgent
            button.btn.modal__goto.yellowbtn(@click="opengoto" v-if="urgentmatters") Срочные дела
            .modal__errcontainer.flex(v-if="opengotobtn")
              label.modal__label(for="datamask") Срок
              input.modal__input(:class="{errinp : this.errInp}" id="datamask" type="text" v-model="timeTo" v-maska data-maska="####.##.##" placeholder="2023.09.27")
              input.modal__btnok.btn.yellowbtn(type="button" value="добавить" @click="goto")
            p.modal__err(v-if="this.errInp") Ведите корректные данные
            p.modal__err(v-if="errlength") Слишком много срочных дел
            p.modal__err(v-if="erryear") Срочное дело должно быть в пределах года
          button.btn.modal__goto.yellowbtn(@click="gototarget" v-if="mygoals") Мои цели
          .modal__btnscontainer(v-if="target")
            button.btn.modal__gotovariable.yellowbtn( @click="gotomonth" v-if="month") Мои цели на месяц
            p.modal__errmaxlength(v-if="maxlengthmount") Цели на месяц переполненны, удалите менее важное
            button.btn.modal__gotovariable.yellowbtn( @click="gotoyear" v-if="year") Мои цели на год
            p.modal__errmaxlength(v-if="maxlengthyear") Цели на год переполненны, удалите менее важное
            button.btn.modal__gotovariable.yellowbtn( @click="gotosomeday" v-if="someday") Мои цели когда-нибудь
            p.modal__errmaxlength(v-if="maxlengthsomeday") Цели на когда-нибудь переполненны, удалите менее важное
          button.btn.modal__goto.yellowbtn(@click="gototodolist" v-if="btntodolist") Ежедневник
          p.modal__err(v-if="this.errInptodolist") {{ errtexttodolist }}
          form.modal__errcontainer.flex(v-if="gototdolist")
            .modal__gotocontainer
              .modal__gotocontainerdate.flex
                label.modal__label.modal__labeltodolist(for="labeltodo") На какое число
                input.modal__input.modal__inputtodolist(:class="{errinp : this.errInptodolist}" ref="nextinpel" @input="nextinp" id="labeltodotime" type="text" v-model="tdolist"  v-maska data-maska="####.##.##" placeholder="2023.09.27")
              .modal__gotocontainertime.flex
                label.modal__label.modal__labeltodolist(for="labeltodotime") На какое время
                input.modal__input.modal__inputtodolist(:class="{errinp : this.errInptodolist}" ref="nextinpeltwo" type="text" v-model="timegototodolist"  v-maska data-maska="##:00" placeholder="20:00")
            input.modal__btnok.yellowbtn(type="button" value="добавить" @click="addtodolist")
    slot(name="footer")
</template>
<script>
import { vMaska } from "maska";
export default {
  directives: { maska: vMaska },
  props: ["valueday", "valuetime", "text", "Yearel", "Mounthel", "Somedayel"],
  name: "BaseModal",

  data() {
    return {
      show: false,
      errInp: false,
      opengotobtn: false,
      target: false,
      urgentmatters: true,
      mygoals: true,
      gototdolist: false,
      btntodolist: true,
      shoebtnback: false,
      errInptodolist: false,
      errtexttodolist: "",
      maxlengthmount: false,
      maxlengthyear: false,
      maxlengthsomeday: false,
      errlength: false,
      erryear: false,
      someday: true,
      month: true,
      year: true,
    };
  },
  methods: {
    close() {
      this.show = false;
      this.errInp = false;
      (this.opengotobtn = false),
        (this.target = false),
        (this.urgentmatters = true),
        (this.mygoals = true);
      this.gototdolist = false;
      this.btntodolist = true;
      this.timegototodolist = "";
      this.tdolist = "";
      this.timeTo = "";
      (this.errInptodolist = false),
        (this.errlength = false),
        (this.erryear = false);
      (this.someday = true), (this.month = true), (this.year = true);
    },
    back() {
      this.opengotobtn = false;
      this.target = false;
      this.gototdolist = false;
      this.urgentmatters = true;
      this.mygoals = true;
      this.btntodolist = true;
      this.shoebtnback = false;
      this.errInptodolist = false;
      this.errInp = false;
      this.errlength = false;
      this.timeTo = false;
      this.erryear = false;
      (this.someday = true), (this.month = true), (this.year = true);
    },
    goto() {
      if (
        isNaN(new Date(this.timeTo).getDate()) ||
        new Date().getTime() > new Date(`${this.timeTo}`).getTime() === true
      ) {
        this.errInp = true;
      } else if (this.$store.state.urgent.length > 12) {
        this.errlength = true;
        setTimeout(() => {
          this.errlength = false;
        }, "3000");
      } else if (+this.timeTo.split(".")[0] > new Date().getFullYear() + 1) {
        this.erryear = true;
        setTimeout(() => {
          this.erryear = false;
        }, "3000");
      } else {
        this.$store.commit("addUrgent", {
          case: this.text,
          timeTo: this.timeTo,
          done: false,
        });
        this.show = false;
        this.timeTo = "";

        this.$store.commit(
          "deleteElTodolist",
          this.$store.getters.doneArr(this.valueday, this.valuetime)
        );
        if (this.$store.getters.doneArrYear(this.text)) {
          this.$store.commit(
            "deletePurposeYear",
            this.$store.getters.doneArrYear(this.text)
          );
        }
        if (this.$store.getters.doneArrSomeday(this.text)) {
          this.$store.commit(
            "deletePurposeSomeday",
            this.$store.getters.doneArrSomeday(this.text)
          );
        }
        if (this.$store.getters.doneArrMounth(this.text)) {
          this.$store.commit(
            "deletePurposeMounth",
            this.$store.getters.doneArrMounth(this.text)
          );
        }

        this.show = false;
        this.errInp = false;
        this.errInptodolist = false;
        (this.opengotobtn = false),
          (this.target = false),
          (this.urgentmatters = true),
          (this.mygoals = true);
        this.gototdolist = false;
        this.btntodolist = true;
      }
    },
    gototarget() {
      this.target = true;
      this.urgentmatters = false;
      this.btntodolist = false;
      this.shoebtnback = true;

      for(let i =0; i< this.Yearel.length; i++) {
        if(this.Yearel[i].purpose == this.text) {
          this.year = false
        }
      }
      for (let i = 0; i < this.Mounthel.length; i++) {
        if (this.Mounthel[i].purpose == this.text) {
          this.month = false;
        }
      }
      for (let i = 0; i < this.Somedayel.length; i++) {
        if (this.Somedayel[i].purpose == this.text) {
          this.someday = false;
        }
      }
    },
    gotomonth() {
      if (this.$store.state.purposemounth.length > 9) {
        this.maxlengthmount = true;
        setTimeout(() => {
          this.maxlengthmount = false;
        }, "3000");
      } else {
        this.$store.commit("addMonth", {
          purpose: this.text,
          done: false,
        });
        if (this.$store.getters.doneArrUrgent(this.text, this.valuetime)) {
          this.$store.commit(
            "deleteElUrgenty",
            this.$store.getters.doneArrUrgent(this.text, this.valuetime)
          );
        }
        if (this.$store.getters.doneArr(this.valueday, this.valuetime)) {
          this.$store.commit(
            "deleteElTodolist",
            this.$store.getters.doneArr(this.valueday, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrYear(this.text)) {
          this.$store.commit(
            "deletePurposeYear",
            this.$store.getters.doneArrYear(this.text)
          );
        }
        if (this.$store.getters.doneArrSomeday(this.text)) {
          this.$store.commit(
            "deletePurposeSomeday",
            this.$store.getters.doneArrSomeday(this.text)
          );
        }
        this.show = false;
        this.errInp = false;
        this.errInptodolist = false;
        (this.opengotobtn = false),
          (this.target = false),
          (this.urgentmatters = true),
          (this.mygoals = true);
        this.gototdolist = false;
        this.btntodolist = true;
      }
      (this.someday = true), (this.month = true), (this.year = true);
    },
    gotoyear() {
      if (this.$store.state.purposeyear.length > 9) {
        this.maxlengthyear = true;
        setTimeout(() => {
          this.maxlengthyear = false;
        }, "3000");
      } else {
        this.$store.commit("addYear", {
          purpose: this.text,
          done: false,
        });
        if (this.$store.getters.doneArr(this.valueday, this.valuetime)) {
          this.$store.commit(
            "deleteElTodolist",
            this.$store.getters.doneArr(this.valueday, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrUrgent(this.text, this.valuetime)) {
          this.$store.commit(
            "deleteElUrgenty",
            this.$store.getters.doneArrUrgent(this.text, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrMounth(this.text)) {
          this.$store.commit(
            "deletePurposeMounth",
            this.$store.getters.doneArrMounth(this.text)
          );
        }
        if (this.$store.getters.doneArrSomeday(this.text)) {
          this.$store.commit(
            "deletePurposeSomeday",
            this.$store.getters.doneArrSomeday(this.text)
          );
        }
        this.show = false;
        this.errInp = false;
        this.errInptodolist = false;
        (this.opengotobtn = false),
          (this.target = false),
          (this.urgentmatters = true),
          (this.mygoals = true);
        this.gototdolist = false;
        this.btntodolist = true;
      }
      (this.someday = true), (this.month = true), (this.year = true);
    },
    gotosomeday() {
      if (this.$store.state.purposesomeday.length > 9) {
        this.maxlengthsomeday = true;
        setTimeout(() => {
          this.maxlengthsomeday = false;
        }, "3000");
      } else {
        this.$store.commit("addSomeday", {
          purpose: this.text,
          done: false,
        });

        if (this.$store.getters.doneArrUrgent(this.text, this.valuetime)) {
          this.$store.commit(
            "deleteElUrgenty",
            this.$store.getters.doneArrUrgent(this.text, this.valuetime)
          );
        }
        if (this.$store.getters.doneArr(this.valueday, this.valuetime)) {
          this.$store.commit(
            "deleteElTodolist",
            this.$store.getters.doneArr(this.valueday, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrMounth(this.text)) {
          this.$store.commit(
            "deletePurposeMounth",
            this.$store.getters.doneArrMounth(this.text)
          );
        }
        if (this.$store.getters.doneArrYear(this.text)) {
          this.$store.commit(
            "deletePurposeYear",
            this.$store.getters.doneArrYear(this.text)
          );
        }
        this.show = false;
        this.errInp = false;
        this.errInptodolist = false;
        (this.opengotobtn = false),
          (this.target = false),
          (this.urgentmatters = true),
          (this.mygoals = true);
        this.gototdolist = false;
        this.btntodolist = true;
      }
      (this.someday = true), (this.month = true), (this.year = true);
    },
    gototodolist() {
      this.gototdolist = true;
      this.mygoals = false;
      this.urgentmatters = false;
      this.shoebtnback = true;
    },
    addtodolist() {
      if (isNaN(new Date(this.tdolist).getDate())) {
        this.errInptodolist = true;
        this.errtexttodolist = "Данной даты не существует";
      } else if (
        +this.timegototodolist.split(":")[0] > 23 === true ||
        +this.timegototodolist.split(":")[0] < 8 === true
      ) {
        this.errInptodolist = true;
        this.errtexttodolist = "Выберете время с 8-00 до 23-00";
      } else if (
        new Date().getTime() >
          new Date(`${this.tdolist} ${this.timegototodolist}`).getTime() ===
        true
      ) {
        this.errInptodolist = true;
        this.errtexttodolist = "Эта дата уже прошла";
      } else if (
        this.$store.state.Work.filter(
          (el) =>
            el.day ===
              `${this.tdolist.split(".")[2]}.${this.tdolist.split(".")[1]}` &&
            el.time === this.timegototodolist
        ).length > 0
      ) {
        this.errInptodolist = true;
        this.errtexttodolist = "На это время и день уже есть дело";
      } else {
        this.$store.commit("addTodoDay", {
          day: `${this.tdolist.split(".")[2]}.${this.tdolist.split(".")[1]}`,
          time: this.timegototodolist,
          textvalue: this.text,
          donevalue: false,
        });

        if (this.$store.getters.doneArr(this.valueday, this.valuetime)) {
          this.$store.commit(
            "deleteElTodolist",
            this.$store.getters.doneArr(this.valueday, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrUrgent(this.text, this.valuetime)) {
          this.$store.commit(
            "deleteElUrgenty",
            this.$store.getters.doneArrUrgent(this.text, this.valuetime)
          );
        }
        if (this.$store.getters.doneArrMounth(this.text)) {
          this.$store.commit(
            "deletePurposeMounth",
            this.$store.getters.doneArrMounth(this.text)
          );
        }
        if (this.$store.getters.doneArrYear(this.text)) {
          this.$store.commit(
            "deletePurposeYear",
            this.$store.getters.doneArrYear(this.text)
          );
        }
        if (this.$store.getters.doneArrSomeday(this.text)) {
          this.$store.commit(
            "deletePurposeSomeday",
            this.$store.getters.doneArrSomeday(this.text)
          );
        }
        this.show = false;
        this.errInp = false;
        this.errInptodolist = false;
        (this.opengotobtn = false),
          (this.target = false),
          (this.urgentmatters = true),
          (this.mygoals = true);
        this.gototdolist = false;
        this.btntodolist = true;
        this.timegototodolist = "";
        this.tdolist = "";
      }
    },
    opengoto() {
      this.opengotobtn = true;
      this.mygoals = false;
      this.btntodolist = false;
      this.shoebtnback = true;
    },
    nextinp() {
      if (this.$refs.nextinpel.value.split("").length === 10) {
        this.$refs.nextinpeltwo.focus();
      }
    },
  },
  beforeUpdate() {
    if (window.location.href.toString().indexOf("MainUrgently") > 0) {
      this.urgentmatters = false;
    }
  },
};
</script>

<!-- при вводе в добавить в ежедневник если добавляется 0 перед месяцем, то все ломается, для отображения в ежедневнике ноль мешает нужно сделать чтобы игнорировался -->
