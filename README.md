# Employee Directory - React TypeScript Micro Frontend Application

This project is a TypeScript-based React Employee Directory application structured as micro frontends. It demonstrates a modular approach to frontend development where different parts of the application are developed and maintained independently.

## Project Structure

The application is divided into three main micro frontends:

1. **Search Micro Frontend**: Allows filtering employees by name, department, and status
2. **Employee List Micro Frontend**: Displays filtered employees in a table format
3. **Employee Detail Micro Frontend**: Shows additional information when an employee is selected

These micro frontends communicate through a simple event system, allowing them to work together while remaining loosely coupled.

## Technology Stack

- React with TypeScript
- React Hooks (useState, useEffect, useCallback, useMemo, and custom hooks)
- CSS for styling
- Jest and React Testing Library for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd employee-directory
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

This will launch the application at [http://localhost:3000](http://localhost:3000).

## Testing

The project includes a test suite for each component. To run the tests:

```bash
npm test
```

## Your Task

This application has several issues that need to be fixed. Your task is to identify and fix these problems:

1. The list of employees constantly reloads and flickers, especially when interacting with the search filters
2. The application becomes very slow when filtering through many employees
3. The application becomes slower the longer it runs and consumes increasing amounts of memory


4. Sometimes the application crashes with type errors when trying to access employee properties after loading or filtering employees
5. Changes in the search filters don't always update the employee list correctly
6. Sometimes clicking on an employee doesn't show their details or selects the wrong employee
7. Several tests are failing and there's missing test coverage for critical features

### Approach

1. Run the application and explore its functionality
2. Run the tests to identify failing tests
3. Review the code to find the issues
4. Fix the issues one by one
5. Add any missing tests
6. Ensure all tests pass

Good luck!
