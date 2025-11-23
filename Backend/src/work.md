Create a repository
Initialize the repository
node_modules, package.json, package-lock.json
Install express
create a server
Listen to port 3000
Write request handlers for /test, /hello
Install nodemon and update scripts inside package.json
What are dependencies
What is the use of "-g" while npm install
Difference between caret and tilde (^ vs ~)

Initialize git
gitignore
Create a remote repo on github
Push all code to remote origin
Play with routes and route extensions ex: /hello, /, /hello2, /xyz
Order of the routes matter a lot
Install Postman app and make a workspace/collections to test API calls
Write logic to handle GET, POST, PATCH, DELETE API calls and test them on postman
(Advanced Routing)
Explore routing and use of ?, +, *, () in the routes
Use of regex in routes /a/, /.*fly$/
Reading the query params (/user?userId=101) in the routes
Reading the dynamic routes /user/:userId params

Multiple Route handlers - Play with the code
next()
next function and errors along with res.send()
app.use("/route", rH, rH2, [rH3, rH4], rH5)
What is Middleware? why do we need it
-> Because it is called in middle of the request chain or method chain and express calls it one after another
How express JS basically handles requests behind the scenes
-> A request comes in GET request express checks that whether the route is matching somewhere so what it will do is go through the chain of middlewares and then it will handle the response, If it does not find any matching route then it hangs up or if any of then is sending the response back it sends and goes no further this is how express works
Difference between app.use vs app.all
Write a dummy auth middleware for all user routes, except /user/login
Error handling using app.use((err, req, res, next) => {})

What is Mongoose
Whenever you are connecting your Nodejs application to the MongoDB database mongoose is a very elegant, very amazing library to create schemas, models and talk to database
Create a free cluster on MongoDB official website (Monogo Atlas)
Install mongoose library
Connect your application to the database "Connection URL"/devTinder
Call the connectDB function and connect to database before starting application on port 3000
Create a user schema & user Model
Create a POST /signup API call to add data to the database
Push some documents using API call from postman
Error handling using try and catch

JS object vs JSON (difference)
Add the express.json to your app
express.json() middleware -> It helps you read the JSON object/data sent from client and converts it to JS object and adds the parsed JS object to req.body
Make your signup API dynamic to recieve data from the end user
API - GET user by email
API - GET feed api - find({}) - get all users from database
Create a delete user API
Create a update user API
Explore the mongoose documentation for Model methods.
API - update user with email ID

Explore Schema type options from the documentation
Add required, unique, minLenght, maxLength, trim, lowercase
Add default values
Create a custom validation function for gender
Improve the DB schema - PUT all appropriate validations on each field in schema
Add timestamps to the userSchema
Add API level validation on Patch request & signup Post API
Data sanitization - Add API validation for each field
Install validator, explore validator library functions and use it for password, email and photoURL

Validate data in Signup API
Install bcrypt package 
Create a PasswordHash using bcrypt.hash & save the user in encrypted password
Create Login API 
Compare passwords and throw errors if email or password is invalid 

Authentication
Login - whenever a user is logining in server will create a token attach it into a cookie and send back. now, that cookie will be stored by the browser any requests comes in next the cookie will be sent along with it then we will validate it once again and then do anything we want to do in our application.
Reading cookies using -> cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back using (req.cookies)
- install jsonwebtoken
- In Login API, after email and password validation, create a JWT token and send it to user inside cookies
- read the cookies inside your profile API and find the logged in user
userAuth middleware 
Add the userAuth middleware in /profile API and a new /sendConnectionRequest API
Set the expiry of JWT token and cookies to 7 days
Schema methods -> Create userSchema methods to getJWT()

Read docs for express.Router
Create routes folder for managing auth, profile, request routers
Create authRouter, profileRouter, requestRouter
Create POST /logout API
Create PATCH /profile/edit
Create PATCH /profile/password API - Forgot password

Create ConnectionRequest Schema 
Send Connection Request  API
Proper validation of data, think of all corner cases
Read 
- schema.pre("save", function(){})
- $or and $and query in mongoose
- Compound Indexes (MongoDB docs)
- why do we need an index in DB
- what are adv, disAdvantages of creating index
- why we should not add lot of indexes 

Create ReviewConnectionRequest API. perform proper validations for POST API
- Creating relation between collections using ref and populate
ref - use it in schema to reference to a collection
populate - use it to get the fields data from reference table 
Create GET /user/request/received with all the checks
Create GET /user/connections API

Logic for GET /feed API
Explore the $nin, $ne, $and 
.skip() - How many documents you skip from the starting
.limit() - How many documents you want 