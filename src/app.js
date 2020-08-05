const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// init server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server is running on port ' + port));

// paths for express
const public = path.join(__dirname, '..', 'public');
const templates = path.join(__dirname, '..', 'templates');

// set static and views
app.set('view engine', 'hbs');
app.set('views', path.join(templates, 'views'));
hbs.registerPartials(path.join(templates, 'partials'));
app.use(express.static(public));

// routes
const setPage = (title) => {
    return {title, name: 'Dimitri (Andrew Mead, I love you!!)'};
};

const set404Page = (message) => {
    return {message, ...setPage('404 error')};
};

app.get('', (req, res) => {
    res.render('index', setPage('My weather app'));
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.status(400).send({
            error: 'No address!'
        });
    }
    const {address} = req.query;
    geocode(address, (error, {center} = {}) => {
        if (!error && center) {
            forecast(center, (error, {current} = {}) => {
                if (!error && current) {
                    res.send({current, address})
                } else {
                    res.status(400).send({error});
                }
            });
        } else {
            res.status(400).send({error});
        }
    });
});

// 404 pages
app.get('*', (req, res) => {
    res.render('404', set404Page('Page not found'));
});