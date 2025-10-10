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
