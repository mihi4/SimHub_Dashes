    function miGetPitstopDeltatime() {
      switch($prop('TrackName')) {  // regular pitstop first, 1L refuel and DT in comment
      case 'Mount Panorama Circuit':
          return 57; //57  27  19
      case 'WeatherTech Raceway Laguna Seca':
          return 59; //59  29  21
      case 'Circuit de Spa-Francorchamps':
          return 95; //95  65  57
      case 'Suzuka Circuit':
          return 65; //65  35  27
      case 'Kyalami Grand Prix Circuit':
          return 56; //56  26  18
      case 'Oulton Park':
          return 46; //
      case 'Snetterton Circuit':
          return 47; //
      case 'Donington Park':
          return 48; //
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

function miGetTyrepressureColor(pressure) {
  var tyreRain = $prop('GameRawData.Graphics.RainTyres');
  var tyreDryName = $prop('GameRawData.StaticInfo.dryTyresName');
  var tyreCompound = $prop('GameRawData.Graphics.TyreCompound');
  
  var cold = '#FF6495ED';
  var optimum = '#FF00FF7F';
  var hot = '#FFFFA500';
  
  var retval = hot;
  
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