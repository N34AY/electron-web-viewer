const winston = require('winston')
require('winston-daily-rotate-file')


const networkLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.DailyRotateFile({
			filename: 'C:/ProgramData/GRG/UI/logs/%DATE%/network.log',
			datePattern: 'MM-DD-HH',
			maxSize: '20m',
			maxFiles: '14d'
		})
	],
})

const websocketsLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.DailyRotateFile({
			filename: 'C:/ProgramData/GRG/UI/logs/%DATE%/websockets.log',
			datePattern: 'MM-DD-HH',
			maxSize: '20m',
			maxFiles: '14d'
		})
	],
})

const consoleLogger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.DailyRotateFile({
			filename: 'C:/ProgramData/GRG/UI/logs/%DATE%/console.log',
			datePattern: 'MM-DD-HH',
			maxSize: '20m',
			maxFiles: '14d'
		})
	],
})


module.exports = function (window) {
	const logTypes = ['log', 'warning', 'error']

	window.webContents.debugger.on('message', (event, method, params) => {

		switch (method) {
			case 'Network.responseReceived':
				if (params.type != 'XHR') break

				window.webContents.debugger.sendCommand('Network.getResponseBody', { requestId: params.requestId }).then(function (response) {
					networkLogger.info({
						requestId: params.requestId,
						url: params.response.url,
						body: response
					})
				})

			case 'Network.webSocketFrameSent':
				websocketsLogger.info({
					type: 'sended',
					requestId: params.requestId,
					url: params.response
				})

			case 'Network.webSocketFrameReceived':
				websocketsLogger.info({
					type: 'received',
					requestId: params.requestId,
					url: params.response
				})

			case 'Runtime.consoleAPICalled':
				if (logTypes.includes(params.type)) {
					consoleLogger.info({
						type: params.type,
						value: params.args[0].value,
						stackTrace: params.type == 'error' ? params.stackTrace : null
					})
				}

			default:
				break
		}
	})
}
