const { readFile } = require("../Util/readFile");
const { writeFile } = require("../Util/writeFile");
const {USER_FILE} = require("../../constants");

class UserController {
  constructor() {
    this.file = USER_FILE;
  }

  getUsers() {
    return new Promise(async (resolve, reject) => {
      try {
        const userDataJSON = await readFile(this.file);
        const userData = JSON.parse(userDataJSON);
        resolve(userData);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  getUserById(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const usersJSON = await readFile(this.file);
        const users = JSON.parse(usersJSON);
        if (!Object.keys(users).includes(userId)) {
          reject({});
        }
        resolve(users[userId]);
      } catch (err) {
        reject({ ...err });
      }
    });
  }

  addUserChat(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { chatId, userId } = payload;
        const oldUserData = await this.getUsers();
        const oldUserID_Data = await this.getUserById(userId);
        if (oldUserID_Data.channels.includes(chatId)) {
          resolve(oldUserID_Data);
          return;
        }
        const newUserID_Data = {
          ...oldUserID_Data,
          channels: [...oldUserID_Data.channels, chatId]
        };
        const newUserData = {
          ...oldUserData,
          [userId]: newUserID_Data,
        };
        const newUserDataJson = JSON.stringify(newUserData);
        await writeFile(this.file, newUserDataJson);
        resolve(newUserID_Data);
      } catch (err) {
        reject({ ...err });
      }
    });
  }
}

module.exports = { UserController };
