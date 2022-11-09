if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/weather', (req, res) => {
    
    res.set({
        "Accept": "application/json",
        "Content-Type": "application/json",
    });
    
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    let place;
    const location = req.body;
    for (var i in location) place = JSON.parse(i).place;
    
    place = place.replace(/ /g,"%20");
    const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${place}`;
    
    axios.get(url)
    .then(data => res.json(data.data.current))
    .catch(err => console.log(err));
})

const PORT = process.env.PORT || 5500
app.listen(PORT, () => console.log(`server running on port ${PORT}`));