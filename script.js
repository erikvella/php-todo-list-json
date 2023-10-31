const {createApp} = Vue;

createApp({
data(){
  return{
    apiUrl : 'server.php',
    title : 'TO DO LIST',
    list : [],
    newTask : ''
  }
},
methods:{
  getList(){
console.log('List');
axios.get(this.apiUrl)
.then(result =>{
  this.list = result.data;
  console.log(result.data);
})

  },
  addTask(){
    // il dato che invio al server,  per essere accettato da PHP come se fosse un form , devo crearlo dentro un FormData
    const data = new FormData();
    data.append('todoItem' , this.newTask);
    axios.post(this.apiUrl , data)
    .then(result => {
      this.list = result.data;
      console.log(result.data);
      this.newTaskObj = {
        text : this.newTask,
        done : false,
      };
      this.list.unshift(this.newTaskObj)

       this.newTask = '';
    })
  }
},
mounted(){
  this.getList();
}
}).mount('#App');