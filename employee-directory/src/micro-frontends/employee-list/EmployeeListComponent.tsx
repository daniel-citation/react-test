import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Employee, EmployeeFilter } from '../../shared/types';
import { EventType } from '../../events/eventBus';
import { useEventSubscription, useEventPublisher } from '../../events/useEventBus';
import { filterEmployees } from '../../services/employeeService';
import './EmployeeListComponent.css';

const EmployeeListComponent: React.FC = () => {
  // State for employees and loading
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<EmployeeFilter>({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  
  // Get the publish function for the EMPLOYEE_SELECTED event
  const publishEmployeeSelected = useEventPublisher<number>(EventType.EMPLOYEE_SELECTED);
  
  // Subscribe to EMPLOYEE_FILTER_CHANGED events
  useEventSubscription<EmployeeFilter>(EventType.EMPLOYEE_FILTER_CHANGED, (event) => {
    setFilter(event.payload);
  });
  
  // Fetch employees when filter changes
  useEffect(() => {
    setLoading(true);
    
    filterEmployees(filter)
      .then(filteredEmployees => {
        setEmployees(filteredEmployees);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  });
  
  // Handle employee selection
  const handleEmployeeSelect = useCallback((employeeId: number) => {
    setSelectedEmployeeId(prevId => prevId === employeeId ? null : employeeId);
    
    // Publish employee selected event
    publishEmployeeSelected(employeeId);
  }, [publishEmployeeSelected]);
  
  // Render loading state
  if (loading) {
    return (
      <div className="employee-list-container">
        <h2>Employees</h2>
        <div className="loading">Loading employees...</div>
      </div>
    );
  }
  
  // Render empty state
  if (employees.length === 0) {
    return (
      <div className="employee-list-container">
        <h2>Employees</h2>
        <div className="empty-state">No employees found matching the filter criteria.</div>
      </div>
    );
  }
  
  return (
    <div className="employee-list-container">
      <h2>Employees ({employees.length})</h2>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr 
                key={employee.id}
                className={selectedEmployeeId === employee.id ? 'selected' : ''}
                onClick={() => handleEmployeeSelect(employee.id)}
              >
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase().replace(' ', '-')}`}>
                    {employee.status}
                  </span>
                </td>
                <td>{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeListComponent;
