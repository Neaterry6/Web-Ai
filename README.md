

# Ayanfe Chatbot

## Overview
Ayanfe is an engaging, web-based chatbot designed to interact with users and provide dynamic responses powered by APIs. It is tailored for tasks such as quotes, mood analysis, roasts, image searches, and more. The chatbot also features authentication and chat history tracking.

## Features
1. **User Authentication**:
   - Secure signup and login with password hashing and JWT tokens.

2. **Chat Functionality**:
   - Handles dynamic queries with integrated APIs.
   - Real-time responses tailored to various categories like quotes, images, and music lyrics.

3. **Chat History**:
   - Saves all user interactions in a database and retrieves them on-demand.

4. **API Integrations**:
   - Supports multiple APIs for enhanced functionality:
     - Quotes API (categories and searches)
     - Image Search API
     - Music Lyrics API
     - Mood Analysis
     - Datetime
     - Roasts (includes personalization).

## Tech Stack
- **Frontend**:
  - HTML, CSS (with Tailwind), JavaScript.
- **Backend**:
  - Node.js, Express.js.
- **Database**:
  - MongoDB for user data and chat logs.

---

## Setup Instructions

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   npm start
   ```
2. Open `http://localhost:3000` in your browser.

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. Ensure MongoDB is running locally or connect to a cloud database.

### Environment Variables
Create a `.env` file in the `backend` directory with the following details:
```plaintext
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
```

### Running Tests
1. Navigate to the `tests` directory:
   ```bash
   cd tests
   npm install puppeteer axios jest --save-dev
   npm test
   ```

---

## API Endpoints

### **From `https://ap-c4yl.onrender.com`**
1. **Chat**:
   - `/chat/ask` - Handles conversational responses.
2. **Quotes**:
   - `/quotes/category` - Fetches quotes based on a specific category.
   - `/quotes/search` - Searches for quotes by keyword.
3. **Music Lyrics**:
   - `/music-lyrics` - Retrieves lyrics for specified songs.
4. **Images**:
   - `/images/search` - Returns images based on a query.
5. **Mood Analysis**:
   - `/mood` - Analyzes the user's mood.
6. **Datetime**:
   - `/datetime` - Returns the current date and time.

### **From `https://roast-api.onrender.com`**
7. **Roast Categories**:
   - `/roast/savage`
   - `/roast/light`
   - `/roast/general`
   - `/roast/savage-burn`
   - `/roast/funny`
   - `/roast/personalized` - Includes name personalization.

---

## Future Improvements
- **Enhanced AI**:
  - Introduce advanced AI models for deeper conversational abilities.
- **Improved UI**:
  - Add animations and themes to the chat interface.
- **Mobile Responsiveness**:
  - Ensure seamless access across all devices.
- **Additional Features**:
  - Expand API integrations (e.g., weather, news).

## License
This project is licensed under the [MIT License](LICENSE).
