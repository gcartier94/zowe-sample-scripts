const express = require('express');
const request = require('request');
const child_process = require('child_process');

// Instantiates Express and assigns our app variable to it
const app = express();
app.use(express.urlencoded());

// Again, we define a port we want to listen to
const PORT=4390;

// Lets start our server
app.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Example app listening on port " + PORT);
});


app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

app.post('/console', function(req, res) {
    const params = req.body;
    console.log(params);
    res.send('One second, please...');
    params.my_response =  child_process.execSync('zowe console issue cmd "'+params.text+'"');
    post_response(params);
});

app.post('/jcl', function(req, res) {
    const params = req.body;
    console.log(params);
    res.send('One second, please...');
    params.my_response =  child_process.execSync('zowe jobs submit ds "'+params.text+'" --vasc');
    post_response(params);
});

app.post('/rexx', function(req, res) {
    const params = req.body;
    console.log(params);
    res.send('One second, please...');
    params.my_response =  child_process.execSync('zowe tso issue cmd "EXEC \''+params.text+'\' EXEC" -a AUTOMATION');
    post_response(params);
});

app.post('/list-dsn', function(req, res) {
    const params = req.body;
    console.log(params);
    res.send('One second, please...');
    params.my_response =  child_process.execSync('zowe files list ds "'+params.text+'"');
    post_response(params);
});

app.post('/list-members', function(req, res) {
    res.send('One second, please...');
    const params = req.body;
    console.log(params);
    params.my_response =  child_process.execSync('zowe files list am "'+params.text+'"');
    post_response(params);
});

app.post('/ipl', function(req, res) {
    res.send('One second, please...');
    const params = req.body;
    console.log(params);
    params.my_response =  child_process.execSync('zowe console issue cmd "d iplinfo"');
    post_response(params);
});

function post_response(params) {

    console.log("posting delayed response")
    console.log(params.my_response.toString());
    // Set up the options for the HTTP request.
    var options = {
        // Use the Webhook URL supplied by the slack request.
        uri: params.response_url,
        method: 'POST',
        // Slack expects a JSON payload with a "text" property.
        json: { "response_type": "in_channel", "text": params.my_response.toString(), "parse": "full" }
    };


    // Make the POST request to the Slack incoming webhook.
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log("post OK");
        }
    })
};