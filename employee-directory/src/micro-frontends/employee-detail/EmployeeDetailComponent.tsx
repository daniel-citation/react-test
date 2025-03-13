import React, { useState, useEffect } from 'react';
import { Employee } from '../../shared/types';
import { EventType } from '../../events/eventBus';
import { useEventSubscription } from '../../events/useEventBus';
import { getEmployeeById } from '../../services/employeeService';
import './EmployeeDetailComponent.css';

const EmployeeDetailComponent: React.FC = () => {
  // State for selected employee and loading
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Subscribe to EMPLOYEE_SELECTED events
  useEventSubscription<number>(EventType.EMPLOYEE_SELECTED, (event) => {
    const employeeId = event.payload;
    
    // Fetch employee details
    setLoading(true);
    setError(null);
    
    getEmployeeById(employeeId)
      .then(employee => {
        if (employee) {
          setSelectedEmployee(employee);
        } else {
          setError(`Employee with ID ${employeeId} not found.`);
          setSelectedEmployee(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employee details:', err);
        setError('An error occurred while fetching employee details.');
        setSelectedEmployee(null);
        setLoading(false);
      });
  });
  
  // Render loading state
  if (loading) {
    return (
      <div className="employee-detail-container">
        <h2>Employee Details</h2>
        <div className="loading">Loading employee details...</div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="employee-detail-container">
        <h2>Employee Details</h2>
        <div className="error-state">{error}</div>
      </div>
    );
  }
  
  // Render empty state
  if (!selectedEmployee) {
    return (
      <div className="employee-detail-container">
        <h2>Employee Details</h2>
        <div className="empty-state">Select an employee to view details.</div>
      </div>
    );
  }
  
  return (
    <div className="employee-detail-container">
      <h2>Employee Details</h2>
      <div className="employee-detail-card">
        <div className="employee-header">
          <div className="employee-avatar">
            {selectedEmployee.profileImage ? (
              <img src={selectedEmployee.profileImage} alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} />
            ) : (
              <div className="avatar-placeholder">
                {selectedEmployee.firstName.charAt(0)}{selectedEmployee.lastName.charAt(0)}
              </div>
            )}
          </div>
          <div className="employee-title">
            <h3>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h3>
            <p className="position">{selectedEmployee.position}</p>
            <p className="department">{selectedEmployee.department}</p>
            <span className={`status-badge ${selectedEmployee.status.toLowerCase().replace(' ', '-')}`}>
              {selectedEmployee.status}
            </span>
          </div>
        </div>
        
        <div className="employee-info">
          <div className="info-section">
            <h4>Contact Information</h4>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{selectedEmployee.email}</span>
            </div>
            {selectedEmployee.phone && (
              <div className="info-row">
                <span className="info-label">Phone:</span>
                <span className="info-value">{selectedEmployee.phone}</span>
              </div>
            )}
            {selectedEmployee.address && (
              <div className="info-row">
                <span className="info-label">Address:</span>
                <span className="info-value">{selectedEmployee.address}</span>
              </div>
            )}
          </div>
          
          <div className="info-section">
            <h4>Employment Information</h4>
            <div className="info-row">
              <span className="info-label">Employee ID:</span>
              <span className="info-value">{selectedEmployee.id}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Hire Date:</span>
              <span className="info-value">{new Date(selectedEmployee.hireDate).toLocaleDateString()}</span>
            </div>
            {selectedEmployee.manager !== undefined && (
              <div className="info-row">
                <span className="info-label">Manager ID:</span>
                <span className="info-value">{selectedEmployee.manager}</span>
              </div>
            )}
            {selectedEmployee.salary !== undefined && (
              <div className="info-row">
                <span className="info-label">Salary:</span>
                <span className="info-value">${selectedEmployee.salary.toLocaleString()}</span>
              </div>
            )}
          </div>
          
          {selectedEmployee.bio && (
            <div className="info-section">
              <h4>Biography</h4>
              <p className="bio">{selectedEmployee.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailComponent;