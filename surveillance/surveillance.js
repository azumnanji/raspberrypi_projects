var GPIO = require('pigpio').Gpio,
cameraModule = require('./CameraModule'),
emailModule = require('./EmailModule');

var PIR_out= new GPIO(19,{mode: GPIO.INPUT,alert: true}),
red_LED= new GPIO(17,{mode: GPIO.OUTPUT}),
buzzer= new GPIO(26,{mode: GPIO.OUTPUT}),
trigger = new GPIO(16, {mode: GPIO.OUTPUT}),
echo = new GPIO(21, {mode: GPIO.INPUT, alert: true});

red_LED.digitalWrite(0);


PIR_out.on('alert', function(level, tick){
  if(level==1) {
    cameraModule.takePicture(function (callback) {
    var result = callback;
    if (result == 'success') {
      emailModule.sendMailPhoto()
   }
  })
  console.log('PIR : Raccoon Alert..!!')
  red_LED.digitalWrite(level);
  buzzer.digitalWrite(level);
}
else {
  red_LED.digitalWrite(level);
  buzzer.digitalWrite(level);
 }
})


trigger.digitalWrite(0);
var MICROSECDONDS_PER_CM = 1000000/33000;
// Trigger a distance measurement once per second
setInterval(function () {
   trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 5000);
//The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
var startTick;
echo.on('alert', function (level, tick) {
var endTick,
diff;
if (level == 1) {
  startTick = tick;
}
else {
  endTick = tick;
  diff = (endTick >> 0) - (startTick >> 0); //Unsigned 32-bit arithmetic
  var actualDist = (diff / 2 / MICROSECDONDS_PER_CM) ;
  if (actualDist < 10){
    console.log('Ultrasonic : Raccoon Alert...!!')
    red_LED.digitalWrite(1);
    buzzer.digitalWrite(level);
    cameraModule.takeVideo(function (callback) {
       var result = callback;
       if (result == 'success'){
         emailModule.sendMailVideo() 
       }
   })
  }
  else {
   red_LED.digitalWrite(0);
   buzzer.digitalWrite(0);
  }
 }
});