$('body').keyup(function(e){
   if(e.keyCode == 8){
       // user has pressed backspace
       array.pop();
   }
   if(e.keyCode == 32){
       // user has pressed space
       array.push('');
   }
});