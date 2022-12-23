const openM = document.querySelector('header img');
const showLinks = document.querySelector('.menu ul')
const menu = document.querySelector('.menu');
const burger = document.getElementById('burger');
const clear = document.getElementById('clear');

openM.addEventListener('click', () =>{
    menu.style.width = "70vw";
    menu.style.height = "100%";
    menu.style.opacity = "1";
    menu.style.transition = " width .3s ease-in, opacity .3s ease-in,height .3s ease-in";
    showLinks.style.display = "block";
    clear.style.display ="block";
    burger.style.display = "none";
})
clear.addEventListener('click', () => {
    menu.style.width = "0";
    menu.style.height = "0";
    menu.style.opacity = "0";
    menu.style.transition = " width .3s ease-in, opacity .3s ease-in,height .3s ease-in";
    showLinks.style.display = "none";
    clear.style.display ="none";
    burger.style.display = "block";
})