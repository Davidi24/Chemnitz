\# Chemnitz Cultural Sites



A modern web application for exploring, searching, and interacting with the cultural sites of Chemnitz, Germany.



\## 🛠️ Installation



1\. \*\*Clone the repository:\*\*

&nbsp;  ```bash

&nbsp;  git clone https://github.com/Davidi24/Chemnitz.git

&nbsp;  cd Chemnitz

&nbsp;  ```



2\. \*\*Set up the backend:\*\*

&nbsp;  - Go to the backend folder:

&nbsp;    ```bash

&nbsp;    cd backend

&nbsp;    ```

&nbsp;  - Install dependencies:

&nbsp;    ```bash

&nbsp;    npm install

&nbsp;    ```

&nbsp;  - Create a `.env` file in `/backend` with:

&nbsp;    ```env

&nbsp;    PORT=5000

&nbsp;    MONGO\_URI=mongodb://localhost:27017/Chemnitz

&nbsp;    JWT\_SECRET=

&nbsp;    GOOGLE\_CLIENT\_ID=

&nbsp;    GOOGLE\_CLIENT\_SECRET=

&nbsp;    ```

&nbsp;    \_Fill in Google credentials if using Google OAuth. You can leave them empty for local testing.\_

&nbsp;  - Make sure your MongoDB is running locally (or on Atlas).



&nbsp;  - Start the backend server:

&nbsp;    ```bash

&nbsp;    npm run dev

&nbsp;    ```



3\. \*\*Set up the frontend:\*\*

&nbsp;  - Go to the frontend folder:

&nbsp;    ```bash

&nbsp;    cd ../frontend

&nbsp;    ```

&nbsp;  - Install dependencies (use legacy-peer-deps to avoid version conflicts):

&nbsp;    ```bash

&nbsp;    npm install --legacy-peer-deps

&nbsp;    ```

&nbsp;  - Make sure the API URL in your frontend `.env` matches the backend:

&nbsp;    ```env

&nbsp;    NEXT\_PUBLIC\_API\_URL=http://localhost:5000

&nbsp;    NEXT\_PUBLIC\_GOOGLE\_CLIENT\_ID=

&nbsp;    ```

&nbsp;  - Start the frontend:

&nbsp;    ```bash

&nbsp;    npm run dev

&nbsp;    ```



4\. \*\*Notes:\*\*

&nbsp;  - \*\*CORS Policy:\*\* Ensure the frontend’s `NEXT\_PUBLIC\_API\_URL` and backend’s `PORT` are matching.

&nbsp;  - \*\*Database:\*\* The backend will create the database (`Chemnitz`) automatically when it runs.

&nbsp;  - \*\*Google OAuth:\*\* Leave credentials empty for local use, or add your own keys for real authentication.

