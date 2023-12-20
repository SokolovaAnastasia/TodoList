<template lang="pug">
ul.monthlist.listreset.flex
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Январь', mounthnumber: '1' }}")
    li.monthlistitem Январь
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Февраль', mounthnumber: '2' }}")
    li.monthlistitem Февраль
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Март', mounthnumber: '3' }}")
    li.monthlistitem Март
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Апрель', mounthnumber: '4' }}")
    li.monthlistitem Апрель
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Май', mounthnumber: '5' }}")
    li.monthlistitem Май
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Июнь', mounthnumber: '6' }}")
    li.monthlistitem Июнь
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Июль', mounthnumber: '7' }}")
    li.monthlistitem Июль
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Август', mounthnumber: '8' }}")
    li.monthlistitem Август
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Сентябрь', mounthnumber: '9' }}")
    li.monthlistitem Сентябрь
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Октябрь', mounthnumber: '10' }}")
    li.monthlistitem Октябрь
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Ноябрь', mounthnumber: '11' }}")
    li.monthlistitem Ноябрь
  router-link(:to="{name: 'HistoreThoughts', params: { mounth: 'Декабрь', mounthnumber: '12' }}")
    li.monthlistitem Декабрь
</template>
<script>
// нужно передавать месяц в компонент
export default {



};
</script>
