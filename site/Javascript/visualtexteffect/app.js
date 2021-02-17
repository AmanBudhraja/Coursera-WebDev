function scrollAppear(){
    var introText = document.querySelector('.intro-text');
    var introPosition = introText.getBoundingClientRect().top;
    var screenPosition = window.innerHeight / 1.2;
    console.log(introPosition, screenPosition);

    if(introPosition < screenPosition){
        introText.classList.add('intro-appear');
    }else{
        introText.classList.remove('intro-appear');
    }
}

window.addEventListener('scroll', scrollAppear);