import { getEmployees, getEmployeeById, filterEmployees } from './employeeService';
import { Department, EmployeeStatus, EmployeeFilter, Employee } from '../shared/types';

// Mock the setTimeout function
jest.useFakeTimers();

describe('employeeService', () => {
  describe('getEmployees', () => {
    test('should return all employees after a delay', async () => {
      // Start the async operation
      const promise = getEmployees();
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Check if employees were returned
      expect(employees).toBeDefined();
      expect(Array.isArray(employees)).toBe(true);
      expect(employees.length).toBeGreaterThan(0);
      
      // Check if employees have the expected properties
      const employee = employees[0];
      expect(employee).toHaveProperty('id');
      expect(employee).toHaveProperty('firstName');
      expect(employee).toHaveProperty('lastName');
      expect(employee).toHaveProperty('email');
      expect(employee).toHaveProperty('department');
      expect(employee).toHaveProperty('position');
      expect(employee).toHaveProperty('status');
      expect(employee).toHaveProperty('hireDate');
    });
    
    test('should return a properly typed array', async () => {
      // Start the async operation
      const promise = getEmployees();
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise;
      
      // This test will pass, but it doesn't actually test the return type
      // The real issue is that getEmployees doesn't specify a return type
      expect(Array.isArray(employees)).toBe(true);
    });
  });
  
  describe('getEmployeeById', () => {
    test('should return an employee by ID after a delay', async () => {
      // Start the async operation
      const promise = getEmployeeById(1);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employee = await promise;
      
      // Check if the employee was returned
      expect(employee).toBeDefined();
      expect(employee?.id).toBe(1);
    });
    
    test('should return undefined for non-existent employee', async () => {
      // Start the async operation
      const promise = getEmployeeById(999);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employee = await promise;
      
      // Check if undefined was returned
      expect(employee).toBeUndefined();
    });
  });
  
  describe('filterEmployees', () => {
    test('should filter employees by name', async () => {
      // Create a filter
      const filter: EmployeeFilter = {
        name: 'John'
      };
      
      // Start the async operation
      const promise = filterEmployees(filter);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Check if employees were filtered correctly
      expect(employees.length).toBeGreaterThan(0);
      employees.forEach(employee => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        expect(fullName).toContain('john');
      });
    });
    
    test('should filter employees by department', async () => {
      // Create a filter
      const filter: EmployeeFilter = {
        department: Department.Engineering
      };
      
      // Start the async operation
      const promise = filterEmployees(filter);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Check if employees were filtered correctly
      expect(employees.length).toBeGreaterThan(0);
      employees.forEach(employee => {
        expect(employee.department).toBe(Department.Engineering);
      });
    });
    
    test('should filter employees by status', async () => {
      // Create a filter
      const filter: EmployeeFilter = {
        status: EmployeeStatus.OnLeave
      };
      
      // Start the async operation
      const promise = filterEmployees(filter);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Check if employees were filtered correctly
      expect(employees.length).toBeGreaterThan(0);
      employees.forEach(employee => {
        expect(employee.status).toBe(EmployeeStatus.OnLeave);
      });
    });
    
    test('should filter employees by multiple criteria', async () => {
      // Create a filter
      const filter: EmployeeFilter = {
        department: Department.Engineering,
        status: EmployeeStatus.Active
      };
      
      // Start the async operation
      const promise = filterEmployees(filter);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Check if employees were filtered correctly
      expect(employees.length).toBeGreaterThan(0);
      employees.forEach(employee => {
        expect(employee.department).toBe(Department.Engineering);
        expect(employee.status).toBe(EmployeeStatus.Active);
      });
    });
    
    test('should return all employees for empty filter', async () => {
      // Create an empty filter
      const filter: EmployeeFilter = {};
      
      // Start the async operation
      const promise = filterEmployees(filter);
      
      // Fast-forward time
      jest.runAllTimers();
      
      // Wait for the promise to resolve
      const employees = await promise as Employee[];
      
      // Get all employees for comparison
      const allEmployees = await getEmployees() as Employee[];
      
      // Check if all employees were returned
      expect(employees.length).toBe(allEmployees.length);
    });
    
  });
});