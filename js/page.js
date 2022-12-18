const add = document.querySelectorAll('.add button');
const imgBox = document.querySelectorAll('.add');
const main = document.querySelector('.main')

main.addEventListener('click', () => { // * needs to double click for first img
    for(let i = 0 ; i < main.childElementCount; i++){
        main.children[i].addEventListener('click', addBlock)
        main.children[i].addEventListener('click', addImage)
    }
    add[0].removeEventListener('click', addBlock); // * to prevent double block generation
});


add[0].addEventListener('click', addBlock); // * needed to make first click work

function addBlock(){
    const block = document.createElement('div');
    const blockPara = document.createElement('p');
    block.classList.add('add');
    block.innerHTML = '<button> <img src="../images/add.svg" alt="add-image"></button>';
    blockPara.innerHTML = "Add Image";
    main.appendChild(block);
    block.appendChild(blockPara);
}
function addImage(){
    imgBox[0].innerHTML = "RAHHHHHH"
}