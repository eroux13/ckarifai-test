// Initialize Clarifai Variables
const USER_ID = 'eroux13';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '1383dc32a41b45d09a7c25e221adece7';
const APP_ID = 'clarifaiTest';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'generalImageRecognition';
const IMAGE_URL = 'https://media.timeout.com/images/105862967/750/562/image.jpg';
// This is optional.You can specify a model version or the empty string for the default
const MODEL_VERSION_ID = '';

// Import dependencies
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call.
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

