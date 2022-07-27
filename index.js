// Initialize Clarifai Variables
const USER_ID = 'eroux13';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '1383dc32a41b45d09a7c25e221adece7';
const APP_ID = 'clarifaiTest';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'general-image-recognition';
const IMAGE_URL = 'https://media.timeout.com/images/105862967/750/562/image.jpg';
// This is optional.You can specify a model version or the empty string for the default
const MODEL_VERSION_ID = '';

// Import dependencies
const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call.
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

// console.log(metadata);

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0];

        console.log("Predicted concepts:");
        for (const concept of output.data.concepts) {
            console.log(concept.name + " " + concept.value);
        }
    }

);