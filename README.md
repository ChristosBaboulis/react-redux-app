# Redux Bug Tracker

This is a simple Redux-based bug tracking application built with **@reduxjs/toolkit**, **react-redux**, and **reselect**.

## Features

- Add / resolve / remove bugs
- Project management
- Filter unresolved bugs
- Select bugs assigned to specific team members (via selectors)
- Uses Redux Toolkit for simplified reducer logic

## Technologies

- React (base app)
- Redux Toolkit (@reduxjs/toolkit)
- Reselect (memoized selectors)
- Redux Thunk (included by default in Redux Toolkit middleware)
- Custom Middleware (logger, toast, func)
- Axios (for HTTP requests to the backend API)
- Babel (for ES6+ syntax support)
- Webpack Dev Server
- Express (for optional backend)

## Getting Started

### Frontend

```bash
npm install
npm start
```

Runs on: `http://localhost:9000`

---

### Backend API (Optional)

This project includes a simple Node.js/Express backend located in the `/bugs-backend` folder, used for local development and testing.

#### Endpoints

- `GET /api/bugs` → Fetch all bugs
- `POST /api/bugs` → Add a new bug
- `PATCH /api/bugs/:id` → Update bug (assign user or resolve)

#### Run the backend

```bash
cd bugs-backend
npm install
npm start
```

Runs on: `http://localhost:9001`

---

## API Integration

The app uses **Axios** to perform API requests to the backend (`/bugs-backend`), such as:

- `GET /api/bugs` → Fetch bugs into the Redux store
- `POST /api/bugs` → Create a new bug
- `PATCH /api/bugs/:id` → Update bug status or assignment

These calls are typically dispatched via async action creators using Redux Thunk.

---

## Application Structure

- `index.js`: Entry point of the React application
- `.babelrc`: Babel configuration for modern JavaScript support
- `store/configureStore.js`: Redux store setup using Redux Toolkit and custom middleware
- `store/customStore.js`: Manual Redux store (legacy / comparison with `configureStore`)
- `store/reducer.js`: Root reducer that combines feature reducers into `entities`
- `store/entities.js`: Combines `bugs`, `projects`, and `users` slices under `entities`
- `store/bugs.js`: Redux slice for bug management (actions, reducer, selectors)
- `store/projects.js`: Redux slice for projects
- `store/users.js`: Redux slice for users
- `store/middleware/logger.js`: Logs Redux actions to a specified destination (e.g. console)
- `store/middleware/toast.js`: Middleware that logs error-type actions
- `store/middleware/func.js`: Handles function-style actions (similar to `redux-thunk`)
- `store/middleware/api.js`: Custom middleware using Axios to handle API calls dispatched as `apiCallBegan`

## Credits

This project is based on the **"Redux Starter Project"** by [Mosh Hamedani](https://codewithmosh.com/).  
I followed his course and extended/customized the code for learning purposes.

License: ISC (see `package.json`)

## My Contribution

- Implemented `createSlice` logic for bugs and projects
- Created selectors for unresolved bugs and bugs assigned to users
- Configured Redux store using Redux Toolkit
- Developed custom middleware (`logger`, `toast`, `func`) to extend Redux functionality
- Refactored and documented the code
- Added Babel and configured Webpack to support modern JavaScript (ES6+)
