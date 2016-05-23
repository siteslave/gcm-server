var gcm = require('node-gcm');
var fse = require('fs-extra');

//var message = new gcm.Message();

var message = new gcm.Message();
message.addData('title', 'ประกาศ');
message.addData('message', 'โปรดทราบ โปรดทราบ');
message.addData('content-available', true);
message.addData('chat', { "username": "Satit", "message": "Hello world" });
// message.addData('notId', 2);
// message.addData('image', 'http://res.cloudinary.com/demo/image/upload/w_133,h_133,c_thumb,g_face/bike.jpg');
message.addData('image', 'http://www.pro.moph.go.th/w54/images/ICT/loadlogomoph.png');

var regTokens = [];

var tokens = fse.readJsonSync('./devices.json');

tokens.forEach(v => {
    regTokens.push(v.token);
})

//var regTokens = ["dDrlaaj9Pxo:APA91bFmxaHzJHU3QYqWQGPHZvHwck1wMDzH0cXnN8j2ivA_mi7lkVi-n7vWeDYRtDLVMLQepCCP0inWHG3oZYl4IE8VMfdWWUaOiUnX87seetL56dNPauOFXw5U2B0wYNsG6mfbJI5M"];

// Set up the sender with you API key
var sender = new gcm.Sender('AIzaSyCKChSCsBci6BRju2bB9SvFiSa2Mo4w1vM');

// Now the sender can be used to send messages
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
    if(err) console.error(err);
    else    console.log(response);
});