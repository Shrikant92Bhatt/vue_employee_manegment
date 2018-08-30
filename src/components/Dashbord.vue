<template>
    <div id="dashbord">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Employee List</h4></li>
            <li v-for="(employee) in employees" v-bind:key="employee.id" class="collection-item">
                <span>{{employee.employee_id}} )</span>  <strong class="emp_name">{{employee.name}}</strong><div class="chip">  {{employee.department}}</div>
                <router-link class="secondary-content" v-bind:to="{ name: 'view-employee', params: {emp_id :employee.employee_id} }">
                    <i class="material-icons">remove_red_eye</i>
                </router-link>
            </li>
        </ul>


        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
    import db from './firebaseinit'
    export default{
        name: "dashbord",
        data(){
            return {
                employees: []
            }
        },
        created(){
            db.collection('emp').orderBy('emp_id').get().then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    const data = {
                        'id': doc.id,
                        'employee_id' : doc.data().emp_id,
                        'name' : doc.data().emp_name,
                        'department' : doc.data().emp_dept,
                        'position' : doc.data().emp_position
                    }
                    this.employees.push(data)
                })
            })
        }
    }
</script>
<style>
.emp_name{
    margin: 0 10px;
}
</style>
