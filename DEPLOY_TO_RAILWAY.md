# Deploy Backend to Railway (Free Cloud Server)

Railway gives you a **free cloud server** to run your backend. No localhost needed!

## Step 1: Create Railway Account
1. Go to **https://railway.app**
2. Sign up (use GitHub login for easy setup)
3. Create new project

## Step 2: Deploy This Repository
1. Click "New Project" → "Deploy from GitHub"
2. Connect your GitHub (nezsig/meocy)
3. Railway automatically deploys! ✓

## Step 3: Get Your Backend URL
1. Go to Railway Dashboard
2. Click your project → Click "Deployments"
3. You'll see your URL: `https://your-project-xxxxx.railway.app`

## Step 4: Update Frontend

Open `public/index.html` and `public/admin.html`:

Find this line:
```javascript
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://your-backend-url.railway.app'; // ← UPDATE THIS
```

Replace `https://your-backend-url.railway.app` with your Railway URL from Step 3.

Example:
```javascript
: 'https://meocy-booking-api-prod.railway.app'; // Your actual URL
```

## Step 5: Done!
- Your backend is now live on the cloud ✓
- Booking form works from anywhere (mobile, desktop, etc.)
- Admin dashboard works from anywhere
- No localhost needed

---

## Access Your Services

| Service | URL |
|---------|-----|
| **Booking Form** | https://meocy.vercel.app |
| **Admin Dashboard** | https://meocy.vercel.app/admin.html |
| **Backend API** | https://your-railway-url.railway.app/api/* |

---

## Tips

- **Railway is FREE** for small projects like yours
- Backend runs 24/7 automatically
- No running commands needed
- You can view logs in Railway Dashboard

---

## If You Want to Run Locally

For testing/development:
```bash
npm install
npm start
```

Then access:
- Booking: http://localhost:3000
- Admin: http://localhost:3000/admin.html
