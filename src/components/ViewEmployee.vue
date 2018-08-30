<template>
    <div id="view-employee">
        <ul class="collection with-header">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Employee ID: # {{employee_id}}</li>
            <li class="collection-item">Department: {{department}}</li>
            <li class="collection-item">Position: {{position}}</li>
        </ul>
        <router-link to="/" class="btn gray">Back</router-link>
        <button @click = "deletEmployee" class="btn red" >Delet</button>

        <div class="fixed-action-btn">
            <router-link  v-bind:to="{ name: 'edit-employee', params: {emp_id : employee_id} }" class="btn-floating btn-large red">
                <i class="material-icons" aria-hidden="true">create</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit.js'
    export default{
        name: "view-employee",
        data(){
            return {
                employee_id: null,
                name : null,
                department : null,
                position : null
            }
        },
        beforeRouteEnter (to, from, next) {
            db.collection('emp').where('emp_id','==',to.params.emp_id).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.employee_id = doc.data().emp_id,
                        vm.name = doc.data().emp_name,
                        vm.department = doc.data().emp_dept,
                        vm.position = doc.data().emp_position
                    })
                });
            })
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData(){
                db.collection('emp').where('emp_id','==', this.$route.params.emp_id).get().then( querySnapshot => {
                    querySnapshot.forEach(doc =>{
                        this.employee_id = doc.data().emp_id
                        this.name = doc.data().emp_name
                        this.department = doc.data().emp_dept
                        this.position = doc.data().emp_position
                    })
                })
            } ,
            deletEmployee(){
                if(confirm('Are you sure?')){
                    db.collection('emp').where('emp_id','==', this.$route.params.emp_id).get().then( querySnapshot => {
                        querySnapshot.forEach(doc =>{
                            doc.ref.delete();
                            this.$router.push('/');
                        })
                    })
                }
            }           
        }
    }
</script>