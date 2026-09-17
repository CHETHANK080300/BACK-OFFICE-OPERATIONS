export type IssueDetail = {
  id: string;
  title: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  totalComplaints: number;
  trend: string;
  trendDirection: "up" | "down";
  affectedUsers: number;
  firstSeen: string;
  sentiment: { positive: number; neutral: number; negative: number };
  countries: { name: string; count: number }[];
  versions: {
    version: string;
    count: number;
    status: "regressed" | "stable" | "fixed";
  }[];
  modules: string[];
  tickets: {
    id: string;
    title: string;
    status: "open" | "in_progress" | "resolved";
    priority: string;
    assignee: string;
  }[];
  timeline: { d: string; count: number }[];
  comments: {
    user: string;
    channel: string;
    rating?: number;
    text: string;
    time: string;
    sentiment: "positive" | "neutral" | "negative";
  }[];
  rootCause?: string;
};

const base: Record<string, IssueDetail> = {
  "login-failure": {
    id: "login-failure",
    title: "Login Failure",
    category: "Authentication",
    severity: "critical",
    totalComplaints: 1842,
    trend: "+24% w/w",
    trendDirection: "up",
    affectedUsers: 850,
    firstSeen: "May 10, 2026 · post release 5.2",
    sentiment: { positive: 4, neutral: 12, negative: 84 },
    countries: [
      { name: "Malaysia", count: 612 },
      { name: "Singapore", count: 480 },
      { name: "India", count: 410 },
      { name: "UAE", count: 220 },
      { name: "UK", count: 120 },
    ],
    versions: [
      { version: "5.2.1", count: 1180, status: "regressed" },
      { version: "5.2.0", count: 540, status: "regressed" },
      { version: "5.1.3", count: 78, status: "stable" },
      { version: "5.1.2", count: 44, status: "stable" },
    ],
    modules: ["Authentication", "Biometric", "OTP Service", "Session Manager"],
    tickets: [
      {
        id: "INC-48211",
        title: "OTP not delivered on Malaysia carriers",
        status: "in_progress",
        priority: "P1",
        assignee: "Auth Squad",
      },
      {
        id: "INC-48230",
        title: "Biometric fallback loops on Android 14",
        status: "open",
        priority: "P1",
        assignee: "Mobile Core",
      },
      {
        id: "INC-48244",
        title: "Session token expires mid-flow",
        status: "in_progress",
        priority: "P2",
        assignee: "Platform",
      },
      {
        id: "INC-48301",
        title: "Login screen blank after update",
        status: "resolved",
        priority: "P2",
        assignee: "Mobile Core",
      },
    ],
    timeline: [
      { d: "May 09", count: 32 },
      { d: "May 10", count: 210 },
      { d: "May 11", count: 380 },
      { d: "May 12", count: 420 },
      { d: "May 13", count: 360 },
      { d: "May 14", count: 290 },
      { d: "May 15", count: 150 },
    ],
    rootCause:
      "Release 5.2 introduced a regression in the biometric fallback flow. Sessions issued during fallback expire before OTP confirmation, causing repeated re-auth loops. Compounded by SMS delivery latency on regional carriers.",
    comments: [
      {
        user: "Priya R.",
        channel: "Play Store · ★1",
        rating: 1,
        text: "Cannot login after the update. Biometric keeps failing and OTP never arrives.",
        time: "2h ago",
        sentiment: "negative",
      },
      {
        user: "Wei L.",
        channel: "App Store · ★2",
        rating: 2,
        text: "Stuck on login screen for 10 minutes. Had to use the web app instead.",
        time: "5h ago",
        sentiment: "negative",
      },
      {
        user: "Anika S.",
        channel: "Mobile App",
        text: "Face ID worked before 5.2. Now it just spins and logs me out.",
        time: "8h ago",
        sentiment: "negative",
      },
      {
        user: "Rahul M.",
        channel: "Twitter/X",
        text: "@yourbank login broken again. Third day in a row. Please fix.",
        time: "10h ago",
        sentiment: "negative",
      },
      {
        user: "Lina T.",
        channel: "Customer Care",
        text: "Customer reports OTP arriving 5+ minutes late. Switched provider workaround unsuccessful.",
        time: "1d ago",
        sentiment: "neutral",
      },
    ],
  },
  "upi-timeout": {
    id: "upi-timeout",
    title: "UPI Timeout",
    category: "Payments",
    severity: "high",
    totalComplaints: 1320,
    trend: "+18% w/w",
    trendDirection: "up",
    affectedUsers: 612,
    firstSeen: "May 08, 2026",
    sentiment: { positive: 6, neutral: 18, negative: 76 },
    countries: [
      { name: "India", count: 1120 },
      { name: "UAE", count: 142 },
      { name: "Singapore", count: 58 },
    ],
    versions: [
      { version: "5.2.1", count: 820, status: "regressed" },
      { version: "5.2.0", count: 380, status: "regressed" },
      { version: "5.1.3", count: 120, status: "stable" },
    ],
    modules: ["Payments", "UPI Gateway", "Transaction Ledger"],
    tickets: [
      {
        id: "INC-48190",
        title: "UPI gateway timeout >30s during peak",
        status: "in_progress",
        priority: "P1",
        assignee: "Payments",
      },
      {
        id: "INC-48202",
        title: "Duplicate debit on retry",
        status: "open",
        priority: "P1",
        assignee: "Ledger",
      },
    ],
    timeline: [
      { d: "May 09", count: 80 },
      { d: "May 10", count: 140 },
      { d: "May 11", count: 220 },
      { d: "May 12", count: 260 },
      { d: "May 13", count: 280 },
      { d: "May 14", count: 240 },
      { d: "May 15", count: 100 },
    ],
    rootCause:
      "UPI gateway connection pool exhausted during evening peak (19:00–21:00 IST). Retry logic introduced in 5.2 causes duplicate debit risk before timeout.",
    comments: [
      {
        user: "Ravi K.",
        channel: "Mobile App",
        text: "Payment failed but money debited. Refund still pending after 2 days.",
        time: "3h ago",
        sentiment: "negative",
      },
      {
        user: "Meera P.",
        channel: "Play Store · ★1",
        rating: 1,
        text: "UPI keeps timing out. Lost faith in this app for daily payments.",
        time: "7h ago",
        sentiment: "negative",
      },
    ],
  },
  "app-crash": {
    id: "app-crash",
    title: "App Crash on Launch",
    category: "Stability",
    severity: "critical",
    totalComplaints: 980,
    trend: "+12% w/w",
    trendDirection: "up",
    affectedUsers: 540,
    firstSeen: "May 11, 2026",
    sentiment: { positive: 2, neutral: 8, negative: 90 },
    countries: [
      { name: "India", count: 480 },
      { name: "Malaysia", count: 210 },
      { name: "Singapore", count: 180 },
      { name: "UK", count: 110 },
    ],
    versions: [
      { version: "5.2.1", count: 720, status: "regressed" },
      { version: "5.2.0", count: 220, status: "regressed" },
      { version: "5.1.3", count: 40, status: "stable" },
    ],
    modules: ["Bootstrap", "Splash", "Crash Reporter"],
    tickets: [
      {
        id: "INC-48270",
        title: "Null pointer in splash analytics init",
        status: "in_progress",
        priority: "P1",
        assignee: "Mobile Core",
      },
    ],
    timeline: [
      { d: "May 09", count: 20 },
      { d: "May 10", count: 80 },
      { d: "May 11", count: 220 },
      { d: "May 12", count: 240 },
      { d: "May 13", count: 200 },
      { d: "May 14", count: 140 },
      { d: "May 15", count: 80 },
    ],
    rootCause:
      "Analytics SDK initialization race condition on cold start, primarily on Android 14 devices with low memory.",
    comments: [
      {
        user: "Kavita B.",
        channel: "Play Store · ★1",
        rating: 1,
        text: "App crashes the moment I open it. Reinstalled twice. No luck.",
        time: "4h ago",
        sentiment: "negative",
      },
    ],
  },
  "slow-loading": {
    id: "slow-loading",
    title: "Slow Loading",
    category: "Performance",
    severity: "medium",
    totalComplaints: 720,
    trend: "+8% w/w",
    trendDirection: "up",
    affectedUsers: 410,
    firstSeen: "May 05, 2026",
    sentiment: { positive: 8, neutral: 32, negative: 60 },
    countries: [
      { name: "India", count: 320 },
      { name: "Malaysia", count: 180 },
      { name: "Singapore", count: 120 },
      { name: "UAE", count: 100 },
    ],
    versions: [
      { version: "5.2.1", count: 380, status: "regressed" },
      { version: "5.2.0", count: 240, status: "regressed" },
      { version: "5.1.3", count: 100, status: "stable" },
    ],
    modules: ["Dashboard", "Accounts", "API Gateway"],
    tickets: [
      {
        id: "INC-48155",
        title: "Dashboard tile API > 4s p95",
        status: "in_progress",
        priority: "P2",
        assignee: "Platform",
      },
    ],
    timeline: [
      { d: "May 09", count: 60 },
      { d: "May 10", count: 90 },
      { d: "May 11", count: 120 },
      { d: "May 12", count: 140 },
      { d: "May 13", count: 130 },
      { d: "May 14", count: 110 },
      { d: "May 15", count: 70 },
    ],
    rootCause:
      "Dashboard aggregation endpoint regressed to ~4.2s p95 after schema migration. CDN cache hit ratio also dropped.",
    comments: [
      {
        user: "Sandeep T.",
        channel: "In-App",
        text: "Dashboard takes forever to load every morning.",
        time: "6h ago",
        sentiment: "negative",
      },
    ],
  },
  "beneficiary-issue": {
    id: "beneficiary-issue",
    title: "Beneficiary Add Issue",
    category: "Transfers",
    severity: "high",
    totalComplaints: 540,
    trend: "+5% w/w",
    trendDirection: "up",
    affectedUsers: 280,
    firstSeen: "May 02, 2026",
    sentiment: { positive: 6, neutral: 22, negative: 72 },
    countries: [
      { name: "India", count: 260 },
      { name: "Singapore", count: 140 },
      { name: "Malaysia", count: 100 },
      { name: "UK", count: 40 },
    ],
    versions: [
      { version: "5.2.1", count: 280, status: "regressed" },
      { version: "5.2.0", count: 180, status: "regressed" },
      { version: "5.1.3", count: 80, status: "stable" },
    ],
    modules: ["Beneficiary", "KYC", "Transfers"],
    tickets: [
      {
        id: "INC-48133",
        title: "Beneficiary verification stuck on 'pending'",
        status: "open",
        priority: "P2",
        assignee: "Transfers",
      },
    ],
    timeline: [
      { d: "May 09", count: 50 },
      { d: "May 10", count: 70 },
      { d: "May 11", count: 90 },
      { d: "May 12", count: 100 },
      { d: "May 13", count: 95 },
      { d: "May 14", count: 80 },
      { d: "May 15", count: 55 },
    ],
    rootCause:
      "KYC verification webhook from partner returns 202 but never finalizes; UI shows 'pending' indefinitely.",
    comments: [
      {
        user: "Neha G.",
        channel: "Mobile App",
        text: "Added a beneficiary 3 days ago. Still says pending verification.",
        time: "1d ago",
        sentiment: "negative",
      },
    ],
  },
};

