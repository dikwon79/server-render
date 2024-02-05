// lang/en/en.js

const getResponseMessage = (name, currentDateTime) => {
    return `<p style="color: blue;">Hello ${name}, What a beautiful day. Server current date and time is ${currentDateTime}</p>`;
};
const message = "save completed!"
const messages = {
    error: {
      file: 'Cannot find File',
      write: 'Error writing to file:',
      append: 'Error appending text to file:',
      404: '404 Not Found',
    },
    success: {
      appendsuccess: "Text appended to file successfully:",
      savesuccess: "save completed!",
      jasonsuccess: "Formatted response message written to file successfully.",
      server: "Server is running on port",
    }
    

};
module.exports = { 
    getResponseMessage,
    message,
    messages
};
