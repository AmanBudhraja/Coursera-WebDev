const burger = document.querySelector('.burger');
const navlinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () =>{
    navlinks.classList.toggle('open');
});