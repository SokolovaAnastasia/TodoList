import { createApp } from 'vue'
import App from './App.vue'


import "./assets/styles/_common.scss"
import "./assets/styles/style.scss"


import { createRouter, createWebHistory } from 'vue-router'

import PageGreetings from './components/PageGreetings'
import PageOne from './components/PageOne'
import MainContacts from './components/ContactsPages/MainContacts'
import AddContacts from './components/ContactsPages/AddContacts'
import MainPurpose from './components/PurposePages/MainPurpose'
import MainTodolist from './components/TodoListPages/MainTodolist'
import MainThoughts from './components/ThoughtsPages/MainThoughts'
import HistoreThoughts from './components/ThoughtsPages/HistoreThoughts'
import MainUrgently from './components/UrgentlyPages/MainUrgently'
import MainAlmanac from './components/AlmanacPages/MainAlmanac'

import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";



const router = createRouter({
    routes: [{
        path: '/',
        component: PageGreetings,
        name: 'PageGreetings'
    },
    {
        path: '/PageOne',
        component: PageOne,
        name: 'PageOne'
    },
    {
        path: '/MainContacts',
        component: MainContacts,
        name: 'MainContacts'
    },
    {
        path: '/AddContacts/:name/:tel/:mail/:category',
        component: AddContacts,
        name: 'AddContacts'
    },
    {
        path: '/MainPurpose',
        component: MainPurpose,
        name: 'MainPurpose'
    }
        ,
    {
        path: '/MainTodolist',
        component: MainTodolist,
        name: 'MainTodolist'
    },
    {
        path: '/MainThoughts',
        component: MainThoughts,
        name: 'MainThoughts'
    },
    {
        path: '/HistoreThoughts/:mounth/:mounthnumber',
        component: HistoreThoughts,
        name: 'HistoreThoughts'

    },
    {
        path: '/MainUrgently',
        component: MainUrgently,
        name: 'MainUrgently'
    },
    {
        path: '/MainAlmanac',
        component: MainAlmanac,
        name: 'MainAlmanac'
    }

    ],
    history: createWebHistory()
})

const store = createStore({
    state() {
        return {
            person: [], Work: [], urgent: [], thoughts: [], purposemounth: [], purposeyear: [], purposesomeday: [], contacts: []
        }
    },
    plugins: [createPersistedState({ paths: ['person', 'Work', 'urgent', 'thoughts', 'purposemounth', 'purposeyear', 'purposesomeday', 'contacts'] })],
    mutations: {
// для контактов
addContacts(state, arrContacts) {
state.contacts.push({
   names: arrContacts.names,
   teles: arrContacts.teles,
   emailles: arrContacts.emailles,
   categories: arrContacts.categories,
   create: arrContacts.create
})
},
changeSubsequenceName(state) {
    state.contacts = state.contacts.sort((a, b) => a.names > b.names ? 1 : -1)
},
changeSubsequenceDate(state) {
    state.contacts = state.contacts.sort((a, b) => a.create > b.create ? 1 : -1 )
},
deleteContactss(state, delel) {

    state.contacts = state.contacts.filter((el) => el !== delel)
},
        // для ежедневника
        addPers(state, arrPerson) {
            state.person.push(
                { names: arrPerson.names }
            )
        },
        addTodoDay(state, arrWork) {
            state.Work.push(
                { day: arrWork.day, time: arrWork.time, textvalue: arrWork.textvalue, donevalue: arrWork.donevalue }
            )
        },
        toggleTodo(state, index) {
            state.Work[index].donevalue = !state.Work[index].donevalue;
        },
        addUrgent(state, arrUrgent) {
            state.urgent.push({
                case: arrUrgent.case,
                timeTo: arrUrgent.timeTo,
                done: false
            }
            )
        },
        deleteElTodolist(state, delel) {
            state.Work = state.Work.filter((el) => el !== delel)
        },
        addMonth(state, arrMonth) {
            state.purposemounth.push({
                purpose: arrMonth.purpose,
                done: false
            })
        },
        addYear(state, arrYear) {
            state.purposeyear.push({
                purpose: arrYear.purpose,
                done: false
            })
        },
        addSomeday(state, arrSomeday) {
            state.purposesomeday.push({
                purpose: arrSomeday.purpose,
                done: false
            })
        },
        //



        // мои мысли
        addThoughts(state, arrThoughts) {
            state.thoughts.push({
                newThoughts: arrThoughts.newThoughts,
                newdatehoughts: arrThoughts.newdatehoughts,
                newtimetehoughts: arrThoughts.newtimetehoughts
            })
        },
        // для целей
        addPurpose(state, arrPurpose) {
            state.purposesomeday.push({
                purpose: arrPurpose.purpose,
                done: arrPurpose.done
            })
        },
        addPurposeyear(state, arrPurposeYear) {
            state.purposeyear.push({
                purpose: arrPurposeYear.purpose,
                done: arrPurposeYear.done
            })
        },
        addPurposemounth(state, arrPurposeMounth) {
            state.purposemounth.push({
                purpose: arrPurposeMounth.purpose,
                done: arrPurposeMounth.done
            })
        },
        // для изменения сделано или нет
        togglePurpose(state, index) {
            state.purposemounth[index].done = !state.purposemounth[index].done;
        },
        togglePurposeYear(state, index) {
            state.purposeyear[index].done = !state.purposeyear[index].done;
        },
        togglePurposeSomeday(state, index) {
            state.purposesomeday[index].done = !state.purposesomeday[index].done;
        },
        //

        deletePurposeSomeday(state, delel) {
            state.purposesomeday = state.purposesomeday.filter((el) => el !== delel)
        },
        deletePurposeMounth(state, delel) {
            state.purposemounth = state.purposemounth.filter((el) => el !== delel)
        },
        deletePurposeYear(state, delel) {
            state.purposeyear = state.purposeyear.filter((el) => el !== delel)
        },

        // для срочных дел
        toggleUrgently(state, index) {
            state.urgent[index].done = !state.urgent[index].done;
        },
        //

        deleteElUrgenty(state, delel) {
            state.urgent = state.urgent.filter((el) => el !== delel)
        },

    },
    actions: {
        // для ежедневника
        toggleTodo({ commit }, index) {
            commit('toggleTodo', index);
        },
        //


        // для целей

        // для изменения сделано или нет
        togglePurpose({ commit }, index) {
            commit('togglePurpose', index);
        },
        togglePurposeYear({ commit }, index) {
            commit('togglePurposeYear', index);
        },
        togglePurposeSomeday({ commit }, index) {
            commit('togglePurposeSomeday', index);
        },
        //


        // для срочных дел
        toggleUrgently({ commit }, index) {
            commit('toggleUrgently', index);
        },
    },
    getters: {
        // для контактов
        doneContacts: (state) => (names, teles, emailles) => {
            return state.contacts.find(contacts => contacts.names === names && contacts.teles === teles && contacts.emailles === emailles)
        },

        // для ежедневника
        doneArr: (state) => (day, time) => {
            return state.Work.find(Work => Work.day === day && Work.time === time)
        },
        doneArrindex: (state) => (day, time) => {
            return state.Work.findIndex(Work => Work.day === day && Work.time === time)
        },
        //


        // мои мысли
        needTo: (state) => (mounths) => {
            return state.thoughts.filter((el) => el.newdatehoughts.split('.')[1] === mounths)
        },
        // для целей
        arrPurpose: (state) => {
            return state.purposesomeday
        },
        arrPurposeYear: (state) => {
            return state.purposeyear
        },
        arrPurposeMounth: (state) => {
            return state.purposemounth
        },
        // для изменения сделано или нет
        doneArrpurpose: (state) => (purpose) => {
            return state.purposemounth.findIndex(purposemounth => purposemounth.purpose === purpose)
        },
        doneArrpurposeYear: (state) => (purpose) => {
            return state.purposeyear.findIndex(purposeyear => purposeyear.purpose === purpose)
        },
        doneArrpurposeSomeday: (state) => (purpose) => {

            return state.purposesomeday.findIndex(purposesomeday => purposesomeday.purpose === purpose)

        },
        //

        doneArrSomeday: (state) => (value) => {
            return state.purposesomeday.find(purposesomeday => purposesomeday.purpose === value)
        },
        doneArrMounth: (state) => (value) => {
            return state.purposemounth.find(purposemounth => purposemounth.purpose === value)

        },
        doneArrYear: (state) => (value) => {
            return state.purposeyear.find(purposeyear => purposeyear.purpose === value)
        },

        // для срочных дел

        doneArrUrgent: (state) => (cases, timeTo) => {
            return state.urgent.find(urgent => urgent.case === cases && urgent.timeTo === timeTo)
        },
        doneArrUrgently: (state) => (cases) => {

          return state.urgent.findIndex(urgent => urgent.case === cases)
        }

    }



})


const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')

