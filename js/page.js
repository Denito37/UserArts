const main = document.querySelector('.main');
const userImg = document.getElementById('img');
let choosenImg = "";
const block = document.createElement('div');
const block2 = document.createElement('div');
const block3 = document.createElement('div');
let blockArray = [block];

addBlock()
document.querySelector('div button').addEventListener('click', () =>{
    const block4 = document.createElement('div')
    blockArray.push(block2);
})
for(let i = 0; i < blockArray.length;i++){
    blockArray[i].addEventListener('click', () => {
        addBlock();
        addImage();
    })
}
function addBlock(){
    for(let i = 0; i<blockArray.length;i++){
        blockArray[i].classList.add('add');
        blockArray[i].innerHTML = '<button> <img src="../images/add.svg" alt="add-image"></button> <p>add image</p>';
        main.appendChild(blockArray[i]);
    }
}
function addImage(){
    blockArray[0].style.padding = "0rem";
    blockArray[0].innerHTML = '<img class = "image" src = "../images/ARMS RG.jpeg" alt = "ARMS">';
}