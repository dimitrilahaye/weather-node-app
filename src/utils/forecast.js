const request = require('postman-request');

// weatherstack
const weatherstackURL = 'http://api.weatherstack.com/';
const weatherstackAPI = '13e7a7af70d909fd9bbbfc6c6ef67a78';

const getWeather = (coordinates, callback) => {
    request({
        url: `${weatherstackURL}current?access_key=${weatherstackAPI}&query=${coordinates.join(',')}&units=f`,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(error);
        } else if (!body.error) {
            const data = body;
            callback(undefined, data);
        } else {
            callback(body.error.info);
        }
    });
}

module.exports = getWeather;