const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes.js");
const cpuRoutes = require("./routes/cpuRoutes");
const motherboardRoutes = require("./routes/motherboardRoutes");
const gpuRoutes = require("./routes/gpuRoutes");
const driveRoutes = require("./routes/driveRoutes");
const memoryRoutes = require("./routes/memoryRoutes.js")
const keyboardRoutes = require("./routes/keyboardRoutes.js")
const mouseRoutes = require("./routes/mouseRoutes.js")

// Initialize express
const app = express();

// Configure CORS - allow all origins for development
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/cpu",cpuRoutes)
app.use("/api/gpu",gpuRoutes)
app.use("/api/drive",driveRoutes)
app.use("/api/memory",memoryRoutes)
app.use("/api/keyboard",keyboardRoutes)
app.use("/api/motherboard",motherboardRoutes)
app.use("/api/mouse",mouseRoutes)
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.get('/reset-password/:token', (req, res) => {
  const token = req.params.token;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Arial', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        h2 {
          color: #333;
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 5px rgba(102, 126, 234, 0.3);
        }

        button {
          width: 100%;
          padding: 0.9rem;
          background: #667eea;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background: #5a6cd8;
        }

        .error {
          color: #e74c3c;
          font-size: 0.9rem;
          text-align: center;
          margin-top: 0.5rem;
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="modal">
        <h2>Reset Your Password</h2>
        <form id="resetForm">
          <div class="form-group">
            <label for="password">New Password</label>
            <input type="password" id="password" name="password" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
          </div>
          <button type="submit">Change Password</button>
          <div class="error" id="errorMsg"></div>
        </form>
      </div>

      <script>
        const form = document.getElementById('resetForm');
        const errorMsg = document.getElementById('errorMsg');

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;

          if (password !== confirmPassword) {
            errorMsg.textContent = 'Passwords do not match';
            errorMsg.style.display = 'block';
            return;
          }

          try {
            const response = await fetch('/api/password-reset/reset', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: '${token}',
                password: password
              })
            });

            if (response.ok) {
              alert('Password successfully reset! Redirecting to login...');
              window.location.href = '/login';
            } else {
              const data = await response.json();
              errorMsg.textContent = data.message || 'Something went wrong';
              errorMsg.style.display = 'block';
            }
          } catch (error) {
            errorMsg.textContent = 'An error occurred. Please try again.';
            errorMsg.style.display = 'block';
          }
        });
      </script>
    </body>
    </html>
  `;

  res.send(html);
});
// Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running correctly!" });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
