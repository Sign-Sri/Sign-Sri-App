const AWS = require('aws-sdk');

// Configure AWS SDK
AWS.config.update({
  region: 'us-east-1', // Replace with your AWS region
});

const cognito = new AWS.CognitoIdentityServiceProvider();

const userPoolId = 'your-user-pool-id'; // Replace with your User Pool ID
const clientId = 'your-app-client-id'; // Replace with your App Client ID

module.exports = {
  signUp: async (email, password, firstName, lastName) => {
    const params = {
      ClientId: clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'given_name', Value: firstName },
        { Name: 'family_name', Value: lastName },
      ],
    };

    return cognito.signUp(params).promise();
  },

  confirmSignUp: async (email, code) => {
    const params = {
      ClientId: clientId,
      Username: email,
      ConfirmationCode: code,
    };

    return cognito.confirmSignUp(params).promise();
  },

  signIn: async (email, password) => {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    return cognito.initiateAuth(params).promise();
  },

  forgotPassword: async (email) => {
    const params = {
      ClientId: clientId,
      Username: email,
    };

    return cognito.forgotPassword(params).promise();
  },

  confirmPassword: async (email, code, newPassword) => {
    const params = {
      ClientId: clientId,
      Username: email,
      ConfirmationCode: code,
      Password: newPassword,
    };

    return cognito.confirmForgotPassword(params).promise();
  },
};