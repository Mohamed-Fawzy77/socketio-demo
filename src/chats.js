const chats = [
  {
    id: 1,
    userIds: [1, 2],
  },
  {
    id: 2,
    userIds: [1, 3],
  },
  {
    id: 3,
    userIds: [1, 2, 3],
  },
];

const messages = [];
let lastId = 1;
/*
    {
        id: 1,
        userId: 1,
        chatId: 1,
        message: 'hello',
    }
*/

export function addMessageToChat(message, chatId, userId) {
  const newMessage = {
    id: ++lastId,
    userId,
    chatId,
    message,
  };
  messages.push(newMessage);
  return newMessage;
}

export function validateUserAccessToChat({ userId, chatId }) {
  const chat = chats.find((chat) => chat.id === chatId);

  console.log({ userId, chat, chatId });

  if (chat && chat.userIds.includes(userId)) {
    return true;
  }

  throw new Error("user has no access to chat");
}
export function getUserChats(userId) {
  const userChats = chats.filter((chat) => {
    return chat.userIds.includes(userId);
  });

  return userChats;
}
