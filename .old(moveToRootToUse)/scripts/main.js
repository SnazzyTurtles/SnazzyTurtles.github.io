const headerTitle = document.getElementById("headerTitle");
const backgroundPic = document.getElementById("backgroundPic");
const title1 = document.getElementById("title1");
const namee = document.getElementById("namee")
const icon = document.getElementById("logo")
const arrow = document.getElementById("arrow");


const titleY = title1.offsetTop;



headerTitle.addEventListener('click', (e)=>{
    window.location.href="index"
})

icon.addEventListener('click', (e)=>{
    window.location.href = "index"
})

arrow.addEventListener('click', (e)=>{
    window.location.href = "#aboutme"
})




const lerp = 0.15;
const lerpp = 1 - lerp;
const offset = 30;
curtop = titleY;
curleft = window.innerWidth/2;
curtop2 = 0;
curleft2 = 0;
const parallaxRatio = 0.02;

const parallax = (e)=>{
    var height = window.innerHeight;
    var width = window.innerWidth;

    
    var x = -parallaxRatio * (e.clientX - width/2);
    var y = -parallaxRatio * (e.clientY - height/2);
    backgroundPic.style.left = (curleft2 * lerpp  + (x - offset) * lerp) + "px";
    backgroundPic.style.top = (curtop2 * lerpp + (y - offset) * lerp)+ "px";
    curtop2 = (curtop2 * lerpp + (y - offset) * lerp);
    curleft2 = (curleft2 * lerpp  + (x - offset) * lerp);


    //moving the text
    
    const parallaxRatio2 = 0.05;
    var x2 = -parallaxRatio2 * (e.clientX - width/2);
    var y2 = -parallaxRatio2 * (e.clientY - height/2);
    //offset position so still near center
    title1.style.left = (curleft * lerpp + (x2 + width/2) * lerp) + "px";
    title1.style.top = (curtop * lerpp + (y2 + titleY) * lerp) + "px";
    curleft = (curleft * lerpp + (x2 + width/2) * lerp);
    curtop =  (curtop * lerpp + (y2 + titleY) * lerp);
}

window.onmousemove = (e) =>{
    //parallax background
    parallax(e);

    
 }

 const NAME = "Arthur Bright"
 letters = -1;
 window.onload = (e)=>{
    window.setInterval(() =>{
        if(letters < 13){
            letters ++;
            if(letters == 13){
                namee.innerHTML = NAME.substring(0, letters);
            }
            else{
                namee.innerHTML = NAME.substring(0, letters) + "_";
            }
            
            console.log(letters);
        }
    }, 80);

 }