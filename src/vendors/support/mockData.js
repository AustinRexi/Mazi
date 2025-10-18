export const MOCK_TICKETS = [
  {
    id: "TKT-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=32&h=32&fit=crop&crop=faces",
    },
    subject: "Product not as described - Wireless Headphones",
    status: "open",
    priority: "high",
    created: "2024-03-15T10:30:00Z",
    lastReply: "2024-03-15T14:22:00Z",
    orderId: "ORD-12345",
    messages: [
      {
        id: "MSG-001",
        sender: "customer",
        message:
          "Hi, I received the wireless headphones but they don’t match the description.",
        timestamp: "2024-03-15T10:30:00Z",
        senderName: "Sarah Johnson",
      },
      {
        id: "MSG-002",
        sender: "vendor",
        message:
          "Hi Sarah, sorry about the issue. Could you provide more details?",
        timestamp: "2024-03-15T11:15:00Z",
        senderName: "John's Electronics",
      },
    ],
  },
  {
    id: "TKT-002",
    customer: { name: "Mike Chen", email: "mike.chen@email.com" },
    subject: "Shipping delay inquiry",
    status: "in-progress",
    priority: "medium",
    created: "2024-03-14T09:15:00Z",
    lastReply: "2024-03-15T08:30:00Z",
    orderId: "ORD-12346",
    messages: [
      {
        id: "MSG-004",
        sender: "customer",
        message:
          "Hello, my order was supposed to arrive yesterday but hasn’t arrived yet.",
        timestamp: "2024-03-14T09:15:00Z",
        senderName: "Mike Chen",
      },
      {
        id: "MSG-005",
        sender: "vendor",
        message:
          "There was a delay due to weather. It should arrive within 2 days.",
        timestamp: "2024-03-15T08:30:00Z",
        senderName: "John's Electronics",
      },
    ],
  },
];
