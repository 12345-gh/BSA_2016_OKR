var nodemailer = require('nodemailer');

function MailService() {

}

// data.to: String
// data.from: String
// data.subject: String
// data.text: Html / String
MailService.prototype.sendEmail = function(data, callback) {
	var smtpTransport = nodemailer.createTransport({
		host: 'mail.binary-studio.com',
		port: 465,	
		auth: {
			user: 'howdy@binary-studio.com',
			pass: 'Howdy38Berkley'
		},
		tls: {
			rejectUnauthorized: false
		},
		debug: true,
		secure: true
	});
	
	var mailOptions = {
		from: 'howdy@binary-studio.com',
		to: data.to,
		subject: data.subject,
		html: '<div>' + data.text + '</div>'
	};

	smtpTransport.sendMail(mailOptions, function(err) {
		console.log("MAIL ERROR: ", err);
		callback(err);
	});
};

module.exports = new MailService();