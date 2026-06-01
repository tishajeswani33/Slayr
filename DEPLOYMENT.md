# Slayr Production Launch & Deployment Playbook

This playbook outlines the exact step-by-step procedure to deploy the **Slayr Full-Stack Fashion Intelligence Platform** to production using highly scalable cloud infrastructure.

---

## Architecture Blueprint

```
                      +-----------------------------+
                      |   Vercel / Firebase Host    | (Frontend React SPA)
                      +--------------+--------------+
                                     |
                                HTTPS requests
                                     |
                                     v
                      +--------------+--------------+
                      |   Cloud Run / Render Cloud  | (Backend Docker API Server)
                      +-------+--------------+------+
                              |              |
                      PostgreSQL query   Redis cache
                              |              |
                              v              v
                      +-------+------+  +----+------+
                      | Supabase DB  |  | Upstash   |
                      | (100K Seeded)|  | (Redis)   |
                      +--------------+  +-----------+
```

---

## Step 1: Provisioning the Databases

### 1. PostgreSQL Database (Neon or Supabase)
For enterprise-level vector and outfit lookups with zero maintenance, we recommend **Neon.tech** or **Supabase**:
1. Sign up for [Neon](https://neon.tech/) or [Supabase](https://supabase.com/).
2. Create a new PostgreSQL database named `slayr-production`.
3. Copy the transaction database connection string (e.g. `postgresql://user:password@hostname/dbname?sslmode=require`).

### 2. Redis Cache Server (Upstash Redis)
To enable lighting-fast caching for trending outfits, trend radars, and style DNA calculations:
1. Sign up for [Upstash](https://upstash.com/).
2. Provision a new serverless Redis database.
3. Copy the secure Redis URL (e.g., `redis://default:password@hostname:port`).

---

## Step 2: Seeding the Database (100,000+ Outfits)

We will execute database setup and seed the core outfit database locally using Prisma's transactional batch loaders.

1. Navigate to the `/backend` directory and add your connection strings to `/backend/.env`:
   ```bash
   DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
   REDIS_URL="redis://default:password@hostname:port"
   GEMINI_API_KEY="your-gemini-api-key-here"
   FIREBASE_PROJECT_ID="your-firebase-project-id"
   ```

2. Run the database migration to build the PostgreSQL table schemas:
   ```bash
   npx prisma migrate deploy
   ```

3. Execute the high-performance bulk seeder (generates and inserts **100,000 outfits in under 30 seconds**):
   ```bash
   npx prisma db seed
   ```

---

## Step 3: Deploying the Backend API (Render or Cloud Run)

### Option A: Render Cloud (Easiest)
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your Slayr repository.
3. Set the **Root Directory** to `backend`.
4. Select **Docker** as the Runtime environment. Render will automatically detect the `/backend/Dockerfile` and execute our multi-stage compilation build.
5. In the **Environment Variables** configuration panel, set the following keys:
   - `PORT` = `5000`
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = `your_postgresql_connection_string`
   - `REDIS_URL` = `your_redis_connection_string`
   - `GEMINI_API_KEY` = `your_live_google_gemini_key`
   - `FIREBASE_PROJECT_ID` = `your_firebase_project_id`
   - `JWT_SECRET` = `a_long_random_jwt_secret_hash`
6. Click **Deploy Web Service**. Render will compile, test, and host your endpoint securely with SSL.

### Option B: Google Cloud Run (Recommended for Scale)
Using our MCP Cloud Run server or standard CLI tools:
```bash
cd backend
gcloud run deploy slayr-backend --source . --port 5000 --env-vars-file env.prod.yaml
```

---

## Step 4: Deploying the Frontend (Vercel or Firebase Hosting)

### 1. Configure the Frontend Environment Variables
Create a production `.env.production` file at the root of the project:
```env
VITE_API_URL="https://your-deployed-backend-render-url.com"
VITE_FIREBASE_API_KEY="your_firebase_web_api_key"
VITE_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
VITE_FIREBASE_APP_ID="your-web-app-id"
```

### 2. Deploy to Vercel (Easiest & Top Performance)
1. Import the root repository to [Vercel](https://vercel.com/).
2. Select **Vite** as the framework preset.
3. Set the **Build Command** to `npm run build` and **Output Directory** to `dist`.
4. Inject your production environment variables (listed above) in the Vercel project settings.
5. Click **Deploy**. Vercel will bundle the React assets and distribute them globally over edge networks.

### 3. Deploy to Firebase Hosting
If you prefer hosting the client directly via Firebase:
1. Install Firebase CLI globally if you haven't: `npm install -g firebase-tools`
2. Authenticate: `firebase login`
3. Build the frontend locally: `npm run build`
4. Deploy the frontend `dist` assets: `firebase deploy`

---

## Verification checklist
- [ ] Visit `https://your-deployed-backend-url.com/health` to confirm the backend and PostgreSQL connection are healthy.
- [ ] Open the web client, create an account using Firebase signup, and verify that a matching row is successfully created inside your PostgreSQL `User` and `StyleDNA` tables.
- [ ] Perform a mock AI consultation upload on the stylist dashboard to ensure the Gemini model parses user photos and retrieves matching outfits from the live 100K database.
