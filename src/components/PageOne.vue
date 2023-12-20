<template lang="pug">
.container.sectionone.flex
  section.sectionone__left.flex
    router-link(:to="{name: 'MainTodolist'}")
      button.btn.sectionone__btn ежедневные планы
    router-link(:to="{name: 'MainUrgently'}")
      button.btn.sectionone__btn срочные дела
    router-link(:to="{name: 'MainAlmanac'}")
      button.btn.sectionone__btn календарь
  section.sectionone__middle.flex
    p.sectionone__middlename Привет, {{ this.$store.state.person[0].names }}
    p.sectionone__middlehellow Чем сегодня будем заниматься?
  section.sectionone__right.flex
    router-link(:to="{name: 'MainThoughts'}")
      button.btn.sectionone__btn  мои мысли
    router-link(:to="{name: 'MainContacts'}")
      button.btn.sectionone__btn книга контактов
    router-link(:to="{name: 'MainPurpose'}")
      button.btn.sectionone__btn мои цели
</template>

<script>


export default {

}
</script>