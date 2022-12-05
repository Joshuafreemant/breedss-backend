import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    fullName: "Aderonke David",
    username: "AderonkeDavid",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    location: "San Fran, CA",
    role:'member',
    status:1,
    bio:'Some Random Texts',
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    fullName: "Steve Ralph",
    username: "SteveRalph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    friends: [],
    location: "New York, CA",
    role:'member',
    status:1,
    bio:'I love Dogs',
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    fullName: "Some Guy",
    username: "SomeGuy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    friends: [],
    location: "Canada, CA",
    role:'member',
    status:1,
    bio:'I love Cats',
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  }
  
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    fullName: "Steve Ralph",
    username: "SteveRalph",
    location: "New York, CA",
    description: "Some really long random description",
    category: "dogs",
    picturePath: "post1.jpeg",
    userPicturePath: "p3.jpeg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
     
    ]),
    comments: [
      "random comment",
      "another random comment",
      "yet another random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    fullName: "Some Guy",
    username: "SomeGuy",
    location: "Korea, CA",
    description:
      "Another really long random description. This one is longer than the previous one.",
    category: "cats",

    picturePath: "post2.jpeg",
    userPicturePath: "p4.jpeg",
    likes: new Map([
     
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "one more random comment",
      "and another random comment",
      "no more random comments",
      "I lied, one more random comment",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    fullName: "Aderonke David",
    username: "AderonkeDavid",
    location: "Utah, CA",
    description:
      "This is the last really long random description. This one is longer than the previous one.",
    category: "bunnies",

    picturePath: "post3.jpeg",
    userPicturePath: "p11.jpeg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
      [userIds[0], true],
     
    ]),
    comments: [
      "one more random comment",
      "I lied, one more random comment",
      "I lied again, one more random comment",
      "Why am I doing this?",
      "I'm bored",
    ],
  },
  
];