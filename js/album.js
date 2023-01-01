const main = document.querySelector('.main');
const trash = document.getElementById('trash');
const polaroid = document.getElementById('polaroid');
const postcard = document.getElementById('postcard');
const button = document.getElementById('button');

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
    activeToggle(polaroid,postcard,button);
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("polaroid")
        blockArray[i].children[0].classList.add('polaroidImg')
        blockArray[i].classList.remove("button")
        blockArray[i].children[0].classList.remove('buttonImg')
        blockArray[i].classList.remove("postcard")
        blockArray[i].children[0].classList.remove('postcardImg')
    }
})
postcard.addEventListener('click', () =>{
    activeToggle(postcard,polaroid,button);
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("postcard")
        blockArray[i].children[0].classList.add('postcardImg')
        blockArray[i].classList.remove("button")
        blockArray[i].children[0].classList.remove('buttonImg')
        blockArray[i].classList.remove("polaroid")
        blockArray[i].children[0].classList.remove('polaroidImg')
    }
})
button.addEventListener('click', () =>{
    activeToggle(button,polaroid,postcard);
    for(let i = 0; i < blockArray.length;i++){
        blockArray[i].classList.add("button")
        blockArray[i].children[0].classList.add('buttonImg')
        blockArray[i].classList.remove("postcard")
        blockArray[i].children[0].classList.remove('postcardImg')
        blockArray[i].classList.remove("polaroid")
        blockArray[i].children[0].classList.remove('polaroidImg')
    }
})
trash.addEventListener('click', clearImages);

for(let j = 1; j< blockArray.length;j++){
    blockArray[j].classList.add('hidden');
}
for(let u = 0; u< itemsArray.length;u++){
    if(u < 5){
        blockArray[u + 1].classList.remove('hidden');
    }
    else{
        errorMsg();
    }
    blockArray[u].style.padding = "0rem";
    blockArray[u].style.border = "0";
    blockArray[u].innerHTML = itemsArray[u];
}

for(let i = 0 ; i < blockArray.length- itemsArray.length;i++){
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
                itemsArray.push(blockArray[i].innerHTML);
                localStorage.setItem('image', JSON.stringify(itemsArray));
                console.log(itemsArray);
            });
            reader.readAsDataURL(choosenImg);
        }
    });
}

function activeToggle(item1,item2,item3){
    item1.classList.add('active');
    item2.classList.remove('active');
    item3.classList.remove('active');    
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
    }       
    
}
function clearImages(){
    console.log('bye bye');
    localStorage.clear();
    itemsArray = [];
    window.location.reload();
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