// KPI-level synthetic detail (so KPI cards can drill down too)
const kpiDetail = (
  overrides: Partial<IssueDetail> &
    Pick<IssueDetail, "id" | "title" | "category">,
): IssueDetail => ({
  severity: "medium",
  totalComplaints: 0,
  trend: "—",
  trendDirection: "up",
  affectedUsers: 0,
  firstSeen: "—",
  sentiment: { positive: 70, neutral: 18, negative: 12 },
  countries: [],
  versions: [],
  modules: [],
  tickets: [],
  timeline: [],
  comments: [],
  ...overrides,
});

base["critical-open"] = kpiDetail({
  id: "critical-open",
  title: "Critical Open Issues",
  category: "Operations",
  severity: "critical",
  totalComplaints: 23,
  trend: "+18% w/w",
  trendDirection: "up",
  modules: ["Authentication", "Payments", "Stability"],
  timeline: [
    { d: "Mon", count: 14 },
    { d: "Tue", count: 16 },
    { d: "Wed", count: 17 },
    { d: "Thu", count: 19 },
    { d: "Fri", count: 22 },
    { d: "Sat", count: 23 },
    { d: "Sun", count: 23 },
  ],
  tickets: base["login-failure"].tickets.concat(base["upi-timeout"].tickets),
  comments: base["login-failure"].comments.slice(0, 3),
  rootCause:
    "Most open critical issues trace back to release 5.2 authentication and payments regressions.",
});

base["negative-sentiment"] = kpiDetail({
  id: "negative-sentiment",
  title: "Negative Sentiment Drivers",
  category: "Voice of Customer",
  severity: "high",
  totalComplaints: 6700,
  trend: "-2% w/w",
  trendDirection: "down",
  sentiment: { positive: 0, neutral: 0, negative: 100 },
  modules: ["Authentication", "Payments", "Stability", "Transfers"],
  timeline: base["login-failure"].timeline,
  comments: base["login-failure"].comments.concat(base["upi-timeout"].comments),
  rootCause:
    "Top negative themes: Login Failure (28%), UPI Timeout (19%), App Crash (14%).",
});

export function getIssue(id: string): IssueDetail | null {
  return base[id] ?? null;
}

export function listIssueIds(): string[] {
  return Object.keys(base);
}
