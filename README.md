# Redux Bug Tracker

This is a full-stack bug tracking application built with:

- **React + Redux Toolkit** (frontend)
- **Node.js + Express** (backend API)
- **Custom middleware, memoized selectors, and scalable Redux architecture**

## Features

- Add / resolve / remove bugs
- Project management
- Filter unresolved bugs
- Select bugs assigned to specific team members (via selectors)
- Uses Redux Toolkit for simplified reducer logic

## Technologies

- React (base app)
- Redux Toolkit (@reduxjs/toolkit)
- React-Redux
- Moment.js
- Reselect (memoized selectors)
- Redux Thunk (included by default in Redux Toolkit middleware)
- Custom Middleware (logger, toast, func)
- Axios (for HTTP requests to the backend API)
- Babel (for ES6+ syntax support)
- Webpack Dev Server
- Express.js (for optional backend)
- ESLint (for linting and code quality)
- Prettier (for consistent code formatting)
- Jest (for unit testing and test runner)
- Husky (for managing Git hooks like pre-commit formatting)
- GitHub Actions (CI)

## Getting Started

### Frontend

How to run: 

```bash
npm install
npm start
```

Runs on: `http://localhost:9000`

### Frontend (React + Redux)

```bash
cd bugs-frontend
npm install
npm start
```

Runs on: `http://localhost:3000`

#### Installed Libraries:
- `@reduxjs/toolkit`
- `redux`
- `react-redux`
- `axios`
- `reselect`
- `moment`
  

> All Redux logic resides in `src/store/` and is fully modularized.

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

## API Integration

The app uses **Axios** to perform API requests to the backend (`/bugs-backend`), such as:

- `GET /api/bugs` → Fetch bugs into the Redux store
- `POST /api/bugs` → Create a new bug
- `PATCH /api/bugs/:id` → Update bug status or assignment

These calls are typically dispatched via async action creators using Redux Thunk.

## Project Structure

```
redux-bug-tracker/
│
├── bugs-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components (e.g. Bugs.jsx)
│   │   └── store/          # Redux Toolkit store, slices, middleware
│   ├── public/
│   └── package.json
│
├── bugs-backend/           # Node.js + Express backend (optional)
│   ├── index.js            # Entry point
│   └── package.json
│
├── docs/                   # Documentation and certificates
├── src/                    # Legacy demo Redux app (for reference)
├── README.md
└── ...
```

## Tooling & Automation

This project includes automated development tools and CI:

- **ESLint** for linting: Run `npm run lint`
- **Prettier** for code formatting: Run `npm run format`
- **GitHub Actions CI**: Automatically lints, builds, and checks formatting on push and pull requests.
- **Husky**: Git hooks integration — currently configured with a `pre-commit` hook that automatically runs Prettier before each commit.

## Running Tests

This project uses [Jest](https://jestjs.io/) for unit testing.

To run tests:

```bash
npm test
```

To watch tests in real-time:

```bash
npm run test:watch
```

To see test coverage:

```bash
npx jest --coverage
```

You can configure Babel + Jest using:

- `.babel.config.json`:

```json
{
  "presets": ["@babel/preset-env"]
}
```

- Add these to `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watchAll"
}
```

## Credits

This project is based on the **"Redux Starter Project"** by [Mosh Hamedani](https://codewithmosh.com/).
I followed his course and extended/customized the code for learning purposes.

License: ISC (see `package.json`)

## My Contribution

- Refactored and documented the code
- Added Babel and configured Webpack to support modern JavaScript (ES6+)
- Integrated ESLint for consistent linting
- Set up Prettier for automatic code formatting
- Added GitHub Actions (CI) for lint and build validation on push
- Configured Husky to run Prettier on every commit (pre-commit hook)
- Installed and utilized `prop-types` in the frontend app for component type checking, maintaining code strictness in line with the course's best practices.


## Certificate of Completion

I completed the Ultimate Redux Course by Mosh Hamedani.  
You can view the certificate [here](docs/certificate/certificate-of-completion-for-the-ultimate-redux-course.pdf).
