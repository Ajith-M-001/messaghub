// constants/sampleData.js
export const sampleChats = [
  {
    avatar: [
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
    ],
    name: "Jane Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://media.istockphoto.com/id/1167753373/vector/woman-avatar-isolated-on-white-background-vector-illustration-for-your-design.jpg",
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
    ],
    name: "body Boi",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    _id: "1",
    name: "Jane Doe",
    avatar:
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
  },
  {
    _id: "2",
    name: "body Boi",
    avatar:
      "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
  },
];

export const sampleNotification = [
  {
    _id: "1",
    sender: {
      name: "Jane Doe",
      avatar:
        "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
    },
  },
  {
    _id: "2",
    sender: {
      name: "body Boi",
      avatar:
        "https://www.w3.org/thumbnails/200/avatar-images/7mtpjeh4in8kw04ksso8ss4ocsksswo.webp",
    },
  },
];

export const sampleMessage = [
  {
    _id: "sfnsdjkfsdnfkjs",
    content: "L*uda ka Message hai", // Replace with appropriate content if needed
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    sender: {
      _id: "user._id",
      name: "Chaman",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z", // ISO format corrected
  },
  {
    _id: "sfnsdjkfsdnfkjsbnd",
    content: "L*uda ka Message hai 22", // Replace with appropriate content if needed
    attachments: [
      {
        public_id: "asdsad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    sender: {
      _id: "1",
      name: "Chaman 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630Z", // ISO format corrected
  },
];

export const dashboardTableData = {
  users: [
    {
      _id: 1,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Example avatar URL
      name: "John Doe",
      username: "johndoe123",
      friends: 25,
      groups: 4,
    },
    {
      _id: 2,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
      username: "janesmith456",
      friends: 18,
      groups: 3,
    },
    {
      _id: 3,
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Mike Johnson",
      username: "mikej789",
      friends: 32,
      groups: 5,
    },
    {
      _id: 4,
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Emily Davis",
      username: "emilydavis910",
      friends: 22,
      groups: 2,
    },
    {
      _id: 5,
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Chris Wilson",
      username: "chriswilson101",
      friends: 30,
      groups: 6,
    },
  ],
  chats: [
    {
      _id: 1,
      avatar: ["https://randomuser.me/api/portraits/men/10.jpg"],
      name: "Tech Enthusiasts",
      totalmembers: 5,
      members: [
        {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "Jane Smith",
          avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          name: "Mike Johnson",
          avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
          name: "Emily Davis",
          avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
          name: "Chris Wilson",
          avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        },
      ],
      totalmessages: 250,
      creator: {
        name: "Alice Thompson",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      },
    },
    {
      _id: 2,
      avatar: ["https://randomuser.me/api/portraits/women/12.jpg"],
      name: "Movie Buffs",
      totalmembers: 3,
      members: [
        {
          name: "Steve Rogers",
          avatar: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        {
          name: "Natasha Romanoff",
          avatar: "https://randomuser.me/api/portraits/women/7.jpg",
        },
        {
          name: "Tony Stark",
          avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        },
      ],
      totalmessages: 150,
      creator: {
        name: "Bruce Banner",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      },
    },
    {
      _id: 3,
      avatar: ["https://randomuser.me/api/portraits/men/13.jpg"],
      name: "Developers Hub",
      totalmembers: 4,
      members: [
        {
          name: "Peter Parker",
          avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        {
          name: "Bruce Wayne",
          avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        },
        {
          name: "Clark Kent",
          avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        },
        {
          name: "Diana Prince",
          avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        },
      ],
      totalmessages: 500,
      creator: {
        name: "Clark Kent",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      },
    },
  ],
  messages: [
    {
      _id: 1,
      attachments: [
        {
          fileName: "document.pdf",
          url: "https://example.com/documents/document.pdf",
        },
      ],
      content: "Here's the document we talked about.",
      sender: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      chat: "General Chat",
      groupschats: "Developers Hub",
      createdAt: "2025-01-05T09:30:00Z",
    },
    {
      _id: 2,
      attachments: [],
      content: "Hey everyone! Here's a quick update on the project.",
      sender: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      chat: "Project Updates",
      groupschats: "Tech Enthusiasts",
      createdAt: "2025-01-04T11:15:00Z",
    },
    {
      _id: 3,
      attachments: [
        {
          fileName: "screenshot.png",
          url: "https://randomuser.me/api/portraits/men/12.jpg",
        },
      ],
      content: "Please review the screenshot attached.",
      sender: {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      chat: "Bug Reports",
      groupschats: "Movie Buffs",
      createdAt: "2025-01-03T08:45:00Z",
    },
    {
      _id: 4,
      attachments: [],
      content: "What do you all think about the new feature?",
      sender: {
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      chat: "Feature Discussions",
      groupschats: "Developers Hub",
      createdAt: "2025-01-02T13:20:00Z",
    },
    {
      _id: 5,
      attachments: [
        {
          fileName: "video.mp4",
          url: "https://example.com/videos/video.mp4",
        },
      ],
      content: "Check out this video for the latest update!",
      sender: {
        name: "Chris Wilson",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      chat: "General Chat",
      groupschats: "Movie Buffs",
      createdAt: "2025-01-01T15:00:00Z",
    },
  ],
};
