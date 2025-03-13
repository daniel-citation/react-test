import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmployeeListComponent from './EmployeeListComponent';
import * as employeeService from '../../services/employeeService';
import * as useEventBusHooks from '../../events/useEventBus';
import { Employee, Department, EmployeeStatus } from '../../shared/types';

// Mock the employee service
jest.mock('../../services/employeeService');

// Mock the useEventBus hooks
jest.mock('../../events/useEventBus', () => ({
  useEventSubscription: jest.fn(),
  useEventPublisher: jest.fn(),
}));

describe('EmployeeListComponent', () => {
  // Mock data
  const mockEmployees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      department: Department.Engineering,
      position: 'Senior Software Engineer',
      status: EmployeeStatus.Active,
      hireDate: '2020-01-15',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      department: Department.HR,
      position: 'HR Manager',
      status: EmployeeStatus.Active,
      hireDate: '2019-03-20',
    },
  ];
  
  // Mock publish function
  const mockPublish = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup the mock implementation for filterEmployees
    (employeeService.filterEmployees as jest.Mock).mockResolvedValue(mockEmployees);
    
    // Setup the mock implementation for useEventPublisher
    (useEventBusHooks.useEventPublisher as jest.Mock).mockReturnValue(mockPublish);
    
    // Setup the mock implementation for useEventSubscription
    (useEventBusHooks.useEventSubscription as jest.Mock).mockImplementation((eventType, handler) => {
      // Store the handler for later use in tests
      (useEventBusHooks as any).mockHandler = handler;
    });
  });
  
  test('renders loading state initially', () => {
    render(<EmployeeListComponent />);
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading employees...')).toBeInTheDocument();
  });
  
  test('renders employee list after loading', async () => {
    render(<EmployeeListComponent />);
    
    // Wait for the employees to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument();
    });
    
    // Check if the employee list is displayed
    expect(screen.getByText('Employees (2)')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
  test('handles employee selection', async () => {
    render(<EmployeeListComponent />);
    
    // Wait for the employees to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument();
    });
    
    // Click on an employee
    userEvent.click(screen.getByText('John Doe'));
    
    // Check if the publish function was called with the correct employee ID
    expect(mockPublish).toHaveBeenCalledWith(1);
  });
  
  test('displays empty state when no employees match filter', async () => {
    // Mock empty employee list
    (employeeService.filterEmployees as jest.Mock).mockResolvedValue([]);
    
    render(<EmployeeListComponent />);
    
    // Wait for the employees to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument();
    });
    
    // Check if empty state message is displayed
    expect(screen.getByText('No employees found matching the filter criteria.')).toBeInTheDocument();
  });
  
  test('handles filter changes', async () => {
    render(<EmployeeListComponent />);
    
    // Wait for the initial employees to load
    await waitFor(() => {
      expect(screen.queryByText('Loading employees...')).not.toBeInTheDocument();
    });
    
    // Simulate a filter change event
    const mockFilter = { name: 'John' };
    const mockEvent = { type: 'EMPLOYEE_FILTER_CHANGED', payload: mockFilter };
    (useEventBusHooks as any).mockHandler(mockEvent);
    
    // Check if filterEmployees was called with the correct filter
    expect(employeeService.filterEmployees).toHaveBeenCalledWith(mockFilter);
  });
  
});