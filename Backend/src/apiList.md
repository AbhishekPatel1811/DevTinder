# DevTinder APIs

# authRouter
- POST /signup
- POST /login
- POST /logout

# profileRouter 
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password - Forgot password API 
(
- Take existing pass with new password
- Validate password 
- bcrypt.compare
- update pass in db
)

# connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

# userRouter
- GET /user/connections
- GET /user/requests - requests received 
- GET /user/feed - Gets you the profiles of other users on platform

