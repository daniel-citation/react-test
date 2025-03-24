import { Employee, Department, EmployeeStatus, EmployeeFilter } from '../shared/types';

// Mock employee data
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
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    manager: 5,
    salary: 120000,
    bio: 'John is a senior software engineer with expertise in React and TypeScript.',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
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
    phone: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    manager: 8,
    salary: 95000,
    bio: 'Jane oversees all HR functions and employee relations.',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@company.com',
    department: Department.Marketing,
    position: 'Marketing Specialist',
    status: EmployeeStatus.OnLeave,
    hireDate: '2021-05-10',
    phone: '555-456-7890',
    address: '789 Pine Rd, Elsewhere, USA',
    manager: 7,
    salary: 85000,
    bio: 'Michael specializes in digital marketing campaigns.',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Williams',
    email: 'emily.williams@company.com',
    department: Department.Sales,
    position: 'Sales Representative',
    status: EmployeeStatus.Active,
    hireDate: '2022-02-15',
    phone: '555-789-0123',
    address: '101 Cedar Ln, Nowhere, USA',
    manager: 9,
    salary: 75000,
    bio: 'Emily excels at building client relationships and closing deals.',
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@company.com',
    department: Department.Engineering,
    position: 'Engineering Director',
    status: EmployeeStatus.Active,
    hireDate: '2018-11-05',
    phone: '555-234-5678',
    address: '202 Maple Dr, Anytown, USA',
    salary: 150000,
    bio: 'David leads the engineering department and oversees all technical projects.',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: 6,
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 'sarah.miller@company.com',
    department: Department.Finance,
    position: 'Financial Analyst',
    status: EmployeeStatus.Active,
    hireDate: '2021-09-12',
    phone: '555-345-6789',
    address: '303 Birch St, Somewhere, USA',
    manager: 10,
    salary: 90000,
    bio: 'Sarah analyzes financial data and prepares reports for management.',
    profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: 7,
    firstName: 'Robert',
    lastName: 'Davis',
    email: 'robert.davis@company.com',
    department: Department.Marketing,
    position: 'Marketing Director',
    status: EmployeeStatus.Active,
    hireDate: '2019-07-22',
    phone: '555-456-7890',
    address: '404 Elm Ct, Elsewhere, USA',
    salary: 130000,
    bio: 'Robert oversees all marketing initiatives and brand strategy.',
    profileImage: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    id: 8,
    firstName: 'Jennifer',
    lastName: 'Wilson',
    email: 'jennifer.wilson@company.com',
    department: Department.HR,
    position: 'HR Director',
    status: EmployeeStatus.Active,
    hireDate: '2018-04-18',
    phone: '555-567-8901',
    address: '505 Spruce Way, Nowhere, USA',
    salary: 135000,
    bio: 'Jennifer leads the HR department and develops company-wide policies.',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    id: 9,
    firstName: 'Thomas',
    lastName: 'Anderson',
    email: 'thomas.anderson@company.com',
    department: Department.Sales,
    position: 'Sales Director',
    status: EmployeeStatus.Active,
    hireDate: '2017-08-30',
    phone: '555-678-9012',
    address: '606 Redwood Ave, Anytown, USA',
    salary: 140000,
    bio: 'Thomas leads the sales team and develops sales strategies.',
    profileImage: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    id: 10,
    firstName: 'Lisa',
    lastName: 'Taylor',
    email: 'lisa.taylor@company.com',
    department: Department.Finance,
    position: 'Finance Director',
    status: EmployeeStatus.Active,
    hireDate: '2016-12-10',
    phone: '555-789-0123',
    address: '707 Sequoia Blvd, Somewhere, USA',
    salary: 145000,
    bio: 'Lisa oversees all financial operations and budgeting processes.',
    profileImage: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
  {
    id: 11,
    firstName: 'James',
    lastName: 'Moore',
    email: 'james.moore@company.com',
    department: Department.Engineering,
    position: 'Software Engineer',
    status: EmployeeStatus.Terminated,
    hireDate: '2021-03-15',
    phone: '555-890-1234',
    address: '808 Aspen Pl, Elsewhere, USA',
    manager: 5,
    salary: 95000,
    bio: 'James specializes in backend development and database design.',
    profileImage: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 12,
    firstName: 'Patricia',
    lastName: 'Jackson',
    email: 'patricia.jackson@company.com',
    department: Department.Operations,
    position: 'Operations Manager',
    status: EmployeeStatus.Active,
    hireDate: '2020-06-22',
    phone: '555-901-2345',
    address: '909 Willow Dr, Nowhere, USA',
    manager: 15,
    salary: 100000,
    bio: 'Patricia manages day-to-day operations and process improvements.',
    profileImage: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: 13,
    firstName: 'Richard',
    lastName: 'White',
    email: 'richard.white@company.com',
    department: Department.Engineering,
    position: 'QA Engineer',
    status: EmployeeStatus.Active,
    hireDate: '2022-01-10',
    phone: '555-012-3456',
    address: '110 Cypress Ln, Anytown, USA',
    manager: 5,
    salary: 90000,
    bio: 'Richard ensures software quality through comprehensive testing.',
    profileImage: 'https://randomuser.me/api/portraits/men/13.jpg',
  },
  {
    id: 14,
    firstName: 'Elizabeth',
    lastName: 'Harris',
    email: 'elizabeth.harris@company.com',
    department: Department.Marketing,
    position: 'Content Specialist',
    status: EmployeeStatus.OnLeave,
    hireDate: '2021-11-05',
    phone: '555-123-4567',
    address: '211 Magnolia St, Somewhere, USA',
    manager: 7,
    salary: 80000,
    bio: 'Elizabeth creates engaging content for various marketing channels.',
    profileImage: 'https://randomuser.me/api/portraits/women/14.jpg',
  },
  {
    id: 15,
    firstName: 'Charles',
    lastName: 'Clark',
    email: 'charles.clark@company.com',
    department: Department.Operations,
    position: 'Operations Director',
    status: EmployeeStatus.Active,
    hireDate: '2017-05-18',
    phone: '555-234-5678',
    address: '312 Juniper Rd, Elsewhere, USA',
    salary: 135000,
    bio: 'Charles oversees all operational aspects of the company.',
    profileImage: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
];

// The return type should be Promise<Employee[]> but it's not specified
export const getEmployees = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockEmployees);
    }, 1000);
  });
};

// Get employee by ID
export const getEmployeeById = (id: number): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const employee = mockEmployees.find(emp => emp.id === id);
      resolve(employee);
    }, Math.random() * (4000 - 500 + 1) + 500);
  });
};

// Filter employees
export const filterEmployees = (filter: EmployeeFilter): Promise<Employee[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      let filteredEmployees = [...mockEmployees];
      
      // Filter by name 
      if (filter.name) {
        const searchName = filter.name.toLowerCase();
        filteredEmployees = filteredEmployees.filter(employee => {
          const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
          return fullName.includes(searchName);
        });
      }
      
      // Filter by department
      if (filter.department) {
        filteredEmployees = filteredEmployees.filter(employee => 
          employee.department === filter.department
        );
      }
      
      // Filter by status
      if (filter.status) {
        filteredEmployees = filteredEmployees.filter(employee => 
          employee.status === filter.status
        );
      }
      
      resolve(filteredEmployees);
    }, Math.floor(Math.random() * (4000 - 500 + 1)) + 500  ); // Simulate network delay with a random number between 500 and 4000 ms
  });
};
