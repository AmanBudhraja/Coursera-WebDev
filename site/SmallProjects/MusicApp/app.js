window.onload = function() {
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;    
    var context = new AudioContext();
    document.querySelector('.start').addEventListener('click', 
        function(){    
            Tone.start();
            context.resume().then(()=>{
                sequencer();
            });
    });
}; 

function sequencer(){
    const kick = new Tone.Player('./assets/drums/kick-electro01.wav').toDestination();
    const snare  = new Tone.Player('./assets/drums/snare-lofi02.wav').toDestination();
    let index = 0;
    
    Tone.Transport.scheduleRepeat(repeat, '8n');
    Tone.Transport.start();

    function repeat(){
        let step = index % 8;
        let kickinputs = document.querySelector(`.kick input:nth-child(${step + 1})`);
        let snareinputs = document.querySelector(`.snare input:nth-child(${step + 1})`);
        
        if(snareinputs.checked){
            snare.start();
        }
        if(kickinputs.checked){
            kick.start();
        }
        index++;
    }

}
