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
axios.get(this.apiUrl)
.then(result =>{
  this.list = result.data;

})

  },


  addTask(){
    // il dato che invio al server,  per essere accettato da PHP come se fosse un form , devo crearlo dentro un FormData
    const data = new FormData();
    data.append('todoItem' , this.newTask);

    axios.post(this.apiUrl , data)
    .then(result => {
      this.list = result.data;
       this.newTask = '';
    })
  },

  removeTask(index){
  const data = new FormData();
  data.append('indexToDelete' , index);
  axios.post(this.apiUrl, data)
  .then(result =>{
    this.list = result.data;
  })
  },


  toggleDone(index){
    const data = new FormData();
    data.append('indexToToggle' , index);
    axios.post(this.apiUrl, data)
    .then(result => {
      this.list = result.data;
    })
  } 

},
mounted(){
  this.getList();
}
}).mount('#App');