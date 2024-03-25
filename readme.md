API for "LEARN ENGLISH WORDS"

An API designed to manage the word database and user accounts for the "LEARN ENGLISH WORDS" application. Built with Node.js using Express.js and Mongoose to interact with a MongoDB database. Handles user registration, login, and word management functionalities. Implements JSON Web Tokens (JWT) for user authentication.

Authentication:

JSON Web Tokens (JWT) are used as the authentication mechanism.
Users must provide a JWT in the request header to access protected routes.
Notes:

All database requests must be authenticated.
Users can only manage their own data.
The API is deployed on a server and available for use with the frontend.

