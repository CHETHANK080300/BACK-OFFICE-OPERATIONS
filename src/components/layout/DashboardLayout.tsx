import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Activity,
  MessageSquare,
  ClipboardList,
  Star,
  Share2,
  Headphones,
  Rocket,
  AlertTriangle,
  SmilePlus,
  Sparkles,
  Globe2,
  FileBarChart,
  Bot,
  Settings,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  ShieldCheck,
  Zap,
  Scale,
  LayoutGrid,
  Users,
  History,
  FileSearch,
  Workflow,
  Package,
  ShieldAlert,
  PlayCircle,
  FileText,
  BarChart3,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";

const BrandLogo = () => (
  <svg
    width="152"
    height="44"
    viewBox="0 0 152 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.75" width="44" height="44" rx="22" fill="#0F2158" />
    <path
      d="M27.5979 21.6163L30.616 29.909L25.9625 22.4027L27.5979 21.6163Z"
      fill="white"
    />
    <path
      d="M21.7873 17.2737C21.8243 17.1965 21.8825 17.1302 21.9559 17.0819C22.0293 17.0336 22.1152 17.005 22.2043 16.9993C22.2934 16.9936 22.3824 17.0109 22.462 17.0494C22.5416 17.0879 22.6087 17.1461 22.6563 17.2179L24.4051 19.8675C22.3069 20.8807 20.3816 22.1887 18.6941 23.7472L21.7873 17.2737ZM21.9417 11C21.5458 11.0004 21.16 11.1182 20.8379 11.3368C20.5158 11.5555 20.2736 11.8641 20.1451 12.2197L13.4627 30.013C13.2501 30.4669 13.1358 30.9567 13.1267 31.4533C13.1034 32.0467 13.3256 32.6251 13.7456 33.0649C17.0123 35.3006 24.9967 30.3764 24.9967 30.3764L24.5868 29.8301C24.2917 29.9702 17.9167 33.6358 15.9206 32.106C14.6295 31.1121 17.5888 27.7813 17.5888 27.7813C19.9975 25.639 26.8971 19.8766 31.817 19.5288C31.817 19.5288 33.7912 19.3692 33.4852 21.0054C33.4852 21.0054 33.4784 22.5495 30.3237 25.7026L30.6297 26.3007C30.6297 26.3007 36.4008 21.2688 34.8651 18.2948C34.8651 18.2948 33.6819 16.1253 28.2825 18.0872C28.2825 18.0872 27.5802 18.3636 26.531 18.8411L23.7233 12.1782C23.5884 11.8326 23.3454 11.5345 23.0269 11.3239C22.7085 11.1133 22.3298 11.0003 21.9417 11Z"
      fill="white"
    />
    <g clipPath="url(#clip0_6339_9786)">
      <path
        d="M64.0814 10.736C64.055 10.736 64.0285 10.736 64.0008 10.736C62.0612 10.736 60.3977 11.4304 59.0568 12.799C57.7133 14.1715 57.0315 15.9863 57.0315 18.193L57 29.2934H59.0807V18.8874H68.9284V29.3413H70.9839V17.7607C70.9839 15.7418 70.2958 14.0517 68.9448 12.7398C67.6581 11.4644 65.8874 10.736 64.0814 10.736ZM68.8667 16.8067H59.2521C59.4084 15.7821 59.8835 14.9049 60.6964 14.1412C61.6516 13.2439 62.6548 12.7701 63.7601 12.6944H64.0298C65.2522 12.7096 66.336 13.1544 67.3518 14.0618C68.1735 14.7663 68.7091 15.7455 68.8679 16.8054L68.8667 16.8067Z"
        fill="#E0E0E0"
      />
      <path
        d="M76.9585 16.6176H72.5967V36.0081H74.724V29.2657H77.1727C79.0291 29.2657 80.6082 28.6532 81.8621 27.4521C83.1098 26.2902 83.8067 24.6468 83.7727 22.9517C83.7727 21.1584 83.1741 19.6385 81.997 18.4349C80.8161 17.2289 79.1211 16.6176 76.9585 16.6176ZM81.6214 22.9908C81.5912 24.2183 81.1917 25.2038 80.3977 26.0054C79.6088 26.8018 78.5073 27.1887 77.0303 27.1887L74.724 27.1925V18.6252H76.8173C78.3536 18.6265 79.5218 19.0361 80.3889 19.8767C81.2471 20.7097 81.6517 21.7293 81.6227 22.9908H81.6214Z"
        fill="#E0E0E0"
      />
      <path
        d="M89.1017 16.6176H84.7412V36.0081H86.8685V29.2657H89.316C91.1736 29.2657 92.754 28.6532 94.0054 27.4521C95.2531 26.2902 95.95 24.6468 95.916 22.9517C95.916 21.1584 95.3186 19.6385 94.1415 18.4349C92.9607 17.2289 91.2656 16.6176 89.1017 16.6176ZM93.7597 22.9921C93.7319 24.2196 93.3312 25.2051 92.5372 26.0066C91.747 26.8031 90.6456 27.1913 89.1685 27.1913L86.8685 27.195V18.6252H88.9593C90.4931 18.6265 91.6601 19.0361 92.5271 19.8767C93.3854 20.7097 93.7887 21.7293 93.7609 22.9921H93.7597Z"
        fill="#E0E0E0"
      />
      <path
        d="M107.946 18.4601V16.6428L96.8359 16.6164V18.6971H104.844L96.8359 27.4987V29.3173H107.988V27.2366H99.979L107.946 18.4601Z"
        fill="#E0E0E0"
      />
      <path
        d="M112.071 11.3611C111.852 11.1002 111.52 10.9591 111.18 10.9792H111.147C110.836 10.9792 110.536 11.1103 110.325 11.3397L110.306 11.3611C110.153 11.5489 110.057 11.7757 110.029 12.0164L110.025 12.1387C110.023 12.4285 110.124 12.7108 110.313 12.9377C110.518 13.1771 110.823 13.3158 111.137 13.3158C111.141 13.3158 111.145 13.3158 111.147 13.3158L111.218 13.3195H111.219C111.534 13.3195 111.835 13.1847 112.046 12.9503L112.06 12.9352C112.215 12.7474 112.312 12.5193 112.338 12.276L112.341 12.1551C112.344 11.874 112.251 11.598 112.08 11.3762L112.067 11.3598L112.071 11.3611Z"
        fill="#E0E0E0"
      />
      <path
        d="M112.25 16.9277H110.123V29.2934H112.25V16.9277Z"
        fill="#E0E0E0"
      />
      <path
        d="M117.155 10.712H115.027V29.2934H117.155V10.712Z"
        fill="#E0E0E0"
      />
      <path d="M122.13 10.712H120.003V29.2934H122.13V10.712Z" fill="#E0E0E0" />
      <path
        d="M130.418 16.503C130.418 16.503 130.405 16.503 130.399 16.503C128.635 16.4689 127.08 17.0978 125.785 18.3745C124.492 19.6498 123.837 21.2012 123.837 22.987C123.856 26.5347 126.751 29.4118 130.286 29.4118H130.311C130.341 29.4118 130.371 29.4118 130.402 29.4118C132.078 29.4118 133.704 28.7275 134.876 27.5265C136.108 26.3431 136.801 24.6859 136.779 22.9895C136.799 21.2907 136.117 19.6335 134.908 18.4387C133.741 17.2074 132.103 16.5017 130.418 16.5017V16.503ZM130.195 18.7311C131.349 18.7084 132.442 19.1357 133.274 19.9334C134.106 20.7324 134.577 21.8074 134.601 22.9694C134.644 24.115 134.21 25.2429 133.41 26.0633L133.399 26.0759C132.627 26.9216 131.53 27.4131 130.384 27.4244C129.183 27.437 128.172 27.0161 127.288 26.1238C126.462 25.3273 125.955 24.1074 125.964 22.9366C126.025 20.6253 127.882 18.7777 130.194 18.7311H130.195Z"
        fill="#E0E0E0"
      />
      <path
        d="M148.757 20.5245L148.752 20.5081C148.426 19.5427 147.79 18.6479 146.861 17.8502C145.919 17.0411 144.89 16.5849 143.802 16.4916H143.781L143.576 16.4903C142.067 16.4677 140.621 17.0033 139.502 17.9989C138.298 19.0348 137.688 20.3505 137.688 21.9095V29.2946H139.816V22.285C139.806 21.3298 140.185 20.3946 140.859 19.7179L140.874 19.7028C141.51 19.0096 142.417 18.6189 143.36 18.6278H143.477C144.349 18.6618 145.172 19.0147 145.796 19.6246L145.806 19.6347C146.428 20.2106 146.778 21.0273 146.764 21.8843V29.3198H148.893L148.924 21.6272V21.6247C148.924 21.4407 148.909 21.2541 148.882 21.0739C148.854 20.8899 148.813 20.7059 148.76 20.527L148.757 20.5245Z"
        fill="#E0E0E0"
      />
      <path
        d="M146.964 15.2389H147.793V17.5074H148.137V15.2389H148.964V14.9478H146.964V15.2389Z"
        fill="#E0E0E0"
      />
      <path
        d="M151.745 14.9528C151.721 14.9528 151.696 14.9541 151.674 14.9617C151.652 14.9717 151.635 14.9894 151.626 15.0121L150.746 16.5773C150.73 16.6063 150.716 16.6365 150.703 16.6668C150.689 16.6983 150.678 16.7298 150.665 16.7626C150.654 16.7298 150.641 16.6996 150.628 16.668C150.614 16.6365 150.6 16.6076 150.585 16.5786L149.703 15.007C149.692 14.9856 149.676 14.968 149.655 14.9566C149.632 14.949 149.608 14.9465 149.584 14.9478H149.332V17.5023H149.636V15.6258C149.636 15.5678 149.632 15.5086 149.624 15.4506L150.519 17.055C150.541 17.1041 150.591 17.1356 150.645 17.1343H150.696C150.75 17.1356 150.8 17.1041 150.822 17.055L151.704 15.4582C151.698 15.4872 151.698 15.5162 151.698 15.5452V17.5023H152V14.9478L151.745 14.9528Z"
        fill="#E0E0E0"
      />
    </g>
    <defs>
      <clipPath id="clip0_6339_9786">
        <rect
          width="95"
          height="25.296"
          fill="white"
          transform="translate(57 10.712)"
        />
      </clipPath>
    </defs>
  </svg>
);

