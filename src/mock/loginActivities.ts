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
  // Customer 1: Juan Dela Cruz (CIF10001)
  {
    id: "LOG001",
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
    id: "LOG002",
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
    id: "LOG003",
    customerId: "CIF10001",
    dateTime: "13 Sep 2026, 09:21 AM",
    channel: "Mobile",
    device: "iPhone 15 Pro (iOS 18.0)",
    location: "Cebu City, Cebu",
    activity: "Login",
    status: "Failed",
    ipAddress: "121.54.32.18",
  },
  {
    id: "LOG004",
    customerId: "CIF10001",
    dateTime: "13 Sep 2026, 09:22 AM",
    channel: "Mobile",
    device: "iPhone 15 Pro (iOS 18.0)",
    location: "Cebu City, Cebu",
    activity: "Biometric Auth",
    status: "Success",
    ipAddress: "121.54.32.18",
  },
  {
    id: "LOG005",
    customerId: "CIF10001",
    dateTime: "10 Sep 2026, 02:10 PM",
    channel: "Web",
    device: "Safari 17 (macOS)",
    location: "Taguig, Metro Manila",
    activity: "OTP Verification",
    status: "Success",
    ipAddress: "112.198.102.45",
  },
  {
    id: "LOG006",
    customerId: "CIF10001",
    dateTime: "05 Sep 2026, 08:12 AM",
    channel: "ATM",
    device: "ATM Terminal BGC02",
    location: "Taguig, Metro Manila",
    activity: "PIN Entry",
    status: "Success",
    ipAddress: "10.220.14.88",
  },
];
