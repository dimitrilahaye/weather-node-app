const request = require('postman-request');

// mapbox
const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxAPI = 'pk.eyJ1IjoibXlnZW9tYXJrZXQtZGV2IiwiYSI6ImNrYXF3Y2VqMzAzdWkydW1zazM3NWNhNm4ifQ.575INAruYjWzankwmf71hg';

const geocode = (adresse, callback) => {
    request({
        url: `${mapboxURL}${encodeURIComponent(adresse)}.json?access_token=${mapboxAPI}&limit=1`,
        json: true
    }, (error, {statusCode, body}) => {
        if (error) {
            callback(error);
        } else if (statusCode === 200) {
            const data = body;
            if (!data.features.length) {
                callback('No data found');
            } else {
                callback(undefined, data.features[0]);
            }
        } else {
            callback(body.message);
        }
    });
}

module.exports = geocode;