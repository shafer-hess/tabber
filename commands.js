// Returns all browser tabs and the currently active tab in the browser
async function getBrowserTabs() {
    // chrome.tabs api to query browser tabs
    let tabs = await chrome.tabs.query({})
    let [activeTab] = tabs.filter(tab => tab.active === true)

    return [tabs, activeTab]
}

function moveTabLeft(tabs, activeTab) {

}

function moveTabRight(tabs, activeTab) {

}

function moveTabToFront(tabs, activeTab) {

}

function moveTabToBack(tabs, activeTab) {

}

function popOutTab(tabs, activeTab) {

}

// ENTRY: Function is passed a command by background.js, parse the command and call the appropriate handler function
export default async function handleCommand(command) {
    // Retrieve Browser tabs to be passed to handler function
    let [tabs, activeTab] = await getBrowserTabs()
        
    // Parse received command
    switch(command) {
        case "move-tab-left":
            moveTabLeft(tabs, activeTab)
            break;
        case "move-tab-right":
            moveTabRight(tabs, activeTab)
            break;
        case "move-tab-to-front":
            moveTabToFront(tabs, activeTab)
            break;
        case "move-tab-to-back":
            moveTabToBack(tabs, activeTab)
            break;
        case "pop-out-tab":
            popOutTab(tabs, activeTab)
            break;
    }
}