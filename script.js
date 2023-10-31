const {createApp} = Vue;

createApp({
data(){
  return{
    title : 'TO DO LIST'
  }
},
methods:{
  getList(){

  }
},
mounted(){
  this.getList();
}
}).mount('#App');