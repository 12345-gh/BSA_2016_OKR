var amqp = require('amqplib/callback_api');

function QueueService(){
	amqp.connect('amqp://localhost', function(err, conn) {
	  conn.createChannel(function(err, ch) {
	    var ex = 'tokens';

	    ch.assertExchange(ex, 'direct', {durable: false});

	    ch.assertQueue('', {exclusive: true}, function(err, q) {
	      console.log(' [*] Waiting for logs. To exit press CTRL+C');

	      var severity = 'info';
	      ch.bindQueue(q.queue, ex, severity);

	      ch.consume(q.queue, function(msg) {
	        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
	      }, {noAck: true});
	    });
	  });
	});
}

QueueService.prototype.publish = function() {
	
};

module.exports = new TokenService();