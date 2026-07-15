const imageCount = 38;
const folder = "assets";
const extension = "jpg";
const images = Array.from({ length: imageCount }, (_, i) => i + 1);

// Shuffle

images.sort(() => Math.random() - 0.5);
images.forEach((image, index) => {
    const layer = document.createElement("div");
    layer.className = "a";
    layer.id = `a${index + 1}`;
    layer.style.backgroundImage = `url("${folder}/${image}.${extension}")`;
    document.querySelector(".i").before(layer);
});

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