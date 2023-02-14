    function miGetPitstopDeltatime() {
      switch($prop('TrackName')) {  // regular pitstop first, 1L refuel and DT in comment
      case 'Mount Panorama Circuit':
          return 57; //57  27  19
      case 'WeatherTech Raceway Laguna Seca':
          return 59; //59  29  21
      case 'Circuit de Spa-Francorchamps':
          return 95; //95  65  57
      case 'Suzuka':
          return 65; //65  35  27
      case 'Kyalami Grand Prix Circuit':
          return 56; //56  26  18
      case 'Oulton Park':
          return 46; //  FIXXXME not correct
      case 'Snetterton Circuit':
          return 47; //  FIXXXME not correct
      case 'Donington Park':
          return 48; //  FIXXXME not correct
      case 'Monza Circuit':
          return 69; //69  39  31
      case 'Brands Hatch Circuit':
          return 57; //57  27  19
      case 'Silverstone':
          return 61; //61  31  23
      case 'Circuit Paul Ricard':
          return 65; //65  35  27
      case 'Misano World Circuit':
          return 66; //66  36  28
      case 'Circuit Zandvoort':
          return 57; //57  27  19
      case 'Nürburgring':
          return 63; //63  33  25
      case 'Hungaroring':
          return 62; //62  32  24
        case 'Circuit de Barcelona-Catalunya':
          return 68; //68  38  20
      case 'Circuit Zolder':
          return 68; //68  38  30
      case 'Autodromo Enzo e Dino Ferrari':
          return 59;
        default:
          return 60;
      }
    }

function miGetSPlashAndDashDeltatime() {
	var standingTime = 3; // regular time in pits for just 1L of fuel
	var regularTime = 30; // regular time in pits for standard pitStopTime
	var regularPitStopDelta = miGetPitstopDeltatime();
	
	// calculate the difference between the standing times
	var timeDelta = regularTime - standingTime;
	
	// now substract the new timeDelta
	var retVal = regularPitStopDelta - timeDelta;
	
	return retVal;	
}

function miCheckACC() {
  if ($prop('DataCorePlugin.CurrentGame') == 'AssettoCorsaCompetizione') {
    return 1;
  } else {
    return 0;
  }
}



function miGetSteeringangle() {
  var angle=0;

  if ($prop('DataCorePlugin.CurrentGame') == 'F12019') {
    angle = $prop('GameRawData.PlayerCarTelemetryData.m_steer')*180;
    return angle; 
  }

  if ($prop('DataCorePlugin.CurrentGame') == 'CodemastersDirtRally2') {
    angle = $prop('GameRawData.Steer')*360; return angle; 
  }

  if (miCheckACC()) {
     
    if (($prop('CarId') == "")) { return 0; }

    if ($prop('CarId').indexOf("ferrari")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*240; return angle; }
    if ($prop('CarId').indexOf("porsche")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*400; return angle; }
    if ($prop('CarId').indexOf("mclaren")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*240; return angle; }
    
    if ($prop('CarId').indexOf("amr")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*320; return angle; }
    if ($prop('CarId').indexOf("audi")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*360; }
    if ($prop('CarId').indexOf("bentley")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*320; return angle; }    
    if ($prop('CarId').indexOf("bmw_m6")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*283; return angle; }
    if ($prop('CarId').indexOf("jaguar")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*360; return angle; }  
    if ($prop('CarId').indexOf("honda")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*310; return angle; }
    if ($prop('CarId').indexOf("gallardo")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*360; return angle; }  
    if ($prop('CarId').indexOf("lamborghini")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*310; return angle; }    
    if ($prop('CarId').indexOf("lexus")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*320; return angle; }    
    if ($prop('CarId').indexOf("mercedes_amg_gt3")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*320; return angle; }
    if ($prop('CarId').indexOf("nissan")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*320; return angle; }
    
    // GT4s
    if ($prop('CarId').indexOf("alpine")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*360; return angle; }
    if ($prop('CarId').indexOf("bmw_m4")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*246; return angle; }
    if ($prop('CarId').indexOf("chevrolet")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*310; return angle; }
    if ($prop('CarId').indexOf("ginetta")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*360; return angle; }
    if ($prop('CarId').indexOf("ktm")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*290; return angle; }
    if ($prop('CarId').indexOf("maserati")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*450; return angle; }
    if ($prop('CarId').indexOf("mercedes_amg_gt4")+1) { angle = $prop('GameRawData.Physics.SteerAngle')*246; return angle; }
    
  }
  
  return angle;
    
}



