# 🚀 FitAI Deployment Guide

This guide will help you deploy your FitAI application successfully.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ **Supabase Project** - Created and configured
- ✅ **Database Schema** - Pushed to production database
- ✅ **Environment Variables** - All required variables set
- ✅ **Domain Name** - (Optional) For custom domain
- ✅ **Hosting Platform** - Vercel, Netlify, Railway, etc.

## 🔧 Environment Configuration

### 1. Production Environment Variables

Create a `.env.production` file with your production credentials:

```bash
# Database URL do Supabase (Session pooler - recomendado para web)
DATABASE_URL=postgresql://postgres.seuprojeto:senha@aws-1-sa-east-1.pooler.supabase.com:5432/postgres

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seuprojeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_real_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_servico_real_aqui

# Z.AI (opcional - para geração de planos com IA)
ZAI_API_KEY=sua_chave_zai_real_aqui

# Node Environment
NODE_ENV=production
```

### 2. Database Setup

Ensure your production database is ready:

```bash
# Push schema to production database
npm run db:push

# Generate Prisma client
npm run db:generate
```

## 🏗️ Build for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Run linting (optional but recommended)
npm run lint
```

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect to Vercel:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   ```

2. **Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all variables from `.env.production`

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Option 2: Railway

1. **Deploy to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize project
   railway init
   
   # Deploy
   railway up
   ```

2. **Environment Variables in Railway:**
   - Railway automatically detects variables from your `.env` file
   - You can manage them in the Railway dashboard

### Option 3: Self-Hosted (Docker)

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 3000
   
   CMD ["npm", "start"]
   ```

2. **Build and Run:**
   ```bash
   # Build image
   docker build -t fitai .
   
   # Run container
   docker run -p 3000:3000 --env-file .env.production fitai
   ```

### Option 4: Traditional Server

1. **Upload Files:**
   - Upload all project files to your server
   - Install dependencies: `npm install --production`
   - Build the application: `npm run build`

2. **Start the Application:**
   ```bash
   # Set environment
   export NODE_ENV=production
   
   # Start the server
   npm start
   ```

3. **Use PM2 for Process Management:**
   ```bash
   # Install PM2
   npm install -g pm2
   
   # Start application with PM2
   pm2 start server.ts --name fitai
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

## 🔍 Post-Deployment Checks

After deployment, verify:

1. **Application Health:**
   ```bash
   curl https://your-domain.com/api/health
   ```

2. **Supabase Connection:**
   ```bash
   curl https://your-domain.com/api/test-supabase
   ```

3. **Main Page:**
   - Visit `https://your-domain.com`
   - Check if the page loads correctly
   - Test authentication flow

4. **Console for Errors:**
   - Open browser dev tools
   - Check for any JavaScript errors
   - Monitor network requests

## 🛠️ Troubleshooting Common Issues

### Issue 1: "supabaseKey is required"

**Solution:** Ensure environment variables are properly set:
- Check that all Supabase variables are in your hosting platform
- Verify the variable names match exactly
- Restart your application after updating variables

### Issue 2: Database Connection Failed

**Solution:** 
- Verify `DATABASE_URL` is correct
- Ensure your Supabase project is active
- Check if IP whitelisting is required
- Test connection locally first

### Issue 3: Build Fails

**Solution:**
- Run `npm run lint` to check for code issues
- Ensure all dependencies are installed
- Check Node.js version compatibility
- Review build logs for specific errors

### Issue 4: Authentication Not Working

**Solution:**
- Verify Supabase auth settings
- Check email confirmation settings
- Ensure redirect URLs are configured in Supabase
- Test with different browsers

## 📊 Monitoring

### Application Monitoring

1. **Health Check Endpoint:**
   ```
   GET /api/health
   ```

2. **Supabase Connection Test:**
   ```
   GET /api/test-supabase
   ```

### Error Monitoring

Consider adding error monitoring:
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **Vercel Analytics** - Performance monitoring

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use hosting platform's secure environment variable management
- Rotate keys periodically

### Database Security
- Use Supabase's Row Level Security (RLS)
- Implement proper authentication flows
- Validate all user inputs

### API Security
- Use HTTPS in production
- Implement rate limiting
- Validate all API requests
- Use proper CORS settings

## 🔄 Updates and Maintenance

### Updating Dependencies
```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test thoroughly after updates
npm run build
npm test
```

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply to production
npx prisma migrate deploy
```

## 📞 Support

If you encounter issues during deployment:

1. **Check Logs:** Review application logs for errors
2. **Test Locally:** Ensure the application works locally
3. **Verify Environment:** Double-check all environment variables
4. **Community:** Seek help in relevant forums or communities

---

## 🎉 Success!

Once deployed, your FitAI application will be available at your domain with:
- ✅ User authentication system
- ✅ AI-powered fitness plan generation
- ✅ Real-time system monitoring
- ✅ Responsive modern interface

Congratulations on deploying your FitAI application! 🏋️‍♂️🚀