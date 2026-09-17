import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Bot,
  Send,
  Sparkles,
  User,
  BarChart2,
  Table,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { InlineFilters } from "@/components/dashboard/InlineFilters";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant" },
      {
        name: "description",
        content:
          "Conversational analytics assistant to query, visualize and explore customer intelligence data.",
      },
    ],
  }),
  component: AIAssistant,
});

const exampleQueries = [
  "Show top complaints this week",
  "Which application has lowest rating?",
  "Show all login issues from Malaysia",
  "Compare sentiment between versions 5.1 and 5.2",
];

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your CXIP Intelligence Assistant. How can I help you explore customer data today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    // Mock response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Based on the latest data from the last 7 days, the 'Login Failure' cluster has seen a 72% increase in Malaysia and Singapore. This correlates with the release of version 5.2. Would you like to see a detailed version comparison?",
          hasChart: true,
        },
      ]);
    }, 1000);
  };

  return (
    <DashboardLayout
      title="AI Intelligence Assistant"
      subtitle="Conversational interface to query and visualize customer experience data"
    >
      <InlineFilters />

      <div className="flex flex-col h-[calc(100vh-220px)] max-w-5xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-elevated">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-muted/5">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`h-10 w-10 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-gradient-primary shadow-glow"
                    : "bg-card border border-border"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <User className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className={`max-w-[85%] space-y-4`}>
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "assistant"
                      ? "bg-card border border-border/50 text-foreground"
                      : "bg-primary text-primary-foreground font-medium"
                  }`}
                >
                  {msg.content}
                </div>

                {msg.hasChart && (
                  <div className="p-6 bg-card border border-dashed border-border rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <BarChart2 className="h-4 w-4 text-primary" /> Version
                        Comparison
                      </div>
                      <button className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-widest hover:opacity-80 transition-opacity">
                        Full Dashboard <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="h-48 flex items-end gap-4 px-4">
                      <div className="flex-1 bg-primary/20 h-[40%] rounded-t-lg relative group transition-all hover:bg-primary/30 cursor-help">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-card border border-border px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          v5.1
                        </div>
                      </div>
                      <div className="flex-1 bg-primary h-[90%] rounded-t-lg relative group transition-all hover:opacity-90 cursor-help shadow-glow">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-card border border-border px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          v5.2
                        </div>
                      </div>
                      <div className="flex-1 bg-primary/40 h-[65%] rounded-t-lg relative group transition-all hover:bg-primary/50 cursor-help">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-card border border-border px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          v5.2.1
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-card border-t border-border shadow-inner">
          <div className="flex flex-wrap gap-2 mb-6">
            {exampleQueries.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="px-4 py-2 bg-muted/50 border border-border rounded-full text-xs text-foreground hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question about your customer experience data..."
              className="w-full bg-muted/30 border border-border rounded-2xl py-5 pl-8 pr-16 text-sm text-foreground focus:border-primary focus:bg-card outline-none shadow-sm transition-all"
            />
            <button
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-12 w-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-glow hover:opacity-90 transition-all"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            <span className="flex items-center gap-2 transition-colors hover:text-foreground cursor-default">
              <Sparkles className="h-4 w-4 text-primary" /> GPT-4o Powered
            </span>
            <span className="flex items-center gap-2 transition-colors hover:text-foreground cursor-default">
              <Table className="h-4 w-4 text-primary" /> Real-time Data Access
            </span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