function miGetFuelsafelaps() {
  return 2;
}

function miGetFuelcalc(index) {
  
  var times = [90, 60, 45, 25, 12, 10];  // change this values to your preferred race times in minutes
  //return times.length;
  if (index >= times.length) { return "---"; }
    
  var safeLaps = miGetFuelsafelaps();  // additional laps to calculate safe fuel amount
  
  var ret = "xx";
  var fuelPerLap = $prop('DataCorePlugin.Computed.Fuel_LitersPerLap');
  var sessionBest = $prop('BestLapTime');
  var duration = times[index];
  
  ret = duration + "'" + ": ";
 
  if (timespantoseconds(sessionBest)<=0 ) { ret+="---L"; return ret }
  
  var safeFuel = Math.round( (duration/(timespantoseconds(sessionBest)/60) + safeLaps) * fuelPerLap);
 
  ret+=safeFuel + "L";

  return ret;
}

function miGetWeatherForecast() {
  let images=['rain_none', 'rain_drizzle', 'rain_light', 'rain_medium', 'rain_heavy', 'rain_storm'];
  if (miCheckACC()) {    
    return images[$prop('GameRawData.Graphics.rainIntensity')];
  } 
}


function miGetLeaderboardposition(repeatindex) {
  var max = 48;  // maximum lines on Leaderboard
  var factor = 1/2;
  var position;
  var indexAdd = 0;

  if($prop('Position') > max*factor) indexAdd = Math.round($prop('Position')-max*factor);

  indexAdd = Math.min(indexAdd,($prop('OpponentsCount')-max));
  indexAdd = Math.max(indexAdd,1);

  position = repeatindex + indexAdd;
  
  return position;
}

function miGetPitstopDeltaMaxGapTime() { return 2; } // ignore cars with gap +/- to pit window bigger than this

function miGetPitstopRenderingSkip() { return 20; }


function miGetPitstopDeltaGap(i) {
    
  // not needed? var pitStopTime = miGetPitstopDeltatime();
  var gapToRejoin;
  var carGap = drivergaptoplayer(i); // if the car is behind us, the gap is already correct
  
  if (!isplayer(i) && carGap!=null) {
    if (carGap <= 0) {  // when in front, calculate the gap from behind
      var lastLapSeconds = timespantoseconds(driverlastlap(i));
      var lapGap = drivercurrentlap(i) - $prop('CurrentLap'); // FIXXXME use later!				
      carGap = lastLapSeconds - Math.abs(carGap);  // use last Lap of driver as total time and subtract the distance to the player
    } 
    
    /*if (carGap > pitStopTime) { 
      gapToRejoin = carGap - pitStopTime; 
    } else {
      gapToRejoin = carGap;
    } */     
    
  }   
    
  return carGap;
}


function miGetPDTColor(position) {
  var retval = 'transparent';

  if ($prop('CurrentLap')>1) { 
    var maxGapTime = miGetPitstopDeltaMaxGapTime();
    var pitStopTime = miGetPitstopDeltatime();
	var splashDashTime = miGetSPlashAndDashDeltatime();
	
    var gap = miGetPitstopDeltaGap(position);
    
    if ((gap < pitStopTime+maxGapTime) && (gap > pitStopTime-maxGapTime) ) { retval = 'lightblue';}
    if ((gap < pitStopTime+1) && (gap > pitStopTime-1) ) { retval = 'darkred'}
	if ((gap < splashDashTime+maxGapTime) && (gap > splashDashTime-maxGapTime) ) { retval = 'lightyellow';}
	if ((gap < splashDashTime+1) && (gap > splashDashTime-1) ) { retval = 'darkgreen'}
	
  }

  return retval;
}

