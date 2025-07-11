# Chemnitz Cultural Sites



A modern web application for exploring, searching, and interacting with the cultural sites of Chemnitz, Germany.



## 🛠️ Installation



### 1. Clone the repository:

git clone https://github.com/Davidi24/Chemnitz.git

cd Chemnitz



### Set up the backend:

- Go to the backend folder:

cd backend

- Install dependencies:

npm install

- Create a `.env` file in `/backend` with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/Chemnitz
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


Fill in Google credentials if using Google OAuth. You can leave them empty for local testing.

- Make sure your MongoDB is running locally (or on Atlas).



- Start the backend server:
 npm run dev




## 3. Set up the frontend:

  - Go to the frontend folder:

cd ../frontend

- Install dependencies (use legacy-peer-deps to avoid version conflicts):
 npm install --legacy-peer-deps


- Start the frontend:
npm run dev



