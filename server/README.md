# Crypto Payment Gateway Microservices

This backend system provides a comprehensive cryptocurrency payment solution for e-commerce websites, allowing merchants to accept crypto payments via QR codes.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- 

## Architecture Overview

Our platform employs a microservices architecture to deliver a robust, scalable, and highly modular cryptocurrency payment gateway. This design philosophy ensures that individual components of the system can be developed, deployed, scaled, and maintained independently, enabling fault isolation and facilitating seamless integration with third-party systems.

## Services Stack

- **Authentication Service**: NodeJS, Express, JWT
  - Handles user authentication with social login options
  - Manages session tokens and authorization
  - Provides secure API access for merchants and customers

- **Payment Service**: FastAPI, MongoDB
  - Supports multiple cryptocurrencies (ETH, USDT, USDC)
  - Compatible with multiple chains (Ethereum, Optimism, Arbitrum, Polygon, Base)
  - Generates and validates payment QR codes
  - Monitors blockchain transactions and confirms payments
  - Provides payment status webhooks to merchant systems

- **Analytics Service**: Django, MongoDB
  - Tracks payment metrics and conversion rates
  - Provides insights on transaction volumes and patterns
  - Generates customizable reports for merchants
  - Provides a dashboard for merchants to view their payment data

- **Notification Service**: Java, Spring Boot, MongoDB
  - Sends payment confirmations to customers
  - Delivers transaction alerts to merchants
  - Manages communication preferences

- **Admin Service**: NodeJS, Express, MongoDB
  - Platform administration and monitoring
  - User management and support tools
  - System configuration and maintenance

- **Real-time User Support**: FastAPI, OpenAI, MongoDB
  - AI-powered customer assistance
  - Payment troubleshooting
  - Merchant integration support

- **Merchant Service**: FastAPI, MongoDB
  - Manages API keys for merchants
  - Provides API key management and usage tracking
  - Supports API key creation, deletion, and rotation
  - Monitors API key usage and access patterns

## API Endpoints

### Authentication Service
- `POST /auth/register` - Register a new merchant account
- `POST /auth/login` - Authenticate and receive access token
- `POST /auth/refresh` - Refresh an expired access token
- `GET /auth/profile` - Retrieve merchant profile information
- `PUT /auth/profile` - Update merchant profile information
- `POST /auth/logout` - Invalidate current session token

### Payment Service
- `POST /payments/create` - Create a new payment gateway
- `POST /payments/update` - Update a payment gateway
- `GET /payments/{id}` - Get payment gateway details by ID
- `GET /payments/merchant/{merchant_id}` - List all payment gateways for a merchant
- `GET /payments/status/{id}` - Check payment gateway status
- `POST /payments/webhook/configure` - Configure webhook for payment notifications
- `GET /payments/supported-currencies` - List supported cryptocurrencies

### Analytics Service
- `GET /analytics/dashboard` - Get merchant dashboard overview
- `GET /analytics/transactions` - Get transaction history with filtering options
- `GET /analytics/reports/generate` - Generate custom reports
- `GET /analytics/metrics/conversion` - Get payment conversion metrics
- `GET /analytics/metrics/volume` - Get transaction volume metrics

### Notification Service
- `POST /notifications/configure` - Configure notification preferences
- `GET /notifications/history` - Get notification history
- `POST /notifications/test` - Send a test notification
- `PUT /notifications/channels` - Update notification channels

### Admin Service
- `GET /admin/users` - List all platform users
- `GET /admin/merchants` - List all merchants
- `PUT /admin/system/config` - Update system configuration
- `GET /admin/system/status` - Get system status and health metrics
- `POST /admin/support/ticket` - Create support ticket

### Real-time User Support
- `POST /support/chat/start` - Start a support chat session
- `POST /support/chat/message` - Send message in support chat
- `GET /support/faq` - Get frequently asked questions
- `GET /support/guides` - Get integration guides

### Mechant Service
- `POST /mechant/create` - Create a new merchant
- `GET /mechant/list` - List all merchants
- `DELETE /mechant/{id}` - Delete a merchant
- `PUT /mechant/{id}/update` - Update a merchant
- `GET /mechant/{id}/usage` - Get merchant usage statistics