function miGetTyrepressureColor(pressure) {
  var cold = '#FF6495ED';
  var optimum = '#FF00FF7F';
  var hot = '#FFFFA500';
  
  var retval = '#FFFFFFFF';
    
  if (miCheckACC()) {
    retval = hot;
    
    var tyreRain = $prop('GameRawData.Graphics.RainTyres');
    var tyreDryName = $prop('GameRawData.StaticInfo.dryTyresName');
    var tyreCompound = $prop('GameRawData.Graphics.TyreCompound');
    
    if (tyreRain) {    
      if (pressure <= 31.0) {
        if (pressure >= 29.5) {
          retval = optimum;
        } else {
          retval = cold;
        }
      }
      return retval;
    } 
    
    if (tyreDryName == 'DHD2') {  // slightly different values for 2020 and 2019
      if (pressure <= 28.0) {
        if (pressure >= 27.5) {
          retval = optimum;
        } else {
          retval = cold;
        }
      }
      return retval;
    }
    
    if (tyreDryName == 'DHE') {  // slightly different values for 2020 and 2019
      if (pressure <= 27.8) {
        if (pressure >= 27.3) {
          retval = optimum;
        } else {
          retval = cold;
        }
      }
      return retval;
    }
    
    if (tyreDryName == 'DHA') {  // GT4
      if (pressure <= 27.5) {
        if (pressure >= 26.5) {
          retval = optimum;
        } else {
          retval = cold;
        }
      }
      return retval;
    }
    
    // use as default, if none of above is given
    if (pressure <= 28.0) {
      if (pressure >= 27.3) {
        retval = optimum;
      } else {
        retval = cold;
      }
    }
  }
  return retval;
  
}

function miGetCarnameACC() {
  var myMap = {
    'amr_v12_vantage_gt3' : 'Aston Martin Vantage V12 GT3 2013',
    'audi_r8_lms' : 'Audi R8 LMS 2015',
    'bentley_continental_gt3_2016' : 'Bentley Continental GT3 2015',
    'bentley_continental_gt3_2018' : 'Bentley Continental GT3 2018',
    'bmw_m6_gt3' : 'BMW M6 GT3 2017',
    'jaguar_g3' : 'Emil Frey Jaguar G3 2012',
    'ferrari_488_gt3' : 'Ferrari 488 GT3 2018',
    'honda_nsx_gt3' : 'Honda NSX GT3 2017',
    'lamborghini_gallardo_rex' : 'Lamborghini Gallardo G3 Reiter 2017',
    'lamborghini_huracan_gt3' : 'Lamborghini Huracan GT3 2015',
    'lamborghini_huracan_st' : 'Lamborghini Huracan ST 2015',
    'lexus_rc_f_gt3' : 'Lexus RCF GT3 2016',
    'mclaren_650s_gt3' : 'McLaren 650S GT3 2015',
    'mercedes_amg_gt3' : 'Mercedes AMG GT3 2015',
    'nissan_gt_r_gt3_2017' : 'Nissan GTR Nismo GT3 2015',
    'nissan_gt_r_gt3_2018' : 'Nissan GTR Nismo GT3 2018',
    'porsche_991_gt3_r' : 'Porsche 991 GT3 R 2018',
    'porsche_991ii_gt3_cup' : 'Porsche9 91 II GT3 Cup 2017',
    'amr_v8_vantage_gt3' : 'Aston Martin V8 Vantage GT3 2019',
    'audi_r8_lms_evo' : 'Audi R8 LMS Evo 2019',
    'honda_nsx_gt3_evo' : 'Honda NSX GT3 Evo 2019',
    'lamborghini_huracan_gt3_evo' : 'Lamborghini Huracan GT3 EVO 2019',
    'mclaren_720s_gt3' : 'McLaren 720S GT3 2019',
    'porsche_991ii_gt3_r' : 'Porsche 911 II GT3 R 2019',
    'alpine_a110_gt4' : 'Alpine A110 GT4 2018',
    'amr_v8_vantage_gt4' : 'Aston Martin Vantage AMR GT4 2018',
    'audi_r8_gt4' : 'Audi R8 LMS GT4 2016',
    'bmw_m4_gt4' : 'BMW M4 GT42 018',
    'chevrolet_camaro_gt4r' : 'Chevrolet Camaro GT4 R 2017',
    'ginetta_g55_gt4' : 'Ginetta G55 GT4 2012',
    'ktm_xbow_gt4' : 'Ktm Xbow GT4 2016',
    'maserati_mc_gt4' : 'Maserati Gran Turismo MC GT4 2016',
    'mclaren_570s_gt4' : 'McLaren 570s GT4 2016',
    'mercedes_amg_gt4' : 'Mercedes AMG GT4 2016',
    'porsche_718_cayman_gt4_mr' : 'Porsche 718 Cayman GT4 MR 2019',
    'ferrari_488_gt3_evo' : 'Ferrari 488 GT3 Evo 2020',
    'mercedes_amg_gt3_evo' : 'Mercedes AMG GT3 Evo 2020'
  }
  
  return myMap[$prop('CarModel')];
}