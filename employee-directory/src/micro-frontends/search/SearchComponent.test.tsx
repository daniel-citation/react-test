import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchComponent from './SearchComponent';
import { EventType } from '../../events/eventBus';
import * as useEventBusHooks from '../../events/useEventBus';

// Mock the useEventPublisher hook
jest.mock('../../events/useEventBus', () => ({
  useEventPublisher: jest.fn(),
  useEventSubscription: jest.fn(),
  useEventBus: jest.fn(),
}));

describe('SearchComponent', () => {
  // Mock publish function
  const mockPublish = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup the mock implementation for useEventPublisher
    (useEventBusHooks.useEventPublisher as jest.Mock).mockReturnValue(mockPublish);
  });
  
  test('renders search form correctly', () => {
    render(<SearchComponent />);
    
    // Check if the component renders correctly
    expect(screen.getByText('Employee Search')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Department:')).toBeInTheDocument();
    expect(screen.getByLabelText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
  
  test('handles name input change', () => {
    render(<SearchComponent />);
    
    // Get the name input and change its value
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    // Check if the input value is updated
    expect(nameInput).toHaveValue('John');
    
  });
  
  test('handles department selection', () => {
    render(<SearchComponent />);
    
    // Get the department select and change its value
    const departmentSelect = screen.getByLabelText('Department:');
    fireEvent.change(departmentSelect, { target: { value: 'Engineering' } });
    
    // Check if the select value is updated
    expect(departmentSelect).toHaveValue('Engineering');
  });
  
  test('handles status selection', () => {
    render(<SearchComponent />);
    
    // Get the status select and change its value
    const statusSelect = screen.getByLabelText('Status:');
    fireEvent.change(statusSelect, { target: { value: 'Active' } });
    
    // Check if the select value is updated
    expect(statusSelect).toHaveValue('Active');
  });
  
  test('handles form submission', () => {
    render(<SearchComponent />);
    
    // Fill the form
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    const departmentSelect = screen.getByLabelText('Department:');
    fireEvent.change(departmentSelect, { target: { value: 'Engineering' } });
    
    // Submit the form
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
    
    // Check if the publish function was called with the correct filter
    expect(mockPublish).toHaveBeenCalledWith({
      name: 'John',
      department: 'Engineering'
    });
  });
  
  test('handles reset button click', () => {
    render(<SearchComponent />);
    
    // Fill the form
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    // Click the reset button
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);
    
    // Check if the input is cleared
    expect(nameInput).toHaveValue('');
    
    // Check if the publish function was called with an empty filter
    expect(mockPublish).toHaveBeenCalledWith({});
  });
  
});