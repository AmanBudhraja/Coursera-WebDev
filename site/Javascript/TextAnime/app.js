const text = document.querySelector('.anime');
const strtext = text.textContent;
const splittext = strtext.split("");
text.textContent = "";

for(let i = 0; i < splittext.length; i++){
    text.innerHTML += "<span>" + splittext[i] + "</span>";
    console.log(text.textContent)
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add('fade');
    char++;
    if (char === splittext.length) {
        complete();
        return;
    }
}

function complete() {
    clearInterval(timer);
    timer = null;
}