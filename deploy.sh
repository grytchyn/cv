#!/bin/bash

echo "🚀 Starting deployment to GitHub..."

# Initialize Git repository if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized."
fi

# Add all files
git add .
echo "✅ Files added to staging."

# Commit changes
git commit -m "Initial commit: My IT Portfolio"
echo "✅ Changes committed."

# Rename branch to main
git branch -M main

# Create GitHub repository and push
echo "🔄 Creating GitHub repository and pushing code..."
gh repo create portfolio-cv --public --source=. --remote=origin --push

echo "✅ Code successfully pushed to GitHub!"
echo "👉 Now go to https://github.com/grytchyn/portfolio-cv/settings/pages"
echo "👉 Set 'Source' to 'Deploy from a branch', choose 'main', and click 'Save'."
