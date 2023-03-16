
let intialSession = 25;
let intialBreak = 5;
let intialTitle = "Session";
let intialTime  = "25:00";
let breakTime = "05:00";
let isPlaying = false;
let startTime;

const sessionLen = document.getElementById("session-length");
const timeLeft = document.getElementById("time-left");
const breakLen = document.getElementById("break-length");
const timerHeader = document.getElementById("timer-label");
const beep = document.getElementById("beep");

// DEFUALT SETTING IF WE WANT TO RESET THE APP
function defualt(){
    intialSession = 25;
    intialBreak = 5;
    intialTitle = "Session";
    intialTime  = "25:00";
    breakTime = "05:00";
    isPlaying = false;
    timeLeft.style.color="white";
    timerHeader.style.color="white";
    timeLeft.textContent = "25:00";
    sessionLen.textContent = intialSession;
    breakLen.textContent = intialBreak;
    timerHeader.textContent =  intialTitle;
    beep.pause();
    beep.currentTime = 0;
}
 let handleSessionLen =(event)=>{
        let element = event.target

        // if the clock is not counting and session length is no > 60
        if(element.value =="+" && intialSession < 60 && isPlaying == false){
            intialSession +=  1;
            // if the minutes are less than 10 add zero on front e.g 05
            if(intialSession < 10){
                intialTime = "0"+ intialSession + ":00";
                sessionLen.textContent = intialSession;

                //if is the session not a break display the session time
                if(intialTitle=="Session"){
                    timeLeft.textContent = intialTime;
                }

            }else{
                intialTime = intialSession + ":00";  
                sessionLen.textContent = intialSession;

                if(intialTitle=="Session"){
                    timeLeft.textContent = intialTime;
                }
            }
            
        }
        // minus the minutes
        else if(element.value =="-" && intialSession > 1 && isPlaying == false){
            intialSession -=  1;
             // if the minutes are less than 10 add zero on front e.g 05
            if(intialSession < 10){
                intialTime = "0"+ intialSession + ":00";
                sessionLen.textContent = intialSession;

                //if is the session not a break display the session time
                if(intialTitle=="Session"){
                    timeLeft.textContent = intialTime;
                }
            }
            else{
                intialTime = intialSession + ":00";
                sessionLen.textContent = intialSession;
                if(intialTitle=="Session"){
                    timeLeft.textContent = intialTime;
                }
            }
            
        }
        
    }
  handleBreakLen =(event)=>{
        let element = event.target;
        // increment the break time
        if(element.value =="+" && intialBreak < 60  && isPlaying == false){
            intialBreak +=  1;

             // if the minutes are less than 10 add zero on front e.g 05
            if(intialBreak < 10){
                breakTime = "0"+intialBreak + ":00";
                breakLen.textContent = intialBreak;

                // if we are on the break we can didplay the current incremented time
                if(intialTitle=="Break"){
                    timeLeft.textContent = breakTime;
                }
            }
            else{
                breakTime = intialBreak+ ":00";
                breakLen.textContent = intialBreak;
                
                if(intialTitle=="Break"){
                    timeLeft.textContent = breakTime;
                }
               
            }
            
        }
        // decrementing the break time
        else if(event.target.value =="-" && intialBreak > 1  && isPlaying == false){
            intialBreak -=  1;

             // if the minutes are less than 10 add zero on front e.g 05
            if(intialBreak < 10){
                breakTime = "0"+intialBreak + ":00";
                breakLen.textContent = intialBreak;  //SISPLAY THE CURRENT INCREMENTED BREAT TIME
                if(intialTitle=="Break"){
                    timeLeft.textContent = breakTime; //DISPLAY THE BREAKTIME ON THE SCREEN
                }
            }
            else{
                breakTime = intialBreak + ":00";
                
                breakLen.textContent = intialBreak;
                if(intialTitle=="Break"){
                    timeLeft.textContent = breakTime;
                }
            }
           
        }
        
    }
// STARTING AND STOPPING THE CLOCK
start_stop =()=>{
    isPlaying = isPlaying ? false: true;
    
        if(isPlaying){
            startTime = setInterval(() => {
                updateState() // RUN THE CLOCK
            }, 1000);
        }
        else{
                
            clearInterval(startTime); //PUASE THE TIME
                
        }
            
    }
   
    // UPDATE WHAT IS BEEN DISPLAYED ON THE SCREEN 'CORE FUNTION !IMPORTANT'
    function updateState(){

        let Arr = intialTime.split(":");
        let minutes = parseInt(Arr[0]);
        let seconds = parseInt(Arr[1]);
        
        // if the minutes are less than 10 add zero on front e.g 05
        if(minutes<10){
            minutes = "0" + minutes;
        }
        
        // IF THE TIME IS `00:00` PLAY THE BEEP AND SET THE TEXT COLOR TO WHITE
        // TAKE A BREAK IF THE SESSION IS DONE VIRSA VISE
        if(minutes == 0 && seconds==0){
            timeLeft.style.color="white";
            timerHeader.style.color="white";

            //TAKE THE BREAK IF THE SISSION IS OVER
            if(intialTitle =="Session"){
                beep.play();
                intialTime = breakTime;
                intialTitle = "Break";
                timeLeft.textContent = intialTime;
                timerHeader.textContent = intialTitle;
            }
            //START THE SESSION IF THE BREAK IS OVER
            else{
                beep.play();
                 // if the minutes are less than 10 add zero on front e.g 05
                if(intialSession < 10){
                    intialTime = "0"+ intialSession +":00";
                }else{
                    intialTime = intialSession +":00";
                }
                
                intialTitle = "Session";
                timeLeft.textContent = intialTime;
                timerHeader.textContent = intialTitle;
            }
            
        }
        if(seconds == 0 && minutes >0){
            seconds = 59;
            minutes -= 1;
            if(minutes ==0){
                timeLeft.style.color="red";
                timerHeader.style.color="red";
            }
            
             // if the minutes are less than 10 add zero on front e.g 05
            if(minutes<10){
                intialTime = "0"+minutes+":"+seconds;
                timeLeft.textContent = intialTime;   //DISPALY TIME LEFT FOR SESSION
            }else{
                intialTime = minutes+":"+seconds;
                timeLeft.textContent = intialTime;  //DISPALY TIME LEFT FOR SESSION
            }
           
        }
        else if(seconds <= 10 && seconds >=1){
            seconds -= 1;
            intialTime = minutes+":0"+seconds;
            timeLeft.textContent = intialTime; 
        }
        else if(seconds >= 10){
                seconds -= 1;
                intialTime = minutes+":"+seconds;
                timeLeft.textContent = intialTime;
        }
        
    }
    function resetState(){
        
        clearInterval(startTime); //STOP THE COUNTION
        defualt() // DEFUALT SETTINGS
    }