const nav = [
  { to: "/", label: "Executive Overview", icon: LayoutDashboard },
  { to: "/application-health", label: "Application Health", icon: Activity },
  { to: "/customer-feedback", label: "Customer Feedback", icon: MessageSquare },
  { to: "/surveys", label: "Survey Analytics", icon: ClipboardList },
  { to: "/ratings", label: "Ratings & Reviews", icon: Star },
  { to: "/social", label: "Social Monitoring", icon: Share2 },
  { to: "/customer-care", label: "Customer Care", icon: Headphones },
  { to: "/releases", label: "Release Impact", icon: Rocket },
  { to: "/issues", label: "Issue Intelligence", icon: AlertTriangle },
  { to: "/sentiment", label: "Sentiment Analysis", icon: SmilePlus },
] as const;

const otherNav = [
  { to: "/recommendations", label: "AI Recommendations", icon: Sparkles },
  { to: "/geographic", label: "Geographic", icon: Globe2 },
  { to: "/reports", label: "Reports", icon: FileBarChart },
  { to: "/assistant", label: "AI Assistant", icon: Bot },
  { to: "/admin", label: "Administration", icon: Settings },
] as const;

const cramNav = [
  { to: "/admin/cram", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/cram/risk-model", label: "Risk Parameters", icon: Zap },
  { to: "/admin/cram/ratings", label: "Risk Ratings", icon: Scale },
  {
    to: "/admin/cram/decision-matrix",
    label: "Decision Matrix",
    icon: FileText,
  },
  {
    to: "/admin/cram/assessments",
    label: "Customer Assessments",
    icon: FileSearch,
  },
  {
    to: "/admin/cram/geography",
    label: "Geography Master",
    icon: Globe2,
  },
  { to: "/admin/cram/product", label: "Product Master", icon: Package },
  {
    to: "/admin/cram/override-rules",
    label: "Override Rules",
    icon: ShieldAlert,
  },
  { to: "/admin/cram/workflows", label: "Workflow Config", icon: Workflow },
  { to: "/admin/cram/roles", label: "Role Management", icon: Users },
  { to: "/admin/cram/simulator", label: "Risk Simulator", icon: PlayCircle },
  { to: "/admin/cram/audit-logs", label: "Audit Logs", icon: History },
] as const;

const transactionNav = [
  {
    to: "/transaction-analyzer",
    label: "Transaction Overview",
    icon: LayoutDashboard,
  },
] as const;

export function DashboardLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [feedbackOpen, setFeedbackOpen] = useState(true);
  const [cramOpen, setCramOpen] = useState(pathname.includes("/admin/cram"));
  const [transactionOpen, setTransactionOpen] = useState(
    pathname.includes("/transaction-analyzer"),
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar h-full">
        <div className="sticky top-0 z-10 flex h-16 items-center border-b border-sidebar-border bg-sidebar px-4">
          <BrandLogo />
        </div>

        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="mb-4">
            <button
              onClick={() => setCramOpen(!cramOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Risk Management</span>
              </div>
              {cramOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>

            {cramOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-sidebar-border/50 pl-2">
                {cramNav.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm relative before:absolute before:left-[-9px] before:h-4 before:w-1 before:bg-primary before:rounded-r"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-sidebar-border/30">
            <button
              onClick={() => setTransactionOpen(!transactionOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 text-primary" />
                <span>Transaction Analyzer</span>
              </div>
              {transactionOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>

            {transactionOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-sidebar-border/50 pl-2">
                {transactionNav.map((item, idx) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={`${item.to}-${idx}`}
                      to="/transaction-analyzer"
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm relative before:absolute before:left-[-9px] before:h-4 before:w-1 before:bg-primary before:rounded-r"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-sidebar-border/30">
            <button
              onClick={() => setFeedbackOpen(!feedbackOpen)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-sidebar-foreground hover:bg-sidebar-accent/50"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Feedback Survey</span>
              </div>
              {feedbackOpen ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>

            {feedbackOpen && (
              <div className="mt-1 ml-4 space-y-1 border-l border-sidebar-border/50 pl-2">
                {nav.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm relative before:absolute before:left-[-9px] before:h-4 before:w-1 before:bg-primary before:rounded-r"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-sidebar-border/30">
            <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Intelligence
            </div>
            {otherNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm relative before:absolute before:left-0 before:h-5 before:w-0.5 before:bg-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                  />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="sticky bottom-0 z-10 border-t border-sidebar-border bg-sidebar p-4">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-accent text-xs font-semibold">
              CK
            </div>
            <div className="flex-1 leading-tight min-w-0">
              <div className="text-xs font-medium truncate">Chethan K</div>
              <div className="text-[10px] text-muted-foreground truncate">
                Product Director
              </div>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 text-muted-foreground hover:text-critical transition-colors rounded-md hover:bg-critical/10"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search feedback, issues, applications…"
                className="w-full rounded-lg border border-input bg-muted/40 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-all"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-all">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical animate-pulse" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              Live · refreshed 12s ago
            </div>
          </div>
          {children}
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--color-primary);
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}
