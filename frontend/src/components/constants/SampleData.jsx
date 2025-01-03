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
