var divs = document.querySelectorAll('.a');
var i = Math.floor(Math.random() * divs.length);

divs.forEach(function(div){
    div.classList.add("h");
});

(function f(){
    i = (i + 1) % divs.length;
    divs.forEach(function(div, idx){
         div.classList.add("h");
         if(idx == i)
             div.classList.remove('h'); 
    });

    setTimeout(f, 100);
 })();