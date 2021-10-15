function miGetPitstopDeltatime() {
  switch($prop('TrackName')) {
    case 'Suzuka':
      return 5;
    default:
      return 8;
  }
}

function miGetPitstopRenderingSkip() { return 20; }

function miGetPitstopDeltaMaxGapTime() { return 2; } // ignore cars with gap +/- to pit window bigger than this

function miGetPitstopDeltaFrameX() { return 10; }
function miGetPitstopDeltaFrameY() { return 10; }
function miGetPitstopDeltaFrameHeight() { return 800; }
function miGetPitstopDeltaFrameWidth() { return 200; }

function miGetPitstopDeltaWindowX() { return miGetPitstopDeltaFrameX() + 20; }

function miGetPitstopDeltaWindowY() { 
  var ypos = 0;
  ypos = miGetPitstopDeltaFrameY() + (miGetPitstopDeltaFrameHeight()-miGetPitstopDeltaWindowHeight())/2;
  return ypos;  + 20; 
}

function miGetPitstopDeltaWindowHeight() { return miGetPitstopDeltaCarHeight(); }  // make sure, car and pitstopwindow are same height

function miGetPitstopDeltaWindowWidth()  { return 15;  }

function miGetPitstopDeltaAddonHeight() { 
  var delta = miGetPitstopDeltatime();
  var deltaHeight = miGetPitstopDeltaWindowHeight();
  var deltaAdd = miGetPitstopDeltaAdditionalTime();

  var height = deltaHeight/delta*deltaAdd;
  return height;
}

function miGetPitstopDeltaCarHeight()  { return 50;  }
function miGetPitstopDeltaCarWidth()  { return miGetPitstopDeltaCarHeight()*0.55;  }  // keep aspect ratio


function miGetPitstopCarXPos(offset) {
  var xpos = miGetPitstopDeltaWindowX() + miGetPitstopDeltaWindowWidth() + 5;
  
  return xpos;
}

function miGetPitstopCarYPos(offset) {
  var xpos = 20 + ($prop('Position')*10);
  
  return xpos;
}

function miGetPitstopDeltaGap(i) {
    
  //var i = repeatindex();
    
  var pitStopTime = miGetPitstopDeltatime();
  
  
  var gapToRejoin;
    
  var carGap;
  carGap = drivergaptoplayer(i); // if the car is behind us, the gap is already correct
  if (!isplayer(i) && carGap!=null) {
    if (carGap <= 0) {  // when in front, calculate the gap from behind
      var lastLapSeconds = timespantoseconds(driverlastlap(i));
      var lapGap = drivercurrentlap(i) - $prop('CurrentLap'); // FIXXXME use later!				
      carGap = lastLapSeconds - Math.abs(carGap);  // use last Lap of driver as total time and subtract the distance to the player
    } 
    if (carGap > pitStopTime) { 
      gapToRejoin = carGap - pitStopTime; 
    } else {
      gapToRejoin = carGap;
    }      
    
  }   
    
  return carGap;
}
