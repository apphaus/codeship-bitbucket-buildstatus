/*jslint node: true */

module.exports = function () {
    'use strict';

    var express = require('express'),
        basicAuth = require('basic-auth-connect'),
        request = require('request'),
        bodyParser = require('body-parser'),
        HTTP_BASIC_USER = process.env.HTTP_BASIC_USER,
        HTTP_BASIC_PASS = process.env.HTTP_BASIC_PASS,
        BITBUCKET_USERNAME = process.env.BITBUCKET_USERNAME,
        BITBUCKET_API_KEY = process.env.BITBUCKET_API_KEY,
        app = express();

    function postBitbucketCommitStatus(build, postStatusCallback) {
        var bitbucket_state = 'FAILED',
            bitbucket_url = 'https://' + BITBUCKET_USERNAME + ':' + BITBUCKET_API_KEY + '@api.bitbucket.org/2.0/repositories/' + build.project_name + '/commit/' + build.commit_id + '/statuses/build';

        switch (build.status) {
        case 'success':
            bitbucket_state = 'SUCCESSFUL';
            break;
        case 'testing':
            bitbucket_state = 'INPROGRESS';
            break;
        }

        request({
            url: bitbucket_url,
            method: 'POST',
            json: {
                state: bitbucket_state,
                key: 'CODESHIP-' + build.build_id,
                name: 'Codeship build #' + build.build_id,
                url: build.build_url,
                description: 'Build status: \'' + build.status + '\''
            }
        }, function (err, response, body) {
            if (err) {
                console.error('Error updating Bitbucket commit status:', err);
            }

            if (body && body.error) {
                console.error('Bitbucket returned an error: ', body.error);
            }

            if (response.statusCode !== 200) {
                console.error('Bitbucket returned a non-200 statuscode of', response.statusCode);
            }

            postStatusCallback(response.statusCode);
        });
    }

    app.use(bodyParser.json());
    app.enable('trust proxy');

    app.get('/', function (ignore, res) {
        res.status(404).end();
    });

    app.post('/codeship/webhook', basicAuth(function (username, password) {
        return (username === HTTP_BASIC_USER && password === HTTP_BASIC_PASS);
    }), function (req, res) {
        if (!req.body || !req.body.build) {
            console.error('Invalid request: missing \'build\'');
            res.status(400).end();
            return;
        }

        postBitbucketCommitStatus(req.body.build, function (status_code) {
            status_code = (status_code === 200) ? 200 : 500;
            res.status(status_code).end();
        });
    });

    return app;
};
