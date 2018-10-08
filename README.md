[![Build Status](https://travis-ci.org/arrested-developer/cra-plus-express.svg?branch=master)](https://travis-ci.org/arrested-developer/cra-plus-express)
[![codecov](https://codecov.io/gh/arrested-developer/cra-plus-express/branch/master/graph/badge.svg)](https://codecov.io/gh/arrested-developer/cra-plus-express)
# Create-React-App with Express Server 👯‍♂️
> A step-by-step guide to use both, side-by-side

## About

I couldn't find any guides out there that satisfied my need for:
* A simple project setup 👼🏼
* Full testing of Express server and React client 👩🏼‍🔬
* Code coverage reporting 🤓

After battling my way through a walkthrough that insisted I needed to set up a create-react-app project _inside_ an existing Express node project, I decided there had to be a better way.

I hope this can help you to avoid spending hours (days?) on your project setup!

## Installation

Feel free to clone this project and use it as boilerplate to start your project off. I'm not a big fan of unneccessary boilerplate so I've also listed the essential steps further down this readme if you want to set up your own project from scratch.

`git clone`

`npm install`

The Express server's entry point is `server.js` in the root folder. This takes care of running the server and serving up the React files via a static route in production. It also sends back any unresolved requests to React so they can be used with React Router if required.

Your project files are all inside `src`. Your server files are all inside `src/server` and the file structure is set up ready for your models and controllers.

An example controller lives at `src/controllers/hello.js` and serves the vital purpose of saying hello.
