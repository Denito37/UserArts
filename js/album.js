const main = document.querySelector('.main');
const polaroid = document.getElementById('polaroid');
const postcard = document.getElementById('postcard');
const button = document.getElementById('button');
const trash = document.getElementById('trash');
const custom = document.querySelector('.custom');
const customFile = document.getElementById('change');
const customExit = document.getElementById('exit');

let blockArray = [];
let itemsArray = localStorage.getItem('image') ? JSON.parse(localStorage.getItem('image')) : [];
// * LOOPS
//* populate page with 6 blocks
for(let i = 0 ; i < 6;i++){
    addBlock();
}
// * reveals new block when image is added
for(let j = 1; j< blockArray.length;j++){
    blockArray[j].classList.add('hidden');
}
// * Repopulates page with elements saved in local storage
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
// * adds click event to each block with an image to update values
for(let i =0;i<itemsArray.length;i++){
    blockArray[i].classList.add('edit')
    blockArray[i].addEventListener('click', ()=>{
        //custom.style.display = 'block'
    })
}
// * Reads user image and appends it to image element
for(let i = 0 ; i < blockArray.length - itemsArray.length;i++){
    document.querySelectorAll('#file')[i].addEventListener('change', function()  {
        const choosenImg = this.files[0];
        if(choosenImg){
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                addImage(blockArray[itemsArray.length]);
                if(i+1 < 6){blockArray[i+1].classList.remove('hidden');}
                if(itemsArray.length < 5){blockArray[itemsArray.length+1].classList.remove('hidden');}
                if(blockArray[itemsArray.length].classList.contains("polaroid")){
                    document.querySelectorAll('.polaroidImg')[itemsArray.length].src = reader.result;
                }
                if(blockArray[itemsArray.length].classList.contains("postcard")){
                    document.querySelectorAll('.postcardImg')[itemsArray.length].src = reader.result;
                }
                if(blockArray[itemsArray.length].classList.contains("button")){
                    document.querySelectorAll('.buttonImg')[itemsArray.length].src = reader.result;
                }
                //* save blocks to LS
                itemsArray.push(blockArray[itemsArray.length].innerHTML);
                localStorage.setItem('image', JSON.stringify(itemsArray));
            });
            reader.readAsDataURL(choosenImg);
        }
    });
}
//* Events
window.addEventListener('load',() =>{
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
polaroid.addEventListener('click', () =>{
    if(window.screen.width >= 1024){
        gridCol(2);
    }
    if(window.screen.width < 1023){
        gridCol(1);
    }
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
    if(window.screen.width >= 1024){
        gridCol(2);
    }
    if(window.screen.width < 1023){
        gridCol(1);
    }
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
    if(window.screen.width >= 1024){
        gridCol(3);
    }
    if(window.screen.width < 1023){
        gridCol(2);
    }
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

// * FUNCTIONS
function gridCol(cols){
    main.style.gridTemplateColumns = 'repeat('+cols+',1fr)';
}
function activeToggle(item1,item2,item3){
    item1.classList.add('active');
    item2.classList.remove('active');
    item3.classList.remove('active');    
}
function addBlock(){
    const blok = document.createElement('div')
    blockArray.push(blok);
    for(let i = 0; i<blockArray.length;i++){
        blockArray[i].classList.add('add');
        blockArray[i].innerHTML = '<input type="file" id="file"> <label for = file> <img src="../images/add.svg" alt="add-image"></label> <p>add image</p>';
        main.appendChild(blockArray[i]);
    }
}
function addImage(item){
    item.style.padding = "0rem";
    if(item.classList.contains("polaroid")){
        item.style.border = "0";
        item.innerHTML = '<img class = "polaroidImg">';
    }
    if(item.classList.contains("postcard")){
        item.style.border = "0";
        item.innerHTML = '<img class = "postcardImg"> ';
    }
    if(item.classList.contains("button")){
        item.innerHTML = ' <img class = "buttonImg">';
    }     
    
}
function clearImages(){
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
    msgTxt.addEventListener('click', () =>{
        msg.style.display = 'none'
    })
}

custom.style.display = 'none'
//* update image feature in developement
/*
customExit.addEventListener('click', () =>{
    custom.style.display = 'none'
})
customFile.addEventListener('change', function(){
    const choosenImg = this.files[0];
    if(choosenImg){
        const reader = new FileReader();
        reader.addEventListener('load', () =>{
            if(blockArray[itemsArray.length].classList.contains("polaroid")){
                document.querySelectorAll('.polaroidImg')[0].src = reader.result; // * get target and the save to LS
            }
            if(blockArray[itemsArray.length].classList.contains("postcard")){
                document.querySelectorAll('.postcardImg')[0].src = reader.result;
            }
            if(blockArray[itemsArray.length].classList.contains("button")){
                document.querySelectorAll('.buttonImg')[0].src = reader.result;
            }
        });
        reader.readAsDataURL(choosenImg);
    }
})
*/