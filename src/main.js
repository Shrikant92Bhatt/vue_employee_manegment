// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import db from 'firebase'
import './components/firebaseinit'

Vue.config.productionTip = false

let app;
db.auth().onAuthStateChanged( user =>{
  if(!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})


/* eslint-disable no-new */

