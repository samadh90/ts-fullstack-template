/**
 * @file index.ts
 * @description Main server entry point
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

import { initSocketService } from './services/socket.service';

// Load environment variables
dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const socketService = initSocketService(server);

// Middleware to parse JSON
app.use(express.json());

// Middleware for CORS requests
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes)

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      users: '/users',
      auth: '/auth',
    },
    websocket: 'Connected to Socket.io server',
  });
});

// Handle routes not found
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  console.log(`🔌 Socket.io is active and listening for connections`);
});