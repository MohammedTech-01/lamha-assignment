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
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

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
- **ESLint** - Code linting
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

### Production Build
Create an optimized production build:
```bash
npm run build
```

## Project Structure

```
lamha-assignment/
├── public/
│   ├── index.html
│   ├── favicon.ico
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

# Build for production
npm run build

# Analyze bundle size
npm run build -- --stats
```

### Documentation
```bash
# Generate TypeDoc documentation
npm run docs

# Generate JSDoc documentation (if configured)
npm run jsdoc
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Format code with Prettier
npm run format
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

### Writing Tests

Example test structure:
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionTable from '../TransactionTable';

describe('TransactionTable', () => {
  test('renders transactions correctly', () => {
    const mockTransactions = [
      // ... mock data
    ];
    
    render(<TransactionTable transactions={mockTransactions} />);
    
    expect(screen.getByText('Adobe Inc.')).toBeInTheDocument();
  });
});
```

## Documentation

### Generate Documentation

1. **Using TypeDoc (Recommended for TypeScript)**
   ```bash
   # Install TypeDoc
   npm install --save-dev typedoc

   # Generate documentation
   npx typedoc --out docs src

   # View documentation
   open docs/index.html
   ```

2. **Using JSDoc**
   ```bash
   # Install JSDoc
   npm install --save-dev jsdoc jsdoc-plugin-typescript

   # Create jsdoc.json configuration
   echo '{
     "source": {
       "include": ["src"],
       "includePattern": ".+\\.(js|jsx|ts|tsx)$"
     },
     "opts": {
       "destination": "./docs",
       "recurse": true
     },
     "plugins": ["jsdoc-plugin-typescript"]
   }' > jsdoc.json

   # Generate documentation
   npx jsdoc -c jsdoc.json
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=30000

# Feature Flags
REACT_APP_ENABLE_MOCK_DATA=true
REACT_APP_ENABLE_DEBUG=false

# Localization
REACT_APP_DEFAULT_LOCALE=en-SA
REACT_APP_CURRENCY=SAR
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `build` folder to [Netlify](https://app.netlify.com/drop)

### Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/lamha-assignment",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new components
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## Troubleshooting

### Common Issues

1. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   # Or use different port
   PORT=3001 npm start
   ```

3. **TypeScript errors**
   ```bash
   # Clear TypeScript cache
   rm -rf node_modules/.cache
   npm start
   ```

4. **Build failures**
   ```bash
   # Clear build cache
   rm -rf build
   npm run build
   ```

### Getting Help

- Check existing [issues](https://github.com/your-username/lamha-assignment/issues)
- Create a new issue with detailed description
- Contact the development team

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ant Design](https://ant.design/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility classes
- [Create React App](https://create-react-app.dev/) for the setup
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

Made with ❤️ by the Lamha Development Team