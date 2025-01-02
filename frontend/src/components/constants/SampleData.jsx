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

export const sampleUsers = () => {
  return [
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
};
