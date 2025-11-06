# DigMa API - Comprehensive Advertising Platform

## 🎯 Overview

A modern, AI-powered advertising platform API built with Node.js and Python FastAPI, featuring multi-tenant architecture, RBAC, campaign management, billing integration, and advanced AI/ML capabilities.

## 🏗️ Architecture

### Core Components

#### 1. **Application Layer (Node.js/Express)**
- **Campaign Management**: Full CRUD operations for ad campaigns
- **Billing System**: Subscription and payment management
- **User Management**: Multi-tenant user system with RBAC
- **GraphQL API**: Metrics and analytics queries

#### 2. **AI/ML Engine (Python FastAPI)**
- **Budget Optimizer**: ROAS-based budget allocation using ML
- **Content Generator**: AI-powered ad copy generation with LLM integration
- **A/B Test Analyzer**: Statistical analysis of campaign variants
- **Performance Predictor**: Campaign performance forecasting

#### 3. **Security & Access Control**
- **RBAC System**: Role-based access control with granular permissions
- **JWT Authentication**: Secure token-based authentication
- **Tenant Isolation**: Multi-tenant data separation
- **Audit Trail**: Comprehensive logging of user actions

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Node.js 18+
- Python 3.11+ (for AI engine development)

### Start Services
```bash
# Start all services
docker-compose up -d --build

# Run RBAC migration
cd api && node run_rbac_migration.js up
```

### Access Points
- **API**: http://localhost:5000
- **AI Engine**: http://localhost:8000
- **GraphQL**: http://localhost:5000/graphql
- **Health Check**: http://localhost:5000/health

## 📋 API Endpoints

### Authentication Required
All API endpoints require JWT authentication and proper RBAC permissions.

### Campaign Management
```http
GET    /api/campaigns              # List campaigns
POST   /api/campaigns              # Create campaign
GET    /api/campaigns/:id          # Get campaign
PUT    /api/campaigns/:id          # Update campaign
DELETE /api/campaigns/:id          # Delete campaign
PATCH  /api/campaigns/:id/performance  # Update performance
POST   /api/campaigns/:id/duplicate   # Duplicate campaign
```

### User Management
```http
GET    /api/users                  # List users
POST   /api/users                  # Create user
GET    /api/users/:id              # Get user
PUT    /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user
```

### Billing & Subscriptions
```http
GET    /api/billing/subscription           # Get subscription
POST   /api/billing/subscription           # Create subscription
PUT    /api/billing/subscription           # Update subscription
GET    /api/billing/invoices               # List invoices
GET    /api/billing/invoices/:id           # Get invoice
GET    /api/billing/payment-methods        # List payment methods
POST   /api/billing/payment-methods        # Add payment method
PATCH  /api/billing/payment-methods/:id/default  # Set default
DELETE /api/billing/payment-methods/:id          # Delete payment method
```

### AI/ML Services
```http
POST   /api/v1/budget/optimize     # Optimize campaign budget
POST   /api/v1/content/generate    # Generate ad content
POST   /api/v1/ab-test/analyze     # Analyze A/B test results
POST   /api/v1/predict/performance # Predict campaign performance
POST   /api/v1/audience/insights   # Get audience insights
```

## 🗄️ Database Schema

### MongoDB Collections

#### Core Models
- **users**: User accounts with tenant association
- **tenants**: Multi-tenant organization data
- **campaigns**: Ad campaign configurations and performance

#### Billing Models
- **subscriptions**: Billing and subscription data
- **invoices**: Payment invoices and billing history
- **payment_methods**: Stored payment methods

#### RBAC Models
- **roles**: RBAC roles (super_admin, tenant_admin, tenant_user)
- **permissions**: Granular permissions (user:create, campaign:read, etc.)
- **role_permissions**: Many-to-many role-permission relationships
- **user_roles**: User-role assignments with tenant context

#### Analytics
- **metrics**: Campaign performance data

## 🔐 RBAC System

### Built-in Roles
- **super_admin**: Full system access across all tenants
- **tenant_admin**: Full access within their tenant
- **tenant_user**: Read-only access within their tenant

### Permission Structure
Permissions follow the format: `resource:action`
- `tenant:create`, `tenant:read`, `tenant:update`, `tenant:delete`
- `user:create`, `user:read`, `user:update`, `user:delete`
- `campaign:create`, `campaign:read`, `campaign:update`, `campaign:delete`
- `role:assign`, `role:read`, `role:manage`
- `system:admin`

## 🤖 AI/ML Features

### Budget Optimization
Automatically adjusts campaign budgets based on ROAS (Return on Ad Spend) analysis using machine learning algorithms.

### Content Generation
Generates compelling ad copy using OpenAI GPT models, tailored to specific platforms and audiences.

### A/B Testing
Statistical analysis of campaign variants to determine winning combinations with confidence intervals.

### Performance Prediction
Forecasts campaign performance using historical data and market conditions.

## 🛠️ Development

### Project Structure
```
api/
├── src/
│   ├── models/           # MongoDB models
│   ├── controllers/      # Route handlers
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middleware
│   ├── services/        # Business logic services
│   └── graphql/         # GraphQL schema
├── ai-engine/           # Python FastAPI service
│   ├── main.py         # FastAPI application
│   ├── requirements.txt # Python dependencies
│   └── Dockerfile      # AI service container
├── migrations/         # Database migrations
└── ARCHITECTURE.md     # This file
```

### Environment Variables
```env
# Database
MONGO_URI=mongodb://db:27017/digma

# Authentication
JWT_SECRET=your-secure-jwt-secret

# AI Service
AI_SERVICE_URL=http://ai-engine:8000
AI_SERVICE_API_KEY=your-ai-service-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Stripe (future)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Running Tests
```bash
# API tests
cd api && npm test

# AI engine tests
cd api/ai-engine && pytest
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
- Automated testing on push/PR
- Docker image building
- Security scanning
- Deployment to staging/production

### Deployment
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📊 Monitoring & Analytics

### Health Checks
- Service availability monitoring
- Database connection checks
- AI service responsiveness

### Metrics Collection
- API response times
- Error rates
- Campaign performance
- User activity

### Logging
- Structured logging with Winston
- Error tracking with Sentry
- Audit logs for security events

## 🔒 Security

### Authentication
- JWT tokens with expiration
- Refresh token rotation
- Password hashing with bcrypt

### Authorization
- RBAC with granular permissions
- Tenant data isolation
- API rate limiting

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- GDPR compliance ready

## 🚀 Roadmap

### Phase 3: Ad Platform Integrations
- [ ] Facebook Ads API
- [ ] Google Ads API
- [ ] Instagram API
- [ ] TikTok API
- [ ] LinkedIn Ads API
- [ ] Webhook handlers

### Phase 4: Advanced Features
- [ ] Stripe payment integration
- [ ] BigQuery analytics warehouse
- [ ] S3 media storage
- [ ] Real-time notifications
- [ ] Advanced reporting dashboard

### Phase 5: Production Infrastructure
- [ ] Kubernetes manifests
- [ ] Multi-region deployment
- [ ] Auto-scaling
- [ ] Disaster recovery
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for modern advertising platforms**