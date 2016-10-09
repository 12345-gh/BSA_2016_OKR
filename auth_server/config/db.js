module.exports = {
	uri: 'mongodb://admin:admin@ds029585.mlab.com:29585/intranet-mediator',
	opts: {
		server: {
			socketOptions: {
				keepAlive: 1,
				connectTimeoutMS: 30000
			}
		}
	}
};