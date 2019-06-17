var nodemailer = require('nodemailer');
var schedule = require('node-schedule');;

/**Credentials for mailing service we are using gmail */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wisebatt7@gmail.com',
    pass: 'tfy456ekucfh'
  }
});

// executes every day at 8pm and send email to all suscribers
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 20;
rule.minute = 00;
schedule.scheduleJob(rule, function() {

	/**random user generator */
function makeid(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_-?<>{}|';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

/**message context- replace your email with email address */
var mailOptions = {
	from: 'wisebatt7@gmail.com',
	to: 'youremail',
	subject: 'Sending Email suscribtion using random id:' + makeid(8),
	text: 'marketing email test for wisebatt contact me my id : ' + makeid(8),
  };
  /**resolve if err */
  transporter.sendMail(mailOptions, function(error, info){
	if (error) {
	  console.log(error);
	} else {
	  console.log('Email sent: ' + info.response);
	}
  });
});
