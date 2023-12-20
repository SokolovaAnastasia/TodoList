<template lang="pug">
section.leftblok.flex
  .leftblok__top
    .leftblok__btns.flex
      router-link(:to="{name: 'MainTodolist'}" class="button leftblok__btnleft btn link") ежедневник
      router-link(:to="{name: 'MainThoughts'}" class="button leftblok__btnleft btn link" :class="{'router-link-active': activeclass}") мои мысли
      router-link(:to="{name: 'MainAlmanac'}" class="button leftblok__btnleft btn link") календарь
      router-link(:to="{name: 'MainPurpose'}" class="button leftblok__btnleft btn link") мои цели
      router-link(:to="{name: 'MainContacts'}" class="button leftblok__btnleft btn link") книга контактов
      router-link(:to="{name: 'MainUrgently'}" class="button leftblok__btnleft btn link") срочные дела
  .leftblok__bottom.flex
    p.leftblok__bottomdate {{ this.day }}
    p.leftblok__bottomtime {{ this.time }}
</template>
<script>
export default {
  data() {
    return {
    day: '',
    time: ''
    }
  },
  computed: {
activeclass() {
 let adress = window.location.pathname.includes('HistoreThoughts')
  return adress
}
  },
created() {
this.changeday = setInterval(() => this.day = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`, 1000);
this.changetime = setInterval(() => this.time = `${new Date().getHours()}.${new Date().getMinutes()}`, 1000);
// здесь проблема если минута одинарное число, но перед ним 0 не показывается
}
}
</script>
