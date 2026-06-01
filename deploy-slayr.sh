#!/bin/bash
# Slayr Full-Stack Cloud Deployment Engine (macOS/Linux)
# Target Stack: Google Cloud Run (Backend) & Firebase Hosting (Frontend)

clear
echo -e "\033[1;36m==========================================================================\033[0m"
echo -e "\033[1;35m                SLAYR FULL-STACK CLOUD DEPLOYMENT ENGINE                  \033[0m"
echo -e "\033[1;36m==========================================================================\033[0m"
echo -e "\033[0;37mThis script automates standard authentication checks, database migrations,\033[0m"
echo -e "\033[0;37mbackend Docker builds on Cloud Run, and frontend static Hosting deploys.\033[0m"
echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"

# ─── 1. Prerequisites Diagnostics ──────────────────────────────────────
echo -e "\033[1;33m🔍 Running systems diagnostics...\033[0m"

prereqs=("node" "npm" "git" "gcloud")
prereqsFailed=false

for tool in "${prereqs[@]}"; do
  if command -v "$tool" &> /dev/null; then
    echo -e "  \033[1;32m✅ $tool is installed.\033[0m"
  else
    echo -e "  \033[1;31m❌ $tool not found in PATH.\033[0m"
    prereqsFailed=true
  fi
done

firebaseCommand="firebase"
if command -v firebase &> /dev/null; then
  echo -e "  \033[1;32m✅ Firebase CLI is installed globally.\033[0m"
  firebaseCommand="firebase"
else
  echo -e "  \033[1;36mℹ️  Firebase CLI not found globally. Using 'npx firebase-tools' dynamically...\033[0m"
  firebaseCommand="npx firebase-tools"
fi

if [ "$prereqsFailed" = true ]; then
  echo -e "\n\033[1;33m⚠️  Some required tools are missing. Please install the Google Cloud SDK and Git before proceeding.\033[0m"
  exit 1
fi

echo -e "\n\033[1;32m✅ Systems diagnostics successful.\033[0m"
echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"

# ─── 2. Interactive Authentications ────────────────────────────────────
echo -e "\033[1;33m🔑 Checking active authentication states...\033[0m"

# Firebase Login check
echo -e "\n\033[1;33m👉 Checking Firebase authentication...\033[0m"
$firebaseCommand login

# Google Cloud Login check
echo -e "\n\033[1;33m👉 Checking Google Cloud SDK authentication...\033[0m"
gcloud auth login

echo -e "\n\033[1;32m✅ Authentication check completed.\033[0m"
echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"

# ─── 3. Collect Deployment Configurations ──────────────────────────────
echo -e "\033[1;33m⚙️  Configure Target Environments:\033[0m"

read -p "  Enter Google Cloud Project ID (e.g. slayr-production): " gcpProjectId
while [ -z "$gcpProjectId" ]; do
  read -p "  Google Cloud Project ID cannot be empty. Enter ID: " gcpProjectId
done

read -p "  Enter Firebase Project ID (default is same as GCP Project ID): " firebaseProjectId
if [ -z "$firebaseProjectId" ]; then
  firebaseProjectId=$gcpProjectId
fi

read -p "  [Optional] Enter Production PostgreSQL DATABASE_URL to run migrations/seeder now: " dbUrl
runSeeder=false
if [ -n "$dbUrl" ]; then
  read -p "  Do you want to seed the database with the 100,000+ outfits? (y/n): " seederChoice
  if [ "$seederChoice" = "y" ] || [ "$seederChoice" = "Y" ]; then
    runSeeder=true
  fi
fi

echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"

# ─── 4. Database Setup & Seeding ───────────────────────────────────────
if [ -n "$dbUrl" ]; then
  echo -e "\033[1;33m🗄️  Running PostgreSQL schema migrations...\033[0m"
  export DATABASE_URL=$dbUrl
  
  cd backend
  # Generate Prisma Client
  echo -e "  Generating Prisma Client..."
  npx prisma generate
  
  # Run migrations
  echo -e "  Running prisma migrate deploy..."
  npx prisma migrate deploy
  
  if [ "$runSeeder" = true ]; then
    echo -e "  🌱 Seeding 100,000+ fashion outfits (takes under 30 seconds)..."
    npx prisma db seed
    echo -e "  \033[1;32m✅ Seeding complete!\033[0m"
  fi
  cd ..
  echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"
fi

# ─── 5. Deploy Backend API to Google Cloud Run ──────────────────────────
echo -e "\033[1;33m🚀 Deploying Slayr Backend to Google Cloud Run...\033[0m"

cd backend
# Build source in the cloud and deploy
echo -e "  Compiling and deploying backend container..."
backendUrl=$(gcloud run deploy slayr-backend --source . --project "$gcpProjectId" --region us-central1 --allow-unauthenticated --format='value(status.url)')

if [ -z "$backendUrl" ]; then
  echo -e "  \033[1;31m❌ Failed to retrieve deployed backend URL. Please check Cloud Run console.\033[0m"
  cd ..
  exit 1
fi

backendUrl=$(echo "$backendUrl" | xargs) # trim whitespace
echo -e "\n\033[1;32m✅ Backend deployed successfully!\033[0m"
echo -e "\033[1;36m🌐 Live API Endpoint: $backendUrl\033[0m"
cd ..
echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"

# ─── 6. Build & Deploy Frontend to Firebase Hosting ────────────────────
echo -e "\033[1;33m🚀 Deploying Slayr Frontend to Firebase Hosting...\033[0m"

# Generate/Update production environment configurations with active backend URL
echo -e "  Injecting active Backend API endpoint into .env.production..."
cat <<EOT > .env.production
VITE_API_URL="$backendUrl"
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="$firebaseProjectId.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="$firebaseProjectId"
VITE_FIREBASE_STORAGE_BUCKET="$firebaseProjectId.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
EOT

# Run frontend production build
echo -e "  Running frontend production build (npm run build)..."
npm run build

# Link Firebase target project
echo -e "  Linking target Firebase project $firebaseProjectId..."
$firebaseCommand use "$firebaseProjectId"

# Deploy client to Firebase Hosting
echo -e "  Publishing static assets to Firebase Hosting..."
$firebaseCommand deploy --only hosting

echo -e "\033[1;36m--------------------------------------------------------------------------\033[0m"
echo -e "\033[1;32m==========================================================================\033[0m"
echo -e "\033[1;32m 🎉 CONGRATULATIONS! SLAYR FASHION PLATFORM IS FULLY DEPLOYED AND LIVE!  \033[0m"
echo -e "\033[1;32m==========================================================================\033[0m"
echo -e "\033[1;32m 📱 Frontend Hosted URL : https://$firebaseProjectId.web.app\033[0m"
echo -e "\033[1;32m 🌐 Backend API URL     : $backendUrl\033[0m"
echo -e "\033[1;32m==========================================================================\033[0m"
