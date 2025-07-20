# Lamha Financial Transaction Management System

A modern, responsive financial transaction management application built with React, TypeScript, and Ant Design.

![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.5-orange)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Documentation](#documentation)
- [Coding Standards](#Coding Standards)
- [Acknowledgments](#Acknowledgments)

## Features

- 📊 **Transaction Management**: Create, view, edit, and delete financial transactions
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean interface built with Ant Design components
- 🔒 **Input Validation**: Comprehensive form validation for data integrity
- 🌍 **Localization**: Saudi Arabia locale support with SAR currency
- 📋 **Multiple Views**: Table view for desktop, card view for mobile
- ⚡ **Performance**: Optimized rendering with React best practices

## Tech Stack

### Core Technologies

- **React 19.1.0-** - UI library
- **TypeScript 4.9.5** - Type safety
- **Ant Design 5.26.5** - UI component library
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

### Key Libraries

- **dayjs** - Date manipulation
- **lucide-react** - Icon library

### Development Tools

- **Create React App** - Build tooling
- **Prettier** - Code formatting
- **TypeDoc** - Documentation generation
- **Jest & React Testing Library** - Testing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (for version control)

To check your versions:

```bash
node --version
npm --version
git --version
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MohammedTech-01/lamha-assignment.git
   cd lamha-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install additional required packages** (if not already in package.json)
   ```bash
   npm install antd dayjs lucide-react
   npm install -D @types/react @types/react-dom @types/node
   npm install -D tailwindcss postcss autoprefixer
   npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
   npm install -D typedoc
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lamha-assignment/
├── public/
│   ├── index.html
│   ├── lamha.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── lamha.webp          # Logo
│   ├── components/
│   │   ├── __tests__/          # Component tests
│   │   │   ├── Sidebar.test.tsx
│   │   │   └── TransactionTable.test.tsx
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   ├── Header.tsx          # Header with filters
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── TransactionForm.tsx # Transaction form
│   │   └── TransactionTable.tsx # Transaction display
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   ├── utils/
│   │   ├── __tests__/          # Component tests
│   │   │   └── validation.test.ts
│   │   └── validation.ts       # Form validation utilities
│   ├── App.tsx                 # Main app component
│   ├── index.tsx               # Entry point
│   ├── index.css               # Tailwind imports
│   └── react-app-env.d.ts
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── typedoc.json
└── README.md
```

## Available Scripts

### Development

```bash
# Start development server
npm start

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage
```

### Documentation

```bash
# Generate TypeDoc documentation
npm run docs
```

## Testing

### Running Tests

1. **Run all tests**

   ```bash
   npm test
   ```

2. **Run tests with coverage**

   ```bash
   npm test -- --coverage --watchAll=false
   ```

3. **Run specific test file**
   ```bash
   npm test TransactionTable.test
   ```

## Documentation

### Generate Documentation

**Using TypeDoc**

```bash
# Install TypeDoc
npm install --save-dev typedoc

# Generate documentation
npx typedoc --out docs src

```

## Coding Standards

- Use TypeScript for all new components
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR


## Acknowledgments

- [Ant Design](https://ant.design/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility classes
- [Create React App](https://create-react-app.dev/) for the setup
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

Made with ❤️ by the MOhammedTech-01
