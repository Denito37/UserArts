const main = document.querySelector('.main');
const trash = document.getElementById('trash');
const polaroid = document.getElementById('polaroid');
const postcard = document.getElementById('postcard');
const button = document.getElementById('button');
const tv = document.getElementById('tv');

const block = document.createElement('div');
const block2 = document.createElement('div');
const block3 = document.createElement('div');
const block4 = document.createElement('div');
const block5 = document.createElement('div');
const block6 = document.createElement('div');

let blockArray = [block,block2,block3,block4,block5,block6];
let itemsArray = localStorage.getItem('image') ? JSON.parse(localStorage.getItem('image')) : [];

addBlock();

polaroid.addEventListener('click', () =>{
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("polaroid")
        blockArray[i].classList.remove("button")
        blockArray[i].classList.remove("tv")
        blockArray[i].classList.remove("postcard")
    }
})
postcard.addEventListener('click', () =>{
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("postcard")
        blockArray[i].classList.remove("button")
        blockArray[i].classList.remove("tv")
        blockArray[i].classList.remove("polaroid")
    }
})
button.addEventListener('click', () =>{
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("button")
        blockArray[i].classList.remove("postcard")
        blockArray[i].classList.remove("tv")
        blockArray[i].classList.remove("polaroid")
    }
})
tv.addEventListener('click', () =>{
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("tv")
        blockArray[i].classList.remove("button")
        blockArray[i].classList.remove("postcard")
        blockArray[i].classList.remove("polaroid")
    }
})
trash.addEventListener('click', clearImages);

for(let j = 1; j< blockArray.length;j++){
    blockArray[j].classList.add('hidden');
}
for(let u = 0; u< itemsArray.length;u++){
    blockArray[u + 1].classList.remove('hidden');
    blockArray[u].style.padding = "0rem";
    blockArray[u].style.border = "0";
    blockArray[u].innerHTML = itemsArray[u];
    console.log(itemsArray.length);
}

for(let i = 0 ; i < blockArray.length;i++){
    document.querySelectorAll('#file')[i].addEventListener('change', function()  {
        
        const choosenImg = this.files[0];

        if(choosenImg){
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                addImage(blockArray[i]);
                if(i+1 < 6){blockArray[i+1].classList.remove('hidden');}
                if(blockArray[i].classList.contains("polaroid")){
                    document.querySelectorAll('.polaroidImg')[i].src = reader.result;
                }
                if(blockArray[i].classList.contains("postcard")){
                    document.querySelectorAll('.postcardImg')[i].src = reader.result;
                }
                if(blockArray[i].classList.contains("button")){
                    document.querySelectorAll('.buttonImg')[i].src = reader.result;
                }
                if(blockArray[i].classList.contains("tv")){
                    document.querySelectorAll('.tvImg')[i].src = reader.result;
                }

                itemsArray.push(blockArray[i].innerHTML);
                localStorage.setItem('image', JSON.stringify(itemsArray));
                console.log(itemsArray);
            });
            reader.readAsDataURL(choosenImg);
        }
    });
}

function addBlock(){
    for(let i = 0; i<blockArray.length;i++){
        blockArray[i].classList.add('add');
        blockArray[i].innerHTML = '<input type="file" id="file"> <label for = file> <img src="../images/add.svg" alt="add-image"></label> <p>add image</p>';
        main.appendChild(blockArray[i]);
    }
}
function addImage(item){
    item.style.padding = "0rem";
    for(let i = 0;i < blockArray.length;i++){
        if(blockArray[i].classList.contains("polaroid")){
            item.style.border = "0";
            item.innerHTML = '<img class = "polaroidImg">';
        }
        if(blockArray[i].classList.contains("postcard")){
            item.style.border = "0";
            item.innerHTML = '<img class = "postcardImg">';
        }
        if(blockArray[i].classList.contains("button")){
            item.innerHTML = '<img class = "buttonImg">';
        }
        if(blockArray[i].classList.contains("tv")){
            item.style.border = "0";
            item.innerHTML = '<img class = "tvImg">';
        }
    }       
    
}
function clearImages(){
    console.log('bye bye');
    localStorage.clear();
    itemsArray = [];
}
function errorMsg(){
    const msg = document.createElement("div");
    const msgTxt = document.createElement("p");
    msgTxt.innerHTML = " LIMIT REACHED: EACH ALBUM CAN SET 6 IMAGES ";
    main.appendChild(msg);
    msg.appendChild(msgTxt);
    msg.style.position = "absolute";
    msg.style.top = "0";
    msg.style.width = "100%";
    msgTxt.style.color = "hsl(10,70%,80%)";
    msgTxt.style.fontWeight = "700";
    msgTxt.style.textAlign = "center";    
}