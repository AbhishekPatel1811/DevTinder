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
    When making API call so pass axios, {withCredentials: true}
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

Remaining:
- Signup new user
- E2E testing 

    