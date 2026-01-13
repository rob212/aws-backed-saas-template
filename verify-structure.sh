#!/bin/bash

echo "Verifying project structure..."
echo ""

# Check directories
dirs=("frontend" "frontend/src" "frontend/src/app" "frontend/src/components" 
      "frontend/src/lib" "infrastructure" "infrastructure/lib" "infrastructure/bin" 
      "docs")

for dir in "${dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✓ $dir exists"
    else
        echo "✗ $dir missing"
    fi
done

echo ""
echo "Checking key files..."

# Check files
files=("README.md" ".gitignore" "frontend/package.json" 
       "infrastructure/package.json" "docs/SETUP.md")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file missing"
    fi
done

echo ""
echo "Checking dependencies..."

# Check if node_modules exist
if [ -d "frontend/node_modules" ]; then
    echo "✓ Frontend dependencies installed"
else
    echo "✗ Frontend dependencies not installed - run: cd frontend && npm install"
fi

if [ -d "infrastructure/node_modules" ]; then
    echo "✓ Infrastructure dependencies installed"
else
    echo "✗ Infrastructure dependencies not installed - run: cd infrastructure && npm install"
fi

echo ""
echo "Done!"
