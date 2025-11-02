# DevTinder APIs

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password - Forgot password API 
(
- Take existing pass with new password
- Validate password 
- bcrypt.compare
- update pass in db
)

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

- GET /user/connections
- GET /user/requests - requests received 
- GET /user/feed - Gets you the profiles of other users on platform

