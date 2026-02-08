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

- Backend
  > Allow ec2 instance public IP on mongodb server
  > Install npm install pm2 -g
  > pm2 start npm --start
  - pm2 commands 
  - pm2 logs, pm2 flush <name>,  pm2 list, pm2 stop <name>, pm2 delete <name>, pm2 start npm --name "devTinder-backend" -- start 
  > config nginx - /etc/nginx/available-sites/default
  > restart nginx
  > Modify the VITE_API_URL in frontend to "/api"   

# Nginx config 
  server name 52.91.31.107;

  location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
  }