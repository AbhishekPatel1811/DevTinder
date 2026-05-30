# Frontend Deployment

- Signup on AWS 
- Launch instance
  - Choose your OS
  - Create a key pair 
  - Launch instance 
- Open terminal and run 
- chmod 400 <your-key-file.pem>
- ssh -i <your-key-file.pem> ubuntu@ec2-13-235-115-22.ap-south-1.compute.amazonaws.com
- install node version - nvm install <version> same as of project
- Git clone
- Frontend
  - Set frontend env before building:
    - VITE_API_URL=/api
    - VITE_SITE_URL=https://your-new-domain.example
  - Update public/robots.txt and public/sitemap.xml with your final domain before building
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx 
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to var/www/html
  - sudo cp -r dist/* /var/www/html/
  - Enable port :80 of your instance  

# Backend Deployment

  - Allow ec2 instance public IP on mongodb server
  - Set backend environment variables before starting PM2:
    - PORT=3000
    - NODE_ENV=production
    - MONGODB_URI=<your MongoDB Atlas URI>
    - JWT_SECRET=<long random secret>
    - FRONTEND_URL=http://13.235.115.22,https://your-new-domain.example
  - Recommended: create Backend/.env on EC2 using Backend/.env.example as reference
  - Install PM2 - npm install pm2 -g
  - pm2 start npm --name "devTinder-backend" -- start
  - pm2 commands 
  - pm2 logs, pm2 flush <name>,  pm2 list, pm2 stop <name>, pm2 delete <name>, pm2 start npm --name "devTinder-backend" -- start 
  - config nginx - sudo nano /etc/nginx/available-sites/default
  - restart nginx
  - npm run build
  - Modify the VITE_API_URL in frontend to "/api"   

# Nginx config 
  server_name 13.235.115.22;

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

# Adding a custom Domain name 
- Purchase domain name 
- signup on cloudflare & add a new domain name
- change the nameservers on godaddy and point it to cloudflare
- wait for sometime till your nameservers are updated 
- DNS record: A <your-new-domain> -> point to your aws instance ip
- Update backend FRONTEND_URL with https://<your-new-domain>
- Update Nginx server_name with <your-new-domain>
- Enable SSL for website (flexible) 
