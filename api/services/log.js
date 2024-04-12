const {transports, createLogger, format} = require('winston');

// Gunanya buat nyetting log yang akan dikeluarin, baik itu ke file berupa output maupun console terminal 
var options = {
    file: {
        level: 'info',
        filename: `./log/api.log`,
        handleExceptions: true,
        json: true,
        colorize: false
    },
    error: {
        level: 'error',
        filename: `./log/error.log`,
        handleExceptions: true,
        json: true,
        colorize: false
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
};

// Panggil class si winston dengan setting yang udah kita buat
var logger = createLogger({
    format: format.combine(
        format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
        format.json()
    ),
    transports: [
        new transports.Console(options.console),
        // new transports.File(options.file),
        // new transports.File(options.error)
    ],
    exitOnError: false, // Aplikasi gabakalan berhenti kalo ada exception
});

// Bikin file stream (nulis file) yang dimana bakalan dipake sama morgan (sm*ash) ups hahaha.`
logger.stream = {
    write: function(message, encoding) {
        // pake log level info aja supaya outputnya dipake sama file stream dan console.
        logger.info(message);
    },
};

module.exports = logger;