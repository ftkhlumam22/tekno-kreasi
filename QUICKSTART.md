# Quick Deploy to Vercel

## 5-Minute Setup

### 1. Prepare Database (2 min)
```bash
# Sign up di Neon (https://neon.tech) - FREE
# Create new project
# Copy connection string
```

### 2. Setup Vercel (2 min)
```bash
# Push code ke GitHub
git add .
git commit -m "Ready for deployment"
git push

# Import project di Vercel
# Set environment variables:
# - DATABASE_URL (dari Neon)
# - JWT_SECRET (random 32+ chars)
# - NEXT_PUBLIC_SITE_URL (https://your-project.vercel.app)
```

### 3. Run Migration (1 min)
```bash
# Di terminal local
export DATABASE_URL="postgresql://..."
npx prisma migrate deploy
npm run db:seed
```

### 4. Done!
- Blog: `https://your-project.vercel.app/blog`
- Admin: `https://your-project.vercel.app/admin/login`
- Login: `admin@teknokreasi.com` / `admin123`

## Update Schema Later

```bash
# 1. Change schema locally
# 2. Create migration
npx prisma migrate dev --name update_name

# 3. Deploy to production
git push
export DATABASE_URL="postgresql://..."
npx prisma migrate deploy
```

## Need Help?
See full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
