# Highway Delight – Note-Taking Application

Highway Delight is a **full-stack note-taking application** built with **React.js** for the frontend and **Node.js + Express** for the backend, using **MongoDB** as the database.  
Users can **sign up via Email + OTP or Google account**, create and delete personal notes, and all actions are secured with **JWT-based authentication**. The UI is responsive and closely matches the provided design assets.

---

## Features

- **User Signup**
  - Email + OTP (Nodemailer)
  - Input validation

- **Error Handling**
  - Clear error messages for invalid inputs, OTP, and API issues

- **User Dashboard**
  - Welcome page with user info
  - Create and delete notes

- **Authentication**
  - JWT authorization for notes actions

- **UI/UX**
  - Responsive, mobile-friendly design
  - Matches provided assets ([Design Link](https://hwdlte.com/RvqdLn))

---

## Technology Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, Google OAuth 2.0, OTP via Email (Nodemailer)
- **Deployment:** Vercel/Netlify (Frontend)(Backend)
- **Version Control:** Git + GitHub

---

## Project Structure

```bash
highwayDelight/
│── frontend/               # React frontend
│   ├── public/           # images 
│   └── src/              # Components, Pages, API calls
|   └── .env
│
│── backend/               # Node.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # Auth & Notes APIs
│   ├── controllers/      # Business logic
│   ├── middleware/       # JWT auth middleware
│   └── server.js          # Entry point
|    └── .env                # Environment variables
|
│
│── README.md             # Project documentation
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
    ```bash
    git clone https://github.com/Shamsherkhan7549/Highway-Delight-Mern-Assingment.git
    cd Delight-Mern-Assingment
    ```

2. **Install dependencies**
    - **Frontend**
      ```bash
      cd frontend
      npm install
      ```
    - **Backend**
      ```bash
      cd backend
      npm install
      ```

3. **Configure environment variables**  
   Create a `.env` file in the `backend` folder with:
    ```
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    GMAIL=your_email@gmail.com
    GMAIL_PASSWORD=your_email_password
    ```

4. **Run the application**
    - **Backend**
      ```bash
      cd backend
      npm run server
      ```
    - **Frontend**
      ```bash
      cd frontend
      npm run dev
      ```

5. **Access the app**
    - Open [http://localhost:3000](http://localhost:5173) in your browser.

---

## 🔑 API Endpoints

**Authentication**
- `POST /signup` – Sign up with Email+OTP
- `POST /otp` – Verify OTP
- `POST /login` – Login with Email

**Notes (JWT Protected)**
- `POST /task` – Create note
- `DELETE /task/:id` – Delete note
- `GET /task` – Get user notes

---

## 🌐 Deployment Links

- **Frontend:** https://highway-delight-mern-assingment-m49.vercel.app
- **Backend:**  https://highway-delight-mern-assingment.vercel.app
- **Live Demo:**    https://highway-delight-mern-assingment-m49.vercel.app

---

## ✅ Deliverables Checklist

1. Signup via Email + OTP
2. JWT-secured Notes APIs (Create/Delete)
3. Error handling and validation
4. Responsive UI (matches design)
5. Git commits after each feature
6. README with setup instructions


# 📌 Additional Notes

# Use of JavaScript Instead of TypeScript

The original requirement suggested TypeScript, but this project is implemented in JavaScript.

## Justification:
    --> JavaScript allowed faster development within the short 3-day deadline.
    --> The functionality, architecture, and best practices remain the same.
    --> Project includes clean code practices, ESLint formatting, and clear variable naming, which ensures maintainability similar to TypeScript.   
    --> If more time were available, this project could be incrementally migrated to TypeScript with minimal changes.