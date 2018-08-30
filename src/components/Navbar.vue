<template>
   <nav>
       <div class="nav-wrapper green">
           <div class="container">
               <router-link to="/" class="brand-logo">Employee Maneger</router-link>
                <ul class="right">
                    <li v-if='isLoggedIn' class="black-text">{{isCurrentUser}}</li>
                    <li v-if ='isLoggedIn'><router-link to ="/">Dashbord</router-link></li>
                    <li v-if ='!isLoggedIn'><router-link to ="/login">Login</router-link></li>
                    <li v-if ='!isLoggedIn'><router-link to ="/register">Register</router-link></li>                   
                    <li v-if ='isLoggedIn'><buttton v-on:click="logout" class="btn black">Logout</buttton></li>
                </ul>
           </div>           
       </div>
   </nav>
</template>
<script>
    import db from 'firebase';
    export default{
        name: 'navbar',
        data() {
            return{
                isLoggedIn: false,
                isCurrentUser: false
            }
        },
        methods:{
            logout: function(e){
                db.auth().signOut().then(() => {
                    this.$router.go({path: this.$router.path});
                })
            }
        },
        created(){
            if(db.auth().currentUser){
                this.isLoggedIn = true;
                this.isCurrentUser = db.auth().currentUser.email;
            }
        }
    }
</script>