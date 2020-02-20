import morgan from 'morgan';
import LoggerService from './';

LoggerService.stream = {
    write: message => LoggerService.info(message.substring(0, message.lastIndexOf('\n')))
};

module.exports = morgan(
    ':method :url :status :response-time ms - :res[content-length]',
    { stream: LoggerService.stream }
);