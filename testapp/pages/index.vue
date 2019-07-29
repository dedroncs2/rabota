<template>
  <div>
    <h2>Todos:</h2>
    <ol>
      <li v-for="(todo, index) in todos">
        <input type="checkbox"
               v-on:change="toggle(todo)"
               v-bind:checked="todo.done">
        <span v-if="index!=idx" :class="{reserved: todo.done}" @click="update(index)">
          {{ todo.text }}
        </span>
        <template v-else>
          <input v-model="todo.text">
          <button @click="cancel(index)">
            cancel
          </button>
          <button @click="updateData(todo)">
            updateData
          </button>
        </template>
        <button v-if="todo.done==true" @click="deleteById(todo)">
          delete
        </button>
      </li>
    </ol>
    <input v-model="addin">
    <button @click="add()">
      add
    </button>
    <button v-if="showdel" @click="deld">
      delete
    </button>
    {{test}}
  </div>

</template>

<script>


  export default {
    data() {
      return {
        todos: [ ],
        addin: "",
        idx: -1,
        prev: "",
        showdel: false,
        test : "null"
      };
    },
    methods: {
      async getData(){
        this.todos = await this.$axios.$get('http://localhost:3001/tasks');
      },
      toggle: function (todo) {
        todo.done = !todo.done;
        this.test = todo.done;
        this.updateData(todo);
      },
      async add() {
        await this.$axios.$post('http://localhost:3001/tasks',{text: this.addin, done: false})
        this.getData();
      },
      async updateData(todo) {
        await this.$axios.$post('http://localhost:3001/tasks/'+ todo.id, todo )
        //this.test = todo;
        this.idx = -1;
        this.getData();
      },
      update(index) {
        this.prev = this.todos[index].text;
        this.idx = index;
      },
      async deld() {
        await this.$axios.$delete('http://localhost:3001/tasks');
        this.getData();
        //this.todos = this.todos.filter(function (todo) {
        //  return todo.done == false
        //})
      },
      cancel(index) {
        this.todos[index].text = this.prev;
        this.idx = -1;

      },
      async deleteById(todo) {
        await this.$axios.$delete('http://localhost:3001/tasks/' + todo.id);
        this.getData();
      },


    },
    beforeUpdate: function () {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].done == true) {
          this.showdel = true;
          break;
        } else {
          this.showdel = false;
        }
      }
    },
    mounted() {
      this.getData()
      // for(let i=0; i<this.todos.length;i++)
      // {
      //   if(this.todos[i].done ==true){
      //     this.showdel=true;
      //     break;
      //   }
      //   else {
      //     this.showdel = false;
      //   }
      // }
      // let myJson = window.localStorage.getItem('todos');
      // myJson = JSON.parse(myJson);
      // this.todos = myJson;
      //alert(window.localStorage.getItem("todos"));
    }
  }
</script>

<style>
  body {
    padding: 20px;
    font-family: Helvetica;
  }

  li {
    margin: 8px 0;
  }

  h2 {
    font-weight: bold;
    margin-bottom: 15px;
  }

  del {
    color: rgba(0, 0, 0, 0.3);
  }

  .reserved {
    text-decoration: line-through;
    color: grey;
  }

</style>
