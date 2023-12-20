<template lang="pug">
.sectionseven__swipercontainer
  h2.sectionseven__subtitle {{ namber }}
  p.sectionseven__date {{ day }}
  ul.sectionseven__list.listreset
    ListTimeVue(:namber="namber" :day="day" :time="'8:00'" :name= "'eight'")
    ListTimeVue(:namber="namber" :day="day" :time="'9:00'" :name= "'nine'")
    ListTimeVue(:namber="namber" :day="day" :time="'10:00'" :name= "'ten'")
    ListTimeVue(:namber="namber" :day="day" :time="'11:00'" :name= "'eleven'")
    ListTimeVue(:namber="namber" :day="day" :time="'12:00'" :name= "'twelve'")
    ListTimeVue(:namber="namber" :day="day" :time="'13:00'" :name= "'thirteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'14:00'" :name= "'fourteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'15:00'" :name= "'fifteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'16:00'" :name= "'sixteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'17:00'" :name= "'seventeen'")
    ListTimeVue(:namber="namber" :day="day" :time="'18:00'" :name= "'nineteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'19:00'" :name= "'nineteen'")
    ListTimeVue(:namber="namber" :day="day" :time="'20:00'" :name= "'twenty'")
    ListTimeVue(:namber="namber" :day="day" :time="'21:00'" :name= "'twentyone'")
    ListTimeVue(:namber="namber" :day="day" :time="'22:00'" :name= "'twentytwo'")
    ListTimeVue(:namber="namber" :day="day" :time="'23:00'" :name= "'twentythree'")

</template>
<script>
import ListTimeVue from './ListTime.vue';

export default {
  components: {
    ListTimeVue
  },
  data() {
return {

}
  },
  props: ["namber", "day"],


};
</script>

