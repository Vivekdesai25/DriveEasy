# Backend Setup Instructions


The files in this `backend/` folder are the source code for the real Node.js/Express server.
The React application currently running in the browser is using a **mock service** (`services/api.ts`) to simulate backend behavior for preview purposes.

## To run the full stack locally:

### 1. Setup Backend
1. Navigate to the `backend` folder.
2. Run `npm install` (requires `package.json` below).
3. Create a `.env` file with:
   ```
   MONGO_URI=mongodb://localhost:27017/car-rental
   JWT_SECRET=your_jwt_secret_key_123
   PORT=5000
   ```
4. Run `node server.js` or `npm start`.

### 2. Setup Frontend to use Real API
1. Open `src/services/api.ts`.
2. Replace the Mock implementations with real `fetch` or `axios` calls pointing to `http://localhost:5000/api`.
   *Example:*
   ```javascript
   export const getCars = async () => {
     const res = await fetch('http://localhost:5000/api/cars');
     return res.json();
   };
   ```

### 3. Create Admin User
1. Register a user via the frontend.
2. Access your MongoDB database (using Compass or CLI).
3. Find the user document and update the `role` field from `"user"` to `"admin"`.
