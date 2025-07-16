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
- Webpack Dev Server

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

## Credits

This project is based on the **"Redux Starter Project"** by [Mosh Hamedani](https://codewithmosh.com/).  
I followed his course and extended/customized the code for learning purposes.

License: ISC (see `package.json`)

## My Contribution

- Implemented `createSlice` logic for bugs and projects
- Created selectors for unresolved bugs and bugs assigned to users
- Configured Redux store using Redux Toolkit
- Refactored and documented the code
