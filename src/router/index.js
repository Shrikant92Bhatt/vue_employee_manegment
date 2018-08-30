import Vue from 'vue'
import Router from 'vue-router'
import Dashbord from '@/components/Dashbord'
import NewEmployee from '@/components/NewEmployee'
import ViewEmployee from '@/components/ViewEmployee'
import EditEmployee from '@/components/EditEmployee'
import Login from '@/components/Login'
import Register from '@/components/Register'
import db from 'firebase' 
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'dashbord',
      component: Dashbord,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-employee',
      component: NewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/:emp_id',
      name: 'view-employee',
      component: ViewEmployee,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/edit/:emp_id',
      name: 'edit-employee',
      component: EditEmployee,
      meta:{
        requiresAuth: true
      }
    }
  ]
});

//nav Guards
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if(to.matched.some(record =>record.meta.requiresAuth)){
    //check if not loggined
    if(!db.auth().currentUser){
      //
      next({
        path : '/login',
        query : {
          redirect: to.fullPath
        }
      });
    }else{
      //Procde to route
      next();
    }
  }else if(to.matched.some(record =>record.meta.requiresGuest)){
    if(db.auth().currentUser){
      //
      next({
        path : '/',
        query : {
          redirect: to.fullPath
        }
      });
    }else{
      //Procde to route
      next();
    }
  }
});

 export default router;

