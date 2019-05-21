


var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'testerADD@gmail.com',
     pass: 'TestAddT'
   }
});

const videoMailOptions = {
   from: 'testerADD@gmail.com',
   to: 'azumnanji@gmail.com',
   subject: 'Raccoon Detected!',
   html: 'Raccoon was detected outside your house...',
   attachments: [{
    filename: 'RaccoonVideo.h264',
    path: '/home/pi/surveillance/videos/video.h264'
   }]
};



const photoMailOptions = {
  from: 'testerADD@gmail.com',
  to: 'azumnanji@gmail.com',
  subject: 'Raccoon Detected!',
  html: 'Raccoon was detected outside your house...',
  attachments: [{
    filename: 'RaccoonImage.jpg',
    path: '/home/pi/surveillance/photos/photo.jpg'
   }]
};



module.exports.sendMailVideo = function () {
   transporter.sendMail(videoMailOptions, function (err, info) {
      if(err){
        console.log(err.toString());
      }
      else{
        console.log('Sent video via email..!!');
      }
   });
}

module.exports.sendMailPhoto = function (){
   transporter.sendMail(photoMailOptions, function (err, info) {
   if(err){
     console.log(err.toString())
   }
   else{
    console.log('Sent photo via email..!!');
   }
  });
}