Real-Time Chat Application
A modern, responsive real-time chat application built with Node.js Socket.IO Express.

✨ Features
Real-time messaging with Socket.IO
User authentication (optional)
Multiple chat rooms/channels
Typing indicators
Message read receipts
Emoji support
File sharing (images, documents)
Responsive design for all devices
Dark/Light mode toggle
Message history persistence
🚀 Quick Start
Prerequisites
Node.js (v14 or higher)
npm or yarn
MongoDB (if using database)
Installation
# Clone the repository
git clone https://github.com/yourusername/realtime-chat-app.git

# Navigate to the project directory
cd realtime-chat-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
Running the Application
# Development mode
npm run dev

# Production mode
npm start
The application will be available at http://localhost:3000

🛠 Configuration
Edit the .env file to configure your application:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret_here
SOCKET_IO_ORIGINS=http://localhost:3000
📂 Project Structure
realtime-chat-app/
├── public/            # Static files
├── src/
│   ├── controllers/   # Business logic
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── sockets/       # Socket.IO handlers
│   ├── utils/         # Utility functions
│   └── app.js         # Main application file
├── .env.example       # Environment variables template
├── package.json       # Project dependencies
└── README.md          # This file
🔧 Built With
Node.js - JavaScript runtime
Express - Web framework
Socket.IO - Real-time communication
MongoDB - Database (optional)
Mongoose - MongoDB ODM (optional)
🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📧 Contact
Your Name - Mohit Goswami mohitgoswami195@gmail.com

Project Link: https://github.com/mohit-180/ChatApp
