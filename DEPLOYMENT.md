# Deployment Guide - Vercel

## Persiapan Database

### 1. Setup PostgreSQL Database
Gunakan salah satu provider berikut:
- **Neon** (Recommended): https://neon.tech - Free tier available
- **Supabase**: https://supabase.com - Free tier available
- **Railway**: https://railway.app - Free tier available
- **Render**: https://render.com - Free tier available

### 2. Dapatkan Connection String
Setelah membuat database, dapatkan connection string dengan format:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```

## Setup Environment Variables di Vercel

1. Buka project di Vercel Dashboard
2. Go to **Settings** → **Environment Variables**
3. Tambahkan variables berikut:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Penting:**
- Set environment variables untuk **Production**, **Preview**, dan **Development**
- `JWT_SECRET` harus minimal 32 karakter dan random
- `NEXT_PUBLIC_SITE_URL` tanpa trailing slash

## Deployment Steps

### Step 1: Push Code ke Git
```bash
git add .
git commit -m "Add blog feature with admin panel"
git push
```

### Step 2: Deploy ke Vercel
1. Connect repository ke Vercel
2. Vercel akan auto-detect Next.js project
3. Environment variables sudah di-set di step sebelumnya
4. Click **Deploy**

### Step 3: Run Database Migration (Manual)
Setelah deploy berhasil, jalankan migration dari local:

```bash
# Set DATABASE_URL untuk production
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Jalankan migration
npx prisma migrate deploy
```

**Windows PowerShell:**
```powershell
$env:DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
npx prisma migrate deploy
```

### Step 4: Seed Admin User (First Time Only)
Setelah migration berhasil, seed admin user:

```bash
# Jalankan seed script
npm run db:seed
```

Atau manual via API (jika sudah deploy):
```bash
curl -X POST https://your-domain.vercel.app/api/auth/seed \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@teknokreasi.com","password":"admin123","name":"Admin Tekno Kreasi"}'
```

## Verifikasi Deployment

1. Buka `https://your-domain.vercel.app/blog` - harus muncul 3 blog posts
2. Buka `https://your-domain.vercel.app/admin/login`
3. Login dengan:
   - Email: `admin@teknokreasi.com`
   - Password: `admin123`

## Update Schema di Masa Depan

Jika ada perubahan schema di `prisma/schema.prisma`:

### 1. Development (Local)
```bash
# Buat migration file
npx prisma migrate dev --name your_migration_name

# Test di local
npm run dev
```

### 2. Production (Vercel)
```bash
# Set DATABASE_URL production
export DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Apply migration
npx prisma migrate deploy
```

**Penting:** 
- Migration file akan otomatis ter-commit ke git
- Vercel akan auto-deploy ketika ada perubahan code
- Tapi migration harus dijalankan manual ke production database

## Troubleshooting

### Error: "Can't reach database server"
- Pastikan DATABASE_URL benar
- Cek firewall database mengizinkan koneksi dari IP manapun (0.0.0.0/0)
- Untuk Neon/Supabase, pastikan database sudah active

### Error: "Prisma Client not generated"
- Jalankan `npm run postinstall` atau `npx prisma generate`
- Check build logs di Vercel

### Error: "Table does not exist"
- Migration belum dijalankan
- Jalankan `npx prisma migrate deploy` dengan DATABASE_URL production

### Build Error di Vercel
- Check Environment Variables sudah di-set untuk semua environment
- Pastikan DATABASE_URL format benar
- Check build logs untuk detail error

## Security Checklist

- [ ] JWT_SECRET minimal 32 karakter dan random
- [ ] DATABASE_URL tidak ter-commit ke git
- [ ] .env sudah ada di .gitignore
- [ ] Admin password sudah diganti dari default
- [ ] Database firewall sudah di-configure dengan benar

## Monitoring

Gunakan Prisma Studio untuk monitoring database:
```bash
# Local development
npm run prisma:studio

# Production (dengan DATABASE_URL production)
export DATABASE_URL="postgresql://..."
npx prisma studio
```

## Backup Database

Regular backup database sangat penting:
- **Neon**: Auto-backup tersedia di dashboard
- **Supabase**: Manual backup via dashboard
- **Railway**: Manual backup via CLI
- **Render**: Manual backup via dashboard

Atau gunakan pg_dump:
```bash
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

## Support

Untuk masalah deployment:
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
