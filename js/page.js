const add = document.querySelector('.add button');
const imgBox = document.querySelector('.add');


add.addEventListener('click', () => {
    const block = document.createElement('div');
    block.classList.add('add');
    block.innerText = "Add Image";
    // ! document.main.append(block);
});