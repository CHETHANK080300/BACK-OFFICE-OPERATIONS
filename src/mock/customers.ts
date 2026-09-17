export interface Customer {
  id: string; // CIF
  name: string;
  segment: "Retail" | "Premium" | "SME" | "Corporate";
  mobile: string;
  email: string;
  productsCount: number;
  kycStatus: "Verified" | "Pending" | "Expired" | "Under Review";
  lastLogin: string;
  status: "Active" | "Inactive" | "Dormant" | "Blocked";
  customerSince: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  customerType: string;
  residentialAddress: string;
  mailingAddress: string;
  kycDate: string;
  kycExpiry: string;
  idType: string;
  idNumber: string;
  riskCategory: "Low" | "Medium" | "High";
  rmName: string;
  branch: string;
  totalRelationshipValue: number; // in PHP
  openServiceRequestsCount: number;
  applicationsCount: number;
  currentYearTransactionsCount: number;
}

export const mockCustomers: Customer[] = [
  {
    id: "CIF10001",
    name: "Juan Dela Cruz",
    segment: "Premium",
    mobile: "+63 917 555 1234",
    email: "juan.delacruz@gmail.com",
    productsCount: 5,
    kycStatus: "Verified",
    lastLogin: "15 Sep 2026, 10:32 AM",
    status: "Active",
    customerSince: "2020",
    dateOfBirth: "14 May 1985",
    gender: "Male",
    nationality: "Filipino",
    customerType: "Individual",
    residentialAddress:
      "Unit 12B, Pacific Plaza Towers, Bonifacio Global City, Taguig, Metro Manila, Philippines",
    mailingAddress:
      "Unit 12B, Pacific Plaza Towers, Bonifacio Global City, Taguig, Metro Manila, Philippines",
    kycDate: "10 Jan 2024",
    kycExpiry: "10 Jan 2029",
    idType: "Philippine Passport",
    idNumber: "P8923411A",
    riskCategory: "Low",
    rmName: "Clarissa Reyes",
    branch: "BGC Main Branch",
    totalRelationshipValue: 2450000,
    openServiceRequestsCount: 2,
    applicationsCount: 3,
    currentYearTransactionsCount: 1580,
  },
  {
    id: "CIF10002",
    name: "Maria Santos",
    segment: "Premium",
    mobile: "+63 918 888 2345",
    email: "maria.santos@yahoo.com",
    productsCount: 7,
    kycStatus: "Verified",
    lastLogin: "14 Sep 2026, 06:45 PM",
    status: "Active",
    customerSince: "2018",
    dateOfBirth: "22 Oct 1982",
    gender: "Female",
    nationality: "Filipino",
    customerType: "Individual",
    residentialAddress:
      "45 Jasmine St., Ayala Alabang Village, Muntinlupa City, Metro Manila, Philippines",
    mailingAddress:
      "45 Jasmine St., Ayala Alabang Village, Muntinlupa City, Metro Manila, Philippines",
    kycDate: "15 Mar 2023",
    kycExpiry: "15 Mar 2028",
    idType: "Driver's License",
    idNumber: "N01-12-892341",
    riskCategory: "Low",
    rmName: "Marco Mendoza",
    branch: "Alabang Town Center Branch",
    totalRelationshipValue: 4120000,
    openServiceRequestsCount: 1,
    applicationsCount: 1,
    currentYearTransactionsCount: 2140,
  },
  {
    id: "CIF10003",
    name: "Jose Reyes",
    segment: "Retail",
    mobile: "+63 922 333 4567",
    email: "jose.reyes@outlook.com",
    productsCount: 3,
    kycStatus: "Verified",
    lastLogin: "13 Sep 2026, 09:15 AM",
    status: "Active",
    customerSince: "2022",
    dateOfBirth: "03 Aug 1991",
    gender: "Male",
    nationality: "Filipino",
    customerType: "Individual",
    residentialAddress:
      "102 Katipunan Ave., Loyola Heights, Quezon City, Metro Manila, Philippines",
    mailingAddress:
      "102 Katipunan Ave., Loyola Heights, Quezon City, Metro Manila, Philippines",
    kycDate: "05 Feb 2024",
    kycExpiry: "05 Feb 2029",
    idType: "UMID",
    idNumber: "CRN-0111-2345678-9",
    riskCategory: "Low",
    rmName: "Patricia Garcia",
    branch: "Katipunan Avenue Branch",
    totalRelationshipValue: 680000,
    openServiceRequestsCount: 0,
    applicationsCount: 2,
    currentYearTransactionsCount: 890,
  },
  {
    id: "CIF10004",
    name: "Ana Garcia",
    segment: "SME",
    mobile: "+63 999 111 8899",
    email: "ana.garcia@garciatrading.ph",
    productsCount: 6,
    kycStatus: "Pending",
    lastLogin: "12 Sep 2026, 02:10 PM",
    status: "Active",
    customerSince: "2019",
    dateOfBirth: "19 Nov 1978",
    gender: "Female",
    nationality: "Filipino",
    customerType: "Sole Proprietorship",
    residentialAddress: "88 Fuente Osmeña Blvd, Cebu City, Cebu, Philippines",
    mailingAddress: "88 Fuente Osmeña Blvd, Cebu City, Cebu, Philippines",
    kycDate: "20 Aug 2021",
    kycExpiry: "20 Aug 2026",
    idType: "Philippine Passport",
    idNumber: "P3341209B",
    riskCategory: "Medium",
    rmName: "Rafael Tan",
    branch: "Cebu Business Park Branch",
    totalRelationshipValue: 5850000,
    openServiceRequestsCount: 3,
    applicationsCount: 1,
    currentYearTransactionsCount: 3420,
  },
  {
    id: "CIF10005",
    name: "Mark Tan",
    segment: "Retail",
    mobile: "+63 905 777 3322",
    email: "mark.tan@techinnovations.ph",
    productsCount: 2,
    kycStatus: "Verified",
    lastLogin: "10 Sep 2026, 11:20 AM",
    status: "Active",
    customerSince: "2023",
    dateOfBirth: "11 Dec 1996",
    gender: "Male",
    nationality: "Filipino",
    customerType: "Individual",
    residentialAddress:
      "12 J.P. Laurel Ave, Bajada, Davao City, Davao del Sur, Philippines",
    mailingAddress:
      "12 J.P. Laurel Ave, Bajada, Davao City, Davao del Sur, Philippines",
    kycDate: "12 Jun 2023",
    kycExpiry: "12 Jun 2028",
    idType: "Driver's License",
    idNumber: "L02-15-998877",
    riskCategory: "Low",
    rmName: "Sheila Cruz",
    branch: "Davao Bajada Branch",
    totalRelationshipValue: 320000,
    openServiceRequestsCount: 0,
    applicationsCount: 0,
    currentYearTransactionsCount: 450,
  },
  {
    id: "CIF10006",
    name: "Clarissa Mendoza",
    segment: "Premium",
    mobile: "+63 917 222 9988",
    email: "cmendoza@lawfirm.ph",
    productsCount: 8,
    kycStatus: "Verified",
    lastLogin: "15 Sep 2026, 08:05 AM",
    status: "Active",
    customerSince: "2017",
    dateOfBirth: "28 Feb 1975",
    gender: "Female",
    nationality: "Filipino",
    customerType: "Individual",
    residentialAddress:
      "77 Salcedo St., Legaspi Village, Makati City, Metro Manila, Philippines",
    mailingAddress:
      "77 Salcedo St., Legaspi Village, Makati City, Metro Manila, Philippines",
    kycDate: "10 Apr 2024",
    kycExpiry: "10 Apr 2029",
    idType: "Philippine Passport",
    idNumber: "P1290384C",
    riskCategory: "Low",
    rmName: "Clarissa Reyes",
    branch: "Makati Main Branch",
    totalRelationshipValue: 8900000,
    openServiceRequestsCount: 1,
    applicationsCount: 2,
    currentYearTransactionsCount: 4100,
  },
];
