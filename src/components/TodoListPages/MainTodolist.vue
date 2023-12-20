<template lang="pug">
.container.sectionseven
  LeftBlok
  .sectionseven__container.subcontainer
    swiper(class="sectionseven__swiper" :navigation="true" :space-between="30" :slides-per-view="1"  :grid="{rows: 2}" :direction="'vertical'" :modules='modules')
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Понедельник'" :day="day[0]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Вторник'" :day="day[1]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Среда'" :day="day[2]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Четверг'" :day="day[3]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Пятница'" :day="day[4]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Суббота'" :day="day[5]")
      swiper-slide.sectionseven__slide
        NoteBook(:namber="'Воскресенье'" :day="day[6]")
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Navigation, Grid } from "swiper/modules";
import LeftBlok from "../mixins/LeftBlok";
import NoteBook from "./NoteBook";
export default {
  data() {
    return {};
  },
  components: {
    Swiper,
    SwiperSlide,
    LeftBlok,
    NoteBook,
  },
  computed: {
    day() {
      let arr = [];
      let day = new Date().getDay();

      function allDate(tomorrow, a) {
        tomorrow.setDate(tomorrow.getDate() - (day - a));

        if(tomorrow.getDate().toString().split('').length < 2) {
          arr.push(`0${tomorrow.getDate()}.${tomorrow.getMonth()+ 1}`);
        }
        else {
          arr.push(`${tomorrow.getDate()}.${tomorrow.getMonth()+ 1}`);
        }

      }
      for (let a = 1; a <= 7; a++) {
        allDate(new Date(), a);
      }

      return arr;
    },
  },
  setup() {
    return {
      modules: [Navigation, Grid],
    };
  },
};
</script>
