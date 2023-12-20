<template lang="pug">
select(data-type="select-one" select-one :class=`${ids}` class=`${this.ids}__select` :id="ids" v-model="sselect" )
  option(class=`${this.id}__opt` value="All" ) Все
  option(class=`${this.id}__opt` value="Relatives") Родственники
  option(class=`${this.id}__opt` value="Colleaguesl") Коллеги
  option(class=`${this.id}__opt` value="Familiar") Знакомые
</template>
<script>
export default {
  props: ["ids"],
  data() {
    return {
      idvalue: "",
      sselect: ''
    };
  },
  watch: {
    sselect(newValue) {
      this.$emit('updateParent', {
            idvalue: newValue,
          })
    }
  },



  beforeMount() {

    if(this.$router.currentRoute.value.params.category === 'Relatives') {
      this.sselect = 'Relatives'
    }
    if(this.$router.currentRoute.value.params.category === 'Colleaguesl') {
      this.sselect = 'Colleaguesl'
    }
    if(this.$router.currentRoute.value.params.category === 'Familiar') {
      this.sselect = 'Familiar'
    }
  }
};
</script>
