import handleCommand from "./commands.js"

chrome.commands.onCommand.addListener((command) => {
    handleCommand(command)
});