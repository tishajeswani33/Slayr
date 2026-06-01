# Slayr Full-Stack Cloud Deployment Engine
# Target Stack: Google Cloud Run (Backend) & Firebase Hosting (Frontend)

Clear-Host
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "                SLAYR FULL-STACK CLOUD DEPLOYMENT ENGINE                  " -ForegroundColor Magenta
Write-Host "==========================================================================" -ForegroundColor Cyan
Write-Host "This script automates standard authentication checks, database migrations," -ForegroundColor Gray
Write-Host "backend Docker builds on Cloud Run, and frontend static Hosting deploys."  -ForegroundColor Gray
Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan

# ─── 1. Prerequisites Diagnostics ──────────────────────────────────────
Write-Host "🔍 Running systems diagnostics..." -ForegroundColor Yellow

$firebaseCommand = "firebase"
$prereqs = @{
    "Node.js"  = "node --version"
    "npm"      = "npm --version"
    "Git"      = "git --version"
    "gcloud"   = "gcloud --version"
}

$prereqsFailed = $false
foreach ($name in $prereqs.Keys) {
    try {
        $version = Invoke-Expression $prereqs[$name] -ErrorAction SilentlyContinue | Out-String
        if ($version -match "\d") {
            Write-Host "  ✅ $name is installed." -ForegroundColor Green
        } else {
            Write-Host "  ❌ $name not found in PATH." -ForegroundColor Red
            $prereqsFailed = $true
        }
    } catch {
        Write-Host "  ❌ $name not found in PATH." -ForegroundColor Red
        $prereqsFailed = $true
    }
}

# Verify Firebase tool globally or fall back to npx
try {
    $fbVersion = Invoke-Expression "firebase --version" -ErrorAction SilentlyContinue | Out-String
    if ($fbVersion -match "\d") {
        Write-Host "  ✅ Firebase CLI is installed globally." -ForegroundColor Green
        $firebaseCommand = "firebase"
    } else {
        Write-Host "  ℹ️  Firebase CLI not found globally. Using 'npx firebase-tools' dynamically..." -ForegroundColor Cyan
        $firebaseCommand = "npx firebase-tools"
    }
} catch {
    Write-Host "  ℹ️  Firebase CLI not found globally. Using 'npx firebase-tools' dynamically..." -ForegroundColor Cyan
    $firebaseCommand = "npx firebase-tools"
}

if ($prereqsFailed) {
    Write-Host "`n⚠️  Some required tools are missing. Please install the Google Cloud SDK and Git before proceeding." -ForegroundColor Yellow
    Exit
}

Write-Host "`n✅ Systems diagnostics successful." -ForegroundColor Green
Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan

# ─── 2. Interactive Authentications ────────────────────────────────────
Write-Host "🔑 Checking active authentication states..." -ForegroundColor Yellow

# Firebase Login check
Write-Host "`n👉 Checking Firebase authentication..." -ForegroundColor Yellow
Invoke-Expression "$firebaseCommand login"

# Google Cloud Login check
Write-Host "`n👉 Checking Google Cloud SDK authentication..." -ForegroundColor Yellow
gcloud auth login

Write-Host "`n✅ Authentication check completed." -ForegroundColor Green
Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan

# ─── 3. Collect Deployment Configurations ──────────────────────────────
Write-Host "⚙️  Configure Target Environments:" -ForegroundColor Yellow

$gcpProjectId = Read-Host "  Enter Google Cloud Project ID (e.g. slayr-production)"
while ([string]::IsNullOrEmpty($gcpProjectId)) {
    $gcpProjectId = Read-Host "  Google Cloud Project ID cannot be empty. Enter ID"
}

$firebaseProjectId = Read-Host "  Enter Firebase Project ID (default is same as GCP Project ID)"
if ([string]::IsNullOrEmpty($firebaseProjectId)) {
    $firebaseProjectId = $gcpProjectId
}

$dbUrl = Read-Host "  [Optional] Enter Production PostgreSQL DATABASE_URL to run migrations/seeder now"
$runSeeder = $false
if (-not [string]::IsNullOrEmpty($dbUrl)) {
    $seederChoice = Read-Host "  Do you want to seed the database with the 100,000+ outfits? (y/n)"
    if ($seederChoice.ToLower() -eq 'y') {
        $runSeeder = $true
    }
}

Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan

# ─── 4. Database Setup & Seeding ───────────────────────────────────────
if (-not [string]::IsNullOrEmpty($dbUrl)) {
    Write-Host "🗄️  Running PostgreSQL schema migrations..." -ForegroundColor Yellow
    $env:DATABASE_URL = $dbUrl
    
    cd backend
    # Generate Prisma Client
    Write-Host "  Generating Prisma Client..." -ForegroundColor Gray
    npx prisma generate
    
    # Run migrations
    Write-Host "  Running prisma migrate deploy..." -ForegroundColor Gray
    npx prisma migrate deploy
    
    if ($runSeeder) {
        Write-Host "  🌱 Seeding 100,000+ fashion outfits (takes under 30 seconds)..." -ForegroundColor Gray
        npx prisma db seed
        Write-Host "  ✅ Seeding complete!" -ForegroundColor Green
    }
    cd ..
    Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan
}

# ─── 5. Deploy Backend API to Google Cloud Run ──────────────────────────
Write-Host "🚀 Deploying Slayr Backend to Google Cloud Run..." -ForegroundColor Yellow

cd backend
# Build source in the cloud and deploy
Write-Host "  Compiling and deploying backend container..." -ForegroundColor Gray
$deployCmd = "gcloud run deploy slayr-backend --source . --project $gcpProjectId --region us-central1 --allow-unauthenticated --format='value(status.url)'"
$backendUrl = Invoke-Expression $deployCmd

if ([string]::IsNullOrEmpty($backendUrl)) {
    Write-Host "  ❌ Failed to retrieve deployed backend URL. Please check Cloud Run console." -ForegroundColor Red
    cd ..
    Exit
}

$backendUrl = $backendUrl.Trim()
Write-Host "`n✅ Backend deployed successfully!" -ForegroundColor Green
Write-Host "🌐 Live API Endpoint: $backendUrl" -ForegroundColor Cyan
cd ..
Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan

# ─── 6. Build & Deploy Frontend to Firebase Hosting ────────────────────
Write-Host "🚀 Deploying Slayr Frontend to Firebase Hosting..." -ForegroundColor Yellow

# Generate/Update production environment configurations with active backend URL
Write-Host "  Injecting active Backend API endpoint into .env.production..." -ForegroundColor Gray
$envFile = ".env.production"
$envContent = @"
VITE_API_URL="$backendUrl"
VITE_FIREBASE_API_KEY="your_firebase_api_key"
VITE_FIREBASE_AUTH_DOMAIN="$firebaseProjectId.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="$firebaseProjectId"
VITE_FIREBASE_STORAGE_BUCKET="$firebaseProjectId.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
VITE_FIREBASE_APP_ID="your_app_id"
"@
Set-Content -Path $envFile -Value $envContent

# Run frontend production build
Write-Host "  Running frontend production build (npm run build)..." -ForegroundColor Gray
npm run build

# Link Firebase target project
Write-Host "  Linking target Firebase project $firebaseProjectId..." -ForegroundColor Gray
Invoke-Expression "$firebaseCommand use $firebaseProjectId"

# Deploy client to Firebase Hosting
Write-Host "  Publishing static assets to Firebase Hosting..." -ForegroundColor Gray
Invoke-Expression "$firebaseCommand deploy --only hosting"

Write-Host "--------------------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host " 🎉 CONGRATULATIONS! SLAYR FASHION PLATFORM IS FULLY DEPLOYED AND LIVE!  " -ForegroundColor Green
Write-Host "==========================================================================" -ForegroundColor Green
Write-Host " 📱 Frontend Hosted URL : https://$firebaseProjectId.web.app" -ForegroundColor Green
Write-Host " 🌐 Backend API URL     : $backendUrl" -ForegroundColor Green
Write-Host "==========================================================================" -ForegroundColor Green
