function smoothscroll(target, duration){
    var target = document.querySelector(target);
    var targetpos = target.getBoundingClientRect().top;
    var startpos = window.pageYOffset;
    var dist = targetpos - startpos;
    var starttime = null;
    
    function anime(currentTime){
        if(starttime === null) starttime = currentTime;
        var timeelapsed = currentTime - starttime;
        var run = ease(timeelapsed, startpos, dist, duration);
        window.scrollTo(0,run);
        if(timeelapsed < duration) requestAnimationFrame(anime);
    }

    function ease(t,b,c,d){
        t/=d/2;
        if(t<1) return c/2*t*t+b;
        t--;
        return -c/2*(t*(t-2)-1)+b;
    }

    requestAnimationFrame(anime);
}

var section1 = document.querySelector('.section1');
var section2 = document.querySelector('.section2');

section1.addEventListener('click', function(){
    smoothscroll('.section2',1000);    
});
section2.addEventListener('click', function(){
    smoothscroll('.section1',1000);    
});

