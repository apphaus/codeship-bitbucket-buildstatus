# codeship-bitbucket-buildstatus is no longer maintained

Please note that [Codeship now offer this integration](https://community.codeship.com/t/now-available-bitbucket-build-status-api/1135) themselves, which is enabled by default.

# codeship-bitbucket-buildstatus

Update Bitbucket commits with their Codeship build status automatically.

Display the status of your Codeship builds [right within Bitbucket](http://blog.bitbucket.org/2015/11/18/introducing-the-build-status-api-for-bitbucket-cloud/) on bitbucket.org.

## How it works

Using a combination of Codeship's [webhook feature](https://codeship.com/documentation/integrations/webhooks/) and Bitbucket's [build status API](http://blog.bitbucket.org/2015/11/18/introducing-the-build-status-api-for-bitbucket-cloud/), this app automatically keeps Bitbucket updated with the progress and outcomes of your Codeship builds.

## Running on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

1. Use the Heroku Deploy button above, or alternatively clone this repository and [deploy it to Heroku using Git](https://devcenter.heroku.com/articles/git#creating-a-heroku-remote)
1. Retrieve or generate an API key for your team on Bitbucket via. your team's profile page.
1. Set the `BITBUCKET_USERNAME` and `BITBUCKET_API_KEY` [environment variables](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application) to your team's name (or your username) and API key (or password) respectively.
1. Set the `HTTP_BASIC_USER` and `HTTP_BASIC_PASS` [environment variables](https://devcenter.heroku.com/articles/config-vars#setting-up-config-vars-for-a-deployed-application) to a username and password (your choice - but use the same details in the step below) to protect this application from unauthorised access.
1. Specify [the webhook URL](https://codeship.com/documentation/integrations/webhooks/) on Codeship for each of your projects, which should point to your Heroku application URL and look something like;
    - `https://<HTTP_BASIC_USER>:<HTTP_BASIC_PASS>@<YOUR_APP_NAME_ON_HEROKU>.herokuapp.com/codeship/webhook`
    - e.g. `https://username:password@inventive-app-name.herokuapp.com/codeship/webhook`
1. Whenever Codeship runs your builds, the status of these builds will now be reflected within bitbucket.org against commits and pull requests

## Running Locally

1. Run `npm install` to install project dependencies
1. Set the `BITBUCKET_USERNAME` and `BITBUCKET_API_KEY` environment variables to your team's name (or your username) and API key (or password) respectively.
1. Set the `HTTP_BASIC_USER` and `HTTP_BASIC_PASS` environment variables to a username and password (your choice - but use the same details in your URL below) to protect this application from unauthorised access.
1. Run the application with `npm start` - by default, the server will run on port 3000. This can be modified by setting the PORT environment variable, requests by default will be accepted at;
    - `https://<HTTP_BASIC_USER>:<HTTP_BASIC_PASS>@localhost:3000/codeship/webhook`
    - e.g. `https://username:password@localhost:300/codeship/webhook`
1. In order for your application to receive webhook notifications from Codeship, you will need to [set the webhook URL](https://codeship.com/documentation/integrations/webhooks/) for each project and ensure that your firewall/router does not block inbound requests on this port (they likely do). For development purposes, you can use `curl` in order to to fake a Codeship webhook notification.

## Inspiration

Hat-tip to [bitbucket-codeship-status](https://github.com/chesleybrown/bitbucket-codeship-status) which provided the inspiration for the implementation of this project. The unaffiliated [bitbucket-codeship-status](https://github.com/chesleybrown/bitbucket-codeship-status) project adds a Codeship status badge image to pull requests as they are created.
