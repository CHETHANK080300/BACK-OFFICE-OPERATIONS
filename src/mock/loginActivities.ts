export interface LoginActivity {
  id: string;
  customerId: string;
  dateTime: string;
  channel: "Mobile" | "Web" | "ATM" | "Branch Portal";
  device: string;
  location: string;
  activity:
    | "Login"
    | "Password Change"
    | "Biometric Auth"
    | "OTP Verification"
    | "PIN Entry";
  status: "Success" | "Failed";
  ipAddress: string;
}

export const mockLoginActivities: LoginActivity[] = [
  // ==========================================
  // CUSTOMER 1: Juan Dela Cruz (CIF10001)
  // ==========================================
  {
    id: "LOG101",
    customerId: "CIF10001",
    dateTime: "15 Sep 2026, 10:32 AM",
    channel: "Mobile",
    device: "iPhone 15 Pro (iOS 18.0)",
    location: "Taguig, Metro Manila",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "112.198.102.45",
  },
  {
    id: "LOG102",
    customerId: "CIF10001",
    dateTime: "14 Sep 2026, 06:45 PM",
    channel: "Web",
    device: "Chrome 128 (macOS)",
    location: "Makati, Metro Manila",
    activity: "Login",
    status: "Success",
    ipAddress: "112.198.102.45",
  },
  {
    id: "LOG103",
    customerId: "CIF10001",
    dateTime: "13 Sep 2026, 09:21 AM",
    channel: "Mobile",
    device: "iPhone 15 Pro (iOS 18.0)",
    location: "Cebu City, Cebu",
    activity: "Login",
    status: "Failed",
    ipAddress: "121.54.32.18",
  },

  // ==========================================
  // CUSTOMER 2: Maria Santos (CIF10002)
  // ==========================================
  {
    id: "LOG201",
    customerId: "CIF10002",
    dateTime: "14 Sep 2026, 06:45 PM",
    channel: "Web",
    device: "Safari 17 (macOS)",
    location: "Muntinlupa, Metro Manila",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "180.190.44.12",
  },
  {
    id: "LOG202",
    customerId: "CIF10002",
    dateTime: "12 Sep 2026, 03:20 PM",
    channel: "Mobile",
    device: "iPad Pro (iPadOS 17.5)",
    location: "Muntinlupa, Metro Manila",
    activity: "Login",
    status: "Success",
    ipAddress: "180.190.44.12",
  },

  // ==========================================
  // CUSTOMER 3: Jose Reyes (CIF10003)
  // ==========================================
  {
    id: "LOG301",
    customerId: "CIF10003",
    dateTime: "13 Sep 2026, 09:15 AM",
    channel: "Mobile",
    device: "Samsung Galaxy S24 (Android 14)",
    location: "Quezon City, Metro Manila",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "112.200.15.89",
  },
  {
    id: "LOG302",
    customerId: "CIF10003",
    dateTime: "10 Sep 2026, 08:00 PM",
    channel: "ATM",
    device: "ATM Katipunan Terminal",
    location: "Quezon City, Metro Manila",
    activity: "PIN Entry",
    status: "Success",
    ipAddress: "10.220.15.11",
  },

  // ==========================================
  // CUSTOMER 4: Ana Garcia (CIF10004)
  // ==========================================
  {
    id: "LOG401",
    customerId: "CIF10004",
    dateTime: "12 Sep 2026, 02:10 PM",
    channel: "Web",
    device: "Windows 11 Chrome 128",
    location: "Cebu City, Cebu",
    activity: "OTP Verification",
    status: "Success",
    ipAddress: "121.54.88.201",
  },
  {
    id: "LOG402",
    customerId: "CIF10004",
    dateTime: "11 Sep 2026, 11:45 AM",
    channel: "Mobile",
    device: "iPhone 14 (iOS 17.6)",
    location: "Cebu City, Cebu",
    activity: "Login",
    status: "Success",
    ipAddress: "121.54.88.201",
  },

  // ==========================================
  // CUSTOMER 5: Mark Tan (CIF10005)
  // ==========================================
  {
    id: "LOG501",
    customerId: "CIF10005",
    dateTime: "10 Sep 2026, 11:20 AM",
    channel: "Mobile",
    device: "Google Pixel 8 (Android 14)",
    location: "Davao City, Davao",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "110.54.120.33",
  },
  {
    id: "LOG502",
    customerId: "CIF10005",
    dateTime: "08 Sep 2026, 11:15 AM",
    channel: "Mobile",
    device: "Google Pixel 8 (Android 14)",
    location: "Davao City, Davao",
    activity: "Password Reset",
    status: "Success",
    ipAddress: "110.54.120.33",
  },

  // ==========================================
  // CUSTOMER 6: Clarissa Mendoza (CIF10006)
  // ==========================================
  {
    id: "LOG601",
    customerId: "CIF10006",
    dateTime: "15 Sep 2026, 08:05 AM",
    channel: "Web",
    device: "MacBook Pro M3 Safari",
    location: "Makati, Metro Manila",
    activity: "Login",
    status: "Success",
    ipAddress: "112.198.88.99",
  },
  {
    id: "LOG602",
    customerId: "CIF10006",
    dateTime: "14 Sep 2026, 04:50 PM",
    channel: "Mobile",
    device: "iPhone 15 Pro Max",
    location: "Makati, Metro Manila",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "112.198.88.99",
  },
];
