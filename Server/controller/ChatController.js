const { readFile } = require("../Util/readFile");
const { writeFile } = require("../Util/writeFile");
const { CHAT_FILE } = require("../../constants");

class ChatController {
  constructor() {
    this.file = CHAT_FILE;
  }

  getChats() {
    return new Promise(async (resolve, reject) => {
      try {
        const chatsJSON = await readFile(this.file);
        const chatData = JSON.parse(chatsJSON);
        resolve(chatData);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  getChatById(chatId) {
    return new Promise(async (resolve, reject) => {
      try {
        const chatJSON = await readFile(this.file);
        const chat = JSON.parse(chatJSON);
        if (!Object.keys(chat).includes(chatId)) {
          reject({});
        }
        let chatInformation = chat[chatId];
        const messages = chatInformation.messages;
        const startIndex = Math.max(0, messages.length - 10);
        chatInformation = {
          ...chatInformation,
          messages: messages.slice(startIndex)
        };
        resolve(chatInformation);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  getChatsAfter(chatId, lastMessage) {
    return new Promise(async (resolve, reject) => {
      try {
        const chatJSON = await readFile(this.file);
        const chat = JSON.parse(chatJSON);
        if (!Object.keys(chat).includes(chatId)) {
          reject({});
        }
        const messages = chat[chatId].messages;
        const fun = (val) => {
          return val === lastMessage;
        }
        const startIndex = messages.findIndex(fun);
        if (startIndex === -1 || startIndex === messages.length-1) {
          resolve([]);
          return;
        }
        console.log(lastMessage, startIndex);
        resolve(messages.slice(startIndex + 1));
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  getChatsByPage(chatId, lastMessage) {
    return new Promise(async (resolve, reject) => {
      try {
        const chatJSON = await readFile(this.file);
        const chat = JSON.parse(chatJSON);
        if (!Object.keys(chat).includes(chatId)) {
          reject({});
        }
        const messages = chat[chatId].messages;
        const fun = (val) => {
          return val === lastMessage;
        }
        const endIndex = messages.findIndex(fun);
        const startIndex = Math.max(0, endIndex - 10);
        if (endIndex === -1 || startIndex === endIndex || !lastMessage) {
          resolve([]);
          return;
        }
        resolve( messages.slice(startIndex, endIndex));
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  addNewMessageInChat(payload) { 
    return new Promise(async (resolve, reject) => {
      try {
        const { chatId, messageId } = payload;
        const chatsJSON = await readFile(this.file);
        const oldChatData = JSON.parse(chatsJSON);
        const oldChatID_Data = oldChatData[chatId];
        const newChatID_Data = {
          ...oldChatID_Data,
          messages: [...oldChatID_Data.messages, messageId]
        };
        const newChatData = {
          ...oldChatData,
          [chatId]: newChatID_Data,
        };
        const newChatDataJson = JSON.stringify(newChatData);
        await writeFile(this.file, newChatDataJson);
        resolve(newChatID_Data);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  addNewChatRoom(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const oldChatJson = await readFile(this.file);
        const oldChat = JSON.parse(oldChatJson);
        const newChat = {
          ...oldChat,
          [payload.id]: payload
        };
        const newChatJson = JSON.stringify(newChat);
        await writeFile(this.file, newChatJson);
        resolve(payload);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  addNewMember(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { chatId, userId } = payload;
        const oldChatData = await this.getChats();
        const oldChatID_Data = await this.getChatById(chatId);
        if (oldChatID_Data.userID.includes(userId)) {
          resolve(oldChatID_Data);
          return;
        }
        const newChatID_Data = {
          ...oldChatID_Data,
          userID: [...oldChatID_Data.userID, userId]
        };
        const newChatData = {
          ...oldChatData,
          [chatId]: newChatID_Data,
        };
        const newChatDataJson = JSON.stringify(newChatData);
        await writeFile(this.file, newChatDataJson);
        resolve(newChatID_Data);
      } catch (err) {
        reject({ ...err });
      }
    });
  }
}

module.exports = { ChatController };
