#!/bin/bash

# Buttplug CTO Ubuntu Deployment Script
# Run this script on your Ubuntu server

set -e

echo "🚀 Starting Buttplug CTO deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="buttplug-cto"
APP_DIR="/var/www/$APP_NAME"
SERVICE_NAME="buttplug-cto"
NGINX_SITES_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"

echo -e "${YELLOW}📋 Checking prerequisites...${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ Please run as root (use sudo)${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Node.js...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    apt-get install -y nodejs
fi

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}📦 Installing nginx...${NC}"
    apt-get update
    apt-get install -y nginx
fi

# Check if PM2 is installed (optional, for process management)
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 Installing PM2...${NC}"
    npm install -g pm2
fi

echo -e "${GREEN}✅ Prerequisites checked${NC}"

# Create application directory
echo -e "${YELLOW}📁 Creating application directory...${NC}"
mkdir -p $APP_DIR
cd $APP_DIR

# Copy application files (assuming you've uploaded them)
echo -e "${YELLOW}📂 Copying application files...${NC}"
# Note: You'll need to upload your project files to this directory first
# You can use scp, rsync, or git clone

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install --production

# Set proper permissions
echo -e "${YELLOW}🔐 Setting permissions...${NC}"
chown -R www-data:www-data $APP_DIR
chmod -R 755 $APP_DIR

# Copy nginx configuration
echo -e "${YELLOW}🌐 Configuring nginx...${NC}"
cp nginx.conf $NGINX_SITES_DIR/$APP_NAME
ln -sf $NGINX_SITES_DIR/$APP_NAME $NGINX_ENABLED_DIR/$APP_NAME

# Remove default nginx site if it exists
if [ -f "$NGINX_ENABLED_DIR/default" ]; then
    rm $NGINX_ENABLED_DIR/default
fi

# Test nginx configuration
echo -e "${YELLOW}🧪 Testing nginx configuration...${NC}"
nginx -t

# Copy systemd service file
echo -e "${YELLOW}⚙️ Configuring systemd service...${NC}"
cp $SERVICE_NAME.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable $SERVICE_NAME

# Start services
echo -e "${YELLOW}🚀 Starting services...${NC}"
systemctl start $SERVICE_NAME
systemctl restart nginx

# Check service status
echo -e "${YELLOW}📊 Checking service status...${NC}"
systemctl status $SERVICE_NAME --no-pager -l

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Your app should be available at: http://your-server-ip${NC}"
echo -e "${YELLOW}📝 Don't forget to:${NC}"
echo -e "   1. Update the server_name in nginx.conf with your domain"
echo -e "   2. Configure SSL certificate if needed"
echo -e "   3. Update firewall rules if necessary"
echo -e "   4. Check logs: journalctl -u $SERVICE_NAME -f"
