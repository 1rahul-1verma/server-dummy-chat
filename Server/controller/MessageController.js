const { readFile } = require("../Util/readFile");
const { writeFile } = require("../Util/writeFile");
const { MESSAGE_FILE } = require("../../constants");

class MessageController {
  constructor() {
    this.file = MESSAGE_FILE;
  }

  getMessage(messageId) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataJSON = await readFile(this.file);
        const data = JSON.parse(dataJSON);
        if (!Object.keys(data).includes(messageId)) {
          reject({
            message: "Message not found",
          });
        }
        resolve(data[messageId]);
      } catch (err) {
        reject({ ...err });
      }
    });
  }
  postMessage(messageJSON) {
    return new Promise(async (resolve, reject) => {
      try {
        const oldMessageJson = await readFile(this.file);
        const oldMessages = JSON.parse(oldMessageJson);
        const newMessages = {
          ...oldMessages,
          [messageJSON.id]: messageJSON,
        };
        const newMessagesJSON = JSON.stringify(newMessages);
        await writeFile(this.file, newMessagesJSON);
        resolve(messageJSON);
      } catch (err) {
        reject({ ...err });
      }
    });
  }
}

module.exports = { MessageController };
