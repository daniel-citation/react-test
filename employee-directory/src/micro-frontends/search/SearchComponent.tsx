import React, { useState, useEffect, useCallback } from 'react';
import { Department, EmployeeStatus, EmployeeFilter } from '../../shared/types';
import { EventType } from '../../events/eventBus';
import { useEventPublisher } from '../../events/useEventBus';
import './SearchComponent.css';

const SearchComponent: React.FC = () => {
  // State for filter values
  const [nameFilter, setNameFilter] = useState<string>('');
  const [departmentFilter, setDepartmentFilter] = useState<Department | ''>('');
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | ''>('');
  
  // Get the publish function for the EMPLOYEE_FILTER_CHANGED event
  const publishFilterChanged = useEventPublisher<EmployeeFilter>(EventType.EMPLOYEE_FILTER_CHANGED);
  
  // Handle filter changes
  useEffect(() => {
    const filter: EmployeeFilter = {};
    
    if (nameFilter) {
      filter.name = nameFilter;
    }
    
    if (departmentFilter) {
      filter.department = departmentFilter as Department;
    }
    
    if (statusFilter) {
      filter.status = statusFilter as EmployeeStatus;
    }
    
    // Publish filter changed event
    publishFilterChanged(filter);
  });
  
  // Handle input changes
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  }, []);
  
  const handleDepartmentChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentFilter(e.target.value as Department | '');
  }, []);
  
  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value as EmployeeStatus | '');
  }, []);
  
  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const filter: EmployeeFilter = {};
    
    if (nameFilter) {
      filter.name = nameFilter;
    }
    
    if (departmentFilter) {
      filter.department = departmentFilter as Department;
    }
    
    if (statusFilter) {
      filter.status = statusFilter as EmployeeStatus;
    }
    
    // Publish filter changed event
    publishFilterChanged(filter);
  }, [nameFilter, departmentFilter, statusFilter, publishFilterChanged]);
  
  // Handle reset button
  const handleReset = useCallback(() => {
    setNameFilter('');
    setDepartmentFilter('');
    setStatusFilter('');
    
    // Publish empty filter
    publishFilterChanged({});
  }, [publishFilterChanged]);
  
  return (
    <div className="search-container">
      <h2>Employee Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={nameFilter}
            onChange={handleNameChange}
            placeholder="Search by name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={departmentFilter}
            onChange={handleDepartmentChange}
          >
            <option value="">All Departments</option>
            {Object.values(Department).map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            {Object.values(EmployeeStatus).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <div className="button-group">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
};

export default SearchComponent;