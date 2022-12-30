const main = document.querySelector('.main');

const block = document.createElement('div');
const block2 = document.createElement('div');
const block3 = document.createElement('div');
const block4 = document.createElement('div');
const block5 = document.createElement('div');
const block6 = document.createElement('div');

let blockArray = [block,block2,block3,block4,block5,block6];
//let newBlockArray= [block2,block3,block4,block5,block6];
//let count = 0;
let countMsg = 0;

addBlock();
for(let j = 1; j< blockArray.length;j++){
    blockArray[j].classList.add('hidden');
}

for(let i = 0; i<blockArray.length;i++){ //* update array length
    document.querySelectorAll('#file')[i].addEventListener('change', function()  {
        
        const choosenImg = this.files[0];

        if(choosenImg){
            const reader = new FileReader();
            reader.addEventListener('load', () =>{
                blockArray[i].style.padding = "0rem";
                blockArray[i].style.border = "0";
                blockArray[i].innerHTML = '<img class = "image">';
                if(i+1 < 6){
                    blockArray[i+1].classList.remove('hidden');
                }
                document.querySelectorAll('.image')[i].src = reader.result;
            });
            reader.readAsDataURL(choosenImg);
        }
        countMsg += 1;
        if(countMsg >= 6){errorMsg();}
    /*
        if(count <= 5){
            blockArray.push(newBlockArray[count]);
            addBlock();
        }
        count += 1;
        countMsg += 1;
        if(count >= 5){count = 4;}
        if(countMsg >= 6){errorMsg();}
        */
    });
}

function addBlock(){
    for(let i = 0; i<blockArray.length;i++){
        blockArray[i].classList.add('add');
        blockArray[i].innerHTML = '<input type="file" id="file"> <label for = file> <img src="../images/add.svg" alt="add-image"></label> <p>add image</p>';
        main.appendChild(blockArray[i]);
    }
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