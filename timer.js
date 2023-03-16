class Timer{
    constructor(durationInput,startButton,pauseButton,callbacks){
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if(callbacks){
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause);
    }
    start = () =>
    {
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        //we do not want an initial 1000milisecond delay
        this.tick();
        // Run tick after 50milisec 
        this.intervalId = setInterval(this.tick,50);
    }
    pause = () =>
    {
        //Stop the interval
        clearInterval(this.intervalId);
    }
    tick = () => 
    {
        //We are storing timeRemaining here because we do not need 
        //to check if user is changing durationInput and we will
        // a extra eventListener for it
        if(this.timeRemaining <=0){
        this.pause();
        if(this.onComplete){
            this.onComplete();
        }
        }
        else{
        this.timeRemaining = this.timeRemaining - 0.05 ; 
        if(this.onTick){
            this.onTick(this.timeRemaining);
        }
        }
    }
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    set timeRemaining(time){
        //Fixed timer to 2 decimal point
        this.durationInput.value = time.toFixed(2); 
    }
}