const express = require('express');
const bodyParser = require('body-parser');
const cognitoService = require('./Sign-in-and-Sign-up/cognitoService');

const app = express();
app.use(bodyParser.json());

// Sign Up
app.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    await cognitoService.signUp(email, password, firstName, lastName);
    res.status(200).json({ message: 'User registered. Please check your email for verification.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirm Sign Up
app.post('/confirm-signup', async (req, res) => {
  const { email, code } = req.body;
  try {
    await cognitoService.confirmSignUp(email, code);
    res.status(200).json({ message: 'User confirmed successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign In
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await cognitoService.signIn(email, password);
    res.status(200).json({ token: response.AuthenticationResult.IdToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Forgot Password
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    await cognitoService.forgotPassword(email);
    res.status(200).json({ message: 'Password reset code sent to your email.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Confirm Password
app.post('/confirm-password', async (req, res) => {
  const { email, code, newPassword } = req.body;
  try {
    await cognitoService.confirmPassword(email, code, newPassword);
    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});