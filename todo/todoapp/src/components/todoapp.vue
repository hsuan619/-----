<template>
  <div class="container">
    <h2 class="text-center mt-5">My ToDoList</h2>
      <!-- input -->
      <div  class="d-flex p-5">
        <!--input v-model connect data.task-->
        <input v-model="task" type="text" placeholder="輸入待辦事項" v-on:keyup.enter="submittask" class="form-control"><!--加入enter press-->
        <button @click="submittask"  class="btn btn-outline-success btn-sm rounded-0">新增</button>
      </div>        <!--設定methods在data下-->
      <!-- task table -->
      <table class="table table-hover">
      <thead>
    <tr>
      <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">事項</font></font></th>
      <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">進度</font></font></th>
      <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">#</font></font></th>
      <th scope="col"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">#</font></font></th>
    </tr>
  </thead>

  <tbody> <!--tasks是list-->
    <tr v-for="(task, index) in tasks" :key="index"><!--設定list, item ,引索值-->                   
      <td>
        <span :class="{'done': task.status === 'Done',
        'text-warning': task.status === 'In-progress',
        'todo': task.status === 'To-Do'}">
        {{task.name}}
        </span>
      </td>  <!--呼叫data裡tasks的name-->
      <td style="width: 120px">
        <span @click="changestatus(index)" class="pointer"
        :class="{'done': task.status === 'Done',
        'text-warning': task.status === 'In-progress',
        'todo': task.status === 'To-Do'}">
          {{task.status}}
        </span>
      </td>
      <!--edit icon-->
      <td>
        <div class="pointer text-center" @click="edittask(index)">
          <span class="fa fa-pen"></span>
        </div>
      </td>
      <!--delet icon-->
      <td>
        <div class="pointer text-center" @click="deletetask(index)">
          <span class="fa fa-trash"></span>
        </div>
      </td>
    </tr>
  </tbody>

  </table>
  </div>
</template>

<script>
export default {
  name: 'App',
  props: {
    msg: String
  },
  data(){
    return {
      task :'', //connect input
      eidtedtask: null,
      availablesstatus: ["To-Do", "In-progress", "Done"],
      tasks:[
        {
          name: "task1",
          status: 'In-progress'
        },
        {
          name: 'task2',
          status: 'Done'
        }

      ]
    }
  },
  methods: { //fuction
    submittask(){
      if(this.task.length === 0) return;

      if(this.eidtedtask === null){
        this.tasks.push(
          {
            name: this.task,
            status: "To-Do", //push待辦 into tasks
          }
        )
        this.task = "" //輸入後清空搜尋欄
      }
      else{
        this.tasks[this.eidtedtask].name = this.name //換成edited的
        this.eidtedtask = null//變回null
      }
        
    },

    deletetask(index){
      this.tasks.splice(index, 1)//(index, amount)
    },

    edittask(index){
      this.task = this.tasks[index].name
      this.eidtedtask = index
    },
    changestatus(index){
      let newindex = this.availablesstatus.indexOf(this.tasks[index].status)//右邊是原本的status
      if(++newindex > 2) newindex = 0;
      this.tasks[index].status = this.availablesstatus[newindex]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer{
  cursor: pointer;
}
.done{
  text-decoration: line-through;
  color:forestgreen;
}
.progress{
  color:darkblue;
}
.todo{
  color: firebrick;
}
</style>