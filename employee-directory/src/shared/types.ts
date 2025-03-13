export enum Department {
  Engineering = 'Engineering',
  HR = 'Human Resources',
  Marketing = 'Marketing',
  Sales = 'Sales',
  Finance = 'Finance',
  Operations = 'Operations',
}

export enum EmployeeStatus {
  Active = 'Active',
  OnLeave = 'On Leave',
  Terminated = 'Terminated',
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  position: string;
  status: EmployeeStatus;
  hireDate: string;
  phone?: string;
  address?: string;
  manager?: number; // ID of the manager
  salary?: number;
  bio?: string;
  profileImage?: string;
}

export interface EmployeeFilter {
  name?: string;
  department?: Department;
  status?: EmployeeStatus;
}