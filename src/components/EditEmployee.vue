<template>
    <div id="edit-employee">
        <h3>Edit Employee</h3>
         <div class="row">
            <form @submit.prevent = "updateEmployee" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="employee_id" required disabled>
                        <label class="active">Employee ID#</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label class="active">Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="department" required>
                        <label class="active">Department</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="position" required>
                        <label class="active">Position</label>
                    </div>
                </div>
                <button type="submit" class="btn gray">submit</button>
                <router-link to="/" class="btn red">Cancel</router-link>
            </form>
        </div>
    </div>
</template>

<script>
import db from './firebaseinit.js'
    export default{
        name: "edit-employee",
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
            updateEmployee(){
                db.collection('emp').where('emp_id','==', this.$route.params.emp_id).get().then( querySnapshot => {
                    querySnapshot.forEach(doc =>{
                        doc.ref.update({
                            emp_id: this.employee_id,
                            emp_name: this.name,
                            emp_dept: this.department,
                            emp_position: this.position
                        }).then(()=>{
                            this.$router.push({name:'view-employee',params:{emp_id: this.employee_id}})
                        })
                    })
                })
            }          
        }
    }
</script>