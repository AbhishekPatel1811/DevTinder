# Frontend Deployment

- Signup on AWS 
- Launch instance
- chmod 400 "devTinder-secret.pem"
- ssh -i "devTinder-secret.pem" ubuntu@ec2-100-52-106-149.compute-1.amazonaws.com
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

# Backend Deployment

  > Allow ec2 instance public IP on mongodb server
  > Install npm install pm2 -g
  > pm2 start npm --start
  - pm2 commands 
  - pm2 logs, pm2 flush <name>,  pm2 list, pm2 stop <name>, pm2 delete <name>, pm2 start npm --name "devTinder-backend" -- start 
  > config nginx - sudo nano /etc/nginx/available-sites/default
  > restart nginx
  > Modify the VITE_API_URL in frontend to "/api"   

# Nginx config 
  server_name 100.52.106.149;

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
- DNS record: A devtinder.in -> point to your aws instance ip
- Enable SSL for website (flexible) 