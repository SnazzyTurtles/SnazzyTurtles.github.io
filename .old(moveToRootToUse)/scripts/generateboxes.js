//adding elements to html
let boxes = [];
for(var i = 0; i < 20; i ++)
{
    var box = document.createElement('li');
    box.textContent = i + "";
    box.setAttribute('class', 'box red');
    document.getElementById('gridlist').appendChild(box);
    boxes[i] = box;
}

//add listener to all boxes so they are clickable
document.querySelectorAll(".box").forEach(box =>{
    box.addEventListener('click', function(e){
        box.classList.toggle('green');
        box.classList.toggle('red');
    e.preventDefault();

    updateSum();
    })
});

function updateSum(){
    var s = 0;
    for(var i = 0; i < 20; i ++)
    {
        if(boxes[i].classList.contains('green')){
            s += i;
        }
    }
    document.getElementById("sum").textContent = "Sum: " + s;
}

const express = require('express');
const app = express();

app.get('/gay', (req, res)=>{
    res.send('hi');
});

app.listen(3000, 'arthurbright.github.io');
