#!/bin/bash

echo "🚀 Brutal App Deployment Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Run this script from the brutal-app directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
fi

# Build the app to make sure it works
echo "🔨 Building the app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Fix the errors before deploying."
    exit 1
fi

echo "✅ Build successful!"
echo ""
echo "🎯 Choose your deployment platform:"
echo "1. Vercel (Recommended for Next.js)"
echo "2. Railway (Includes free database)"
echo "3. Netlify"
echo "4. Manual setup"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to Vercel..."
        echo "1. Go to https://vercel.com"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Import this repository"
        echo "5. Add environment variables:"
        echo "   - POSTGRES_URL_NON_POOLING=your_database_url"
        echo "   - NEXT_PUBLIC_APP_URL=https://your-app.vercel.app"
        echo "6. Click Deploy!"
        ;;
    2)
        echo "🚂 Deploying to Railway..."
        echo "1. Go to https://railway.app"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New Project'"
        echo "4. Choose 'Deploy from GitHub repo'"
        echo "5. Select this repository"
        echo "6. Railway will auto-detect Next.js settings"
        echo "7. Add PostgreSQL database (free)"
        echo "8. Deploy!"
        ;;
    3)
        echo "🌐 Deploying to Netlify..."
        echo "1. Go to https://netlify.com"
        echo "2. Sign up with GitHub"
        echo "3. Click 'New site from Git'"
        echo "4. Choose this repository"
        echo "5. Build settings:"
        echo "   - Build command: npm run build"
        echo "   - Publish directory: .next"
        echo "6. Add environment variables"
        echo "7. Deploy!"
        ;;
    4)
        echo "📖 Manual setup instructions:"
        echo "Check DEPLOYMENT_GUIDE.md for detailed instructions"
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📋 Don't forget to:"
echo "✅ Set up your database (if not using Railway)"
echo "✅ Configure environment variables"
echo "✅ Test your deployed app"
echo "✅ Set up a custom domain (optional)"
echo ""
echo "🎉 Happy deploying!"