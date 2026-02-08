# Building DevTinder Frontend

- Create a Vite + React application
- Removed unnecessary code
- Install Tailwind with ShadCN for components and blocks
- Add a basic navbar and footer to the application
- Setup routing with basic routes
    Install react router dom
    Create BrowserRouter > Routes > Route = /Body > RouteChildren
    Create outlet in Body component
- Configure and complete authentication
    Create a login, signup page
    Install CORS in backend => add middleware to with configuration: origin, credentials: true
    When making API call use axiosInstance, that basically do the whole structured api call with {baseUrl} adnd {withCredentials: true}
    Install Redux toolkit (@reduxjs/toolkit +  react-redux)
       configureStore => Provider => createSlice => add reducer to store
    Login and see if data is stored properly in redux store
    Navbar should update as soon as user logs in
- If token not present redirect to /login
- Complete auth with login, logout feature
- Creating feed page
   Add feed to the store 
   Build the user cards UI for feed
- Edit/Update profile feature
    Show toast message on save of profile
- Feat: Build connections page
- Feat: Build connections requests page (accept/reject connection requests) 
- Send/ Ignore connection requests from feed (like, dislike)
- Signup new user
- E2E testing 


# Deployment

- Signup on AWS 
- Launch instance
- chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-52-91-31-107.compute-1.amazonaws.com
- install node version on the new system
- Git clone
- Frontend
  > npm install -> dependencies install
  > npm run build
  > sudo apt update
  > sudo apt install nginx
  > sudo systemctl start nginx 
  > sudo systemctl enable nginx
  > Copy code from dist(build files) to var/www/html
  > sudo scp -r dist/* /var/www/html/
  Enable port :80 of your instance  
