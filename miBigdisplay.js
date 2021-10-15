function miGetPitstopDeltatime() {
  switch($prop('TrackName')) {
	case 'Mount Panorama Circuit':
      return 41;
	case 'WeatherTech Raceway Laguna Seca':
      return 42;
	case 'Circuit de Spa-Francorchamps':
      return 43;
	case 'Suzuka Circuit':
      return 44;
	case 'Kyalami Grand Prix Circuit':
      return 45;
	case 'Oulton Park':
      return 46;
	case 'Snetterton Circuit':
      return 47;
	case 'Donington Park':
      return 48;
	case 'Monza Circuit':
      return 49;
	case 'Brands Hatch Circuit':
      return 50;
	case 'Silverstone':
      return 51;
	case 'Circuit Paul Ricard':
      return 52;
	case 'Misano World Circuit':
      return 53;
	case 'Circuit Zandvoort':
      return 54;
	case 'Nürburgring':
      return 55;
	case 'Hungaroring':
      return 56;  
    case 'Circuit de Barcelona-Catalunya':
      return 57;
	case 'Circuit Zolder':
      return 58;
	case 'Autodromo Enzo e Dino Ferrari':
      return 59;
    default:
      return 60;
  }
}

function miGetPitstopDeltaMaxGapTime() { return 2; } // ignore cars with gap +/- to pit window bigger than this

function miGetPitstopRenderingSkip() { return 20; }

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
