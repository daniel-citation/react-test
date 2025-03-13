import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EmployeeDetailComponent from './EmployeeDetailComponent';
import * as employeeService from '../../services/employeeService';
import * as useEventBusHooks from '../../events/useEventBus';
import { Department, EmployeeStatus } from '../../shared/types';

// Mock the employee service
jest.mock('../../services/employeeService');

// Mock the useEventBus hooks
jest.mock('../../events/useEventBus', () => ({
  useEventSubscription: jest.fn(),
}));

describe('EmployeeDetailComponent', () => {
  // Mock employee data
  const mockEmployee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    department: Department.Engineering,
    position: 'Senior Software Engineer',
    status: EmployeeStatus.Active,
    hireDate: '2020-01-15',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    manager: 5,
    salary: 120000,
    bio: 'John is a senior software engineer with expertise in React and TypeScript.',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup the mock implementation for getEmployeeById
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);
    
    // Setup the mock implementation for useEventSubscription
    (useEventBusHooks.useEventSubscription as jest.Mock).mockImplementation((eventType, handler) => {
      // Store the handler for later use in tests
      (useEventBusHooks as any).mockHandler = handler;
    });
  });
  
  test('renders empty state initially', () => {
    render(<EmployeeDetailComponent />);
    
    // Check if empty state message is displayed
    expect(screen.getByText('Select an employee to view details.')).toBeInTheDocument();
  });
  
  test('renders loading state when fetching employee', async () => {
    // Delay the resolution of getEmployeeById
    (employeeService.getEmployeeById as jest.Mock).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve(mockEmployee), 100);
      });
    });
    
    render(<EmployeeDetailComponent />);
    
    // Simulate an employee selection event
    const mockEvent = { type: 'EMPLOYEE_SELECTED', payload: 1 };
    (useEventBusHooks as any).mockHandler(mockEvent);
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading employee details...')).toBeInTheDocument();
    
    // Wait for the employee to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employee details...')).not.toBeInTheDocument();
    });
  });
  
  test('renders employee details after loading', async () => {
    render(<EmployeeDetailComponent />);
    
    // Simulate an employee selection event
    const mockEvent = { type: 'EMPLOYEE_SELECTED', payload: 1 };
    (useEventBusHooks as any).mockHandler(mockEvent);
    
    // Wait for the employee to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employee details...')).not.toBeInTheDocument();
    });
    
    // Check if the employee details are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('john.doe@company.com')).toBeInTheDocument();
    expect(screen.getByText('555-123-4567')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('$120,000')).toBeInTheDocument();
    expect(screen.getByText('John is a senior software engineer with expertise in React and TypeScript.')).toBeInTheDocument();
  });
  
  test('handles employee not found', async () => {
    // Mock employee not found
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(undefined);
    
    render(<EmployeeDetailComponent />);
    
    // Simulate an employee selection event
    const mockEvent = { type: 'EMPLOYEE_SELECTED', payload: 999 };
    (useEventBusHooks as any).mockHandler(mockEvent);
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Employee with ID 999 not found.')).toBeInTheDocument();
    });
  });
  
  test('handles error when fetching employee', async () => {
    // Mock error when fetching employee
    (employeeService.getEmployeeById as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    
    render(<EmployeeDetailComponent />);
    
    // Simulate an employee selection event
    const mockEvent = { type: 'EMPLOYEE_SELECTED', payload: 1 };
    (useEventBusHooks as any).mockHandler(mockEvent);
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('An error occurred while fetching employee details.')).toBeInTheDocument();
    });
  });
  
});