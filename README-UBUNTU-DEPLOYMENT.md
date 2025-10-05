# Ubuntu Server Deployment Guide

This guide will help you deploy the Buttplug CTO application on your Ubuntu server with nginx.

## Prerequisites

- Ubuntu 18.04+ server
- Root or sudo access
- Domain name or IP address

## Quick Deployment

### 1. Upload Files to Server

Upload your project files to your Ubuntu server. You can use:

```bash
# Using scp
scp -r . user@your-server-ip:/tmp/buttplug-cto

# Using rsync
rsync -avz --exclude node_modules . user@your-server-ip:/tmp/buttplug-cto

# Using git (if you have a repository)
git clone https://github.com/Deiiru/buttplug-cto.git
```

### 2. Run Deployment Script

```bash
# Make the script executable
chmod +x deploy-ubuntu.sh

# Run the deployment script
sudo ./deploy-ubuntu.sh
```

### 3. Manual Deployment (Alternative)

If you prefer manual setup:

#### Install Dependencies
```bash
# Update system
sudo apt update

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt-get install -y nginx

# Install PM2 (optional)
sudo npm install -g pm2
```

#### Setup Application
```bash
# Create application directory
sudo mkdir -p /var/www/buttplug-cto
sudo cp -r . /var/www/buttplug-cto/
cd /var/www/buttplug-cto

# Install dependencies
sudo npm install --production

# Set permissions
sudo chown -R www-data:www-data /var/www/buttplug-cto
sudo chmod -R 755 /var/www/buttplug-cto
```

#### Configure nginx
```bash
# Copy nginx config
sudo cp nginx.conf /etc/nginx/sites-available/buttplug-cto
sudo ln -s /etc/nginx/sites-available/buttplug-cto /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
```

#### Setup Systemd Service
```bash
# Copy service file
sudo cp buttplug-cto.service /etc/systemd/system/

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable buttplug-cto
sudo systemctl start buttplug-cto
```

## Configuration

### Environment Variables

The Redis credentials are already configured in the service file. If you need to change them:

```bash
sudo nano /etc/systemd/system/buttplug-cto.service
```

Update these lines:
```
Environment=UPSTASH_REDIS_REST_URL=your-redis-url
Environment=UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

Then restart the service:
```bash
sudo systemctl restart buttplug-cto
```

### nginx Configuration

Edit the nginx configuration if needed:
```bash
sudo nano /etc/nginx/sites-available/buttplug-cto
```

Update the `server_name` with your domain:
```
server_name your-domain.com;
```

Then reload nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## SSL Certificate (Optional)

To add SSL with Let's Encrypt:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Monitoring

### Check Service Status
```bash
sudo systemctl status buttplug-cto
```

### View Logs
```bash
# Service logs
sudo journalctl -u buttplug-cto -f

# nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart application
sudo systemctl restart buttplug-cto

# Restart nginx
sudo systemctl restart nginx
```

## API Endpoints

Once deployed, these endpoints will be available:

- `GET /api/stats` - Get global stats and leaderboard
- `POST /api/click` - Register a click
- `POST /api/set-name` - Set username
- `GET /api/init` - Initialize database

## Troubleshooting

### Common Issues

1. **Service won't start**: Check logs with `sudo journalctl -u buttplug-cto -f`
2. **nginx errors**: Check configuration with `sudo nginx -t`
3. **Permission issues**: Ensure www-data owns the files
4. **Port conflicts**: Make sure port 3000 is available

### Firewall

If you have a firewall, open the necessary ports:
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

## Production Checklist

- [ ] Domain name configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Service auto-starts on boot
- [ ] Log rotation configured
- [ ] Backup strategy in place
- [ ] Monitoring setup

Your Buttplug CTO application should now be running on your Ubuntu server! 🚀
