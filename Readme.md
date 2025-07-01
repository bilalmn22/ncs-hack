# NCS Hack - Freelancing Platform

A comprehensive freelancing platform built with Next.js, GraphQL, Socket.IO, and AI-powered features.

## 🚀 Project Overview

This project consists of:
- **Frontend**: Next.js client application with modern UI components
- **Backend**: GraphQL API server with MongoDB
- **Chat API**: Real-time messaging system with Socket.IO
- **AI Features**: Recommendation and sentiment analysis notebooks

## 📁 Project Structure

```
ncs-hack/
├── client/                 # Next.js frontend application
├── server/
│   ├── main/              # GraphQL backend API
│   └── chatting-api/      # Real-time chat API
└── ai/                    # AI notebooks
    ├── recomm.ipynb       # Recommendation system
    └── Sentiment_analysis.ipynb  # Sentiment analysis
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Python (for AI notebooks)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ncs-hack
```

### 2. Backend Setup (Main API)

```bash
cd server/main
npm install
```

Create a `.env` file in `server/main/` with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Email (for notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Chargily Payment (optional)
CHARGILY_SECRET_KEY=your_chargily_secret_key

# Server
PORT=4000
NODE_ENV=development
```

Start the main backend server:

```bash
npm start
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### 3. Chat API Setup

```bash
cd server/chatting-api
npm install
```

Create a `.env` file in `server/chatting-api/` with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Server
PORT=5000
NODE_ENV=development
```

Start the chat API server:

```bash
npm start
```

The chat API will be available at `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client
npm install
```

Create a `.env.local` file in `client/` with the following variables:

```env
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHAT_API_URL=http://localhost:5000

# Stream Chat (for real-time messaging)
NEXT_PUBLIC_STREAM_CHAT_API_KEY=your_stream_chat_api_key

# Google OAuth (optional)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🧠 AI Features

The project includes two AI notebooks for enhanced functionality:

### Recommendation System
- **File**: `ai/recomm.ipynb`
- **Purpose**: Provides job recommendations for freelancers and freelancer recommendations for companies
- **Usage**: Open in Jupyter Notebook or Google Colab

### Sentiment Analysis
- **File**: `ai/Sentiment_analysis.ipynb`
- **Purpose**: Analyzes sentiment in reviews and comments
- **Usage**: Open in Jupyter Notebook or Google Colab

## 🏃‍♂️ Running the Complete Application

1. **Start the main backend server**:
   ```bash
   cd server/main
   npm start
   ```

2. **Start the chat API server**:
   ```bash
   cd server/chatting-api
   npm start
   ```

3. **Start the frontend application**:
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - GraphQL API: http://localhost:4000/graphql
   - Chat API: http://localhost:5000

## 📱 Features

### For Companies
- Post job requests
- Browse freelancer profiles
- Real-time chat with freelancers
- Manage job progress
- Payment integration

### For Freelancers
- Browse available jobs
- Submit proposals
- Real-time chat with companies
- Track job progress
- Receive payments

### General Features
- User authentication (JWT + Google OAuth)
- Real-time messaging
- File uploads
- Rating and review system
- AI-powered recommendations
- Responsive design

## 🛡️ Security

- JWT-based authentication
- Protected routes
- Input validation
- CORS configuration
- Secure file uploads

## 🧪 Development

### Available Scripts

**Frontend (client/)**:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

**Backend (server/main/)**:
- `npm start` - Start development server with nodemon

**Chat API (server/chatting-api/)**:
- `npm start` - Start development server with nodemon
- `npm run start:server` - Start production server

## 📊 Database Schema

The application uses MongoDB with the following main collections:
- Users (clients and freelancers)
- Jobs
- Proposals
- Messages
- Reviews
- Transactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:
1. Check that all environment variables are properly set
2. Ensure MongoDB is running and accessible
3. Verify all ports are available (3000, 4000, 5000)
4. Check the console logs for error messages

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo GraphQL](https://www.apollographql.com/docs/)
- [Socket.IO](https://socket.io/docs/)
- [MongoDB](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
