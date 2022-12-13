const add = document.querySelectorAll('.add button');
const imgBox = document.querySelector('.add');
const main = document.querySelector('.main')


add[0].addEventListener('click', addBlock); // * find way to add event listener to generated blocks

function addBlock(){
    console.log('object');
    const block = document.createElement('div');
    const blockPara = document.createElement('p');
    block.classList.add('add');
    block.innerHTML = '<button> <img src="../images/add.svg" alt="add-image"></button>';
    blockPara.innerHTML = "Add Image";
    main.appendChild(block);
    block.appendChild(blockPara);
}