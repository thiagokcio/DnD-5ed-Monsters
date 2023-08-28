const getMessage = (message, value) => {
    let newMessage = message.replace("<valor>", value);

    return newMessage;
};

module.exports = getMessage;
