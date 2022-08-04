// Returns all browser tabs and the currently active tab in the browser
async function getBrowserTabs() {
    // chrome.tabs api to query browser tabs
    let tabs = await chrome.tabs.query({lastFocusedWindow: true})
    let [activeTab] = tabs.filter(tab => tab.active === true)

    return [tabs, activeTab]
}

async function moveTabLeft(tabs, activeTab) {
    // Get the tab index of the current active tab
    let tabIndex = activeTab.index

    // Do nothing if tab is at the front of the list
    if(tabIndex === 0)
        return

    // Use chrome.tabs api to move the active tab to the left one tab
    let newIndex = tabIndex - 1
    await chrome.tabs.move(activeTab.id, {index: newIndex})
}

async function moveTabRight(tabs, activeTab) {
    // Get the tab index of the current active tab
    let tabIndex = activeTab.index

    // Do nothing if the tab is at the end of the list
    if(tabIndex - 1 === tabs.length)
        return

    // Use chrome.tabs api to move the active tab to the right one tab
    let newIndex = tabIndex + 1
    await chrome.tabs.move(activeTab.id, {index: newIndex})
}

async function moveTabToFront(tabs, activeTab) {
    // Use the chrome.tabs api to move the active tab to the front of the tab list
    await chrome.tabs.move(activeTab.id, {index: 0})
}

async function moveTabToBack(tabs, activeTab) {
    // Use the chrome.tabs api to move the active tab to the back of the tab list
    await chrome.tabs.move(activeTab.id, {index: tabs.length - 1})
}

async function popOutTab(tabs, activeTab) {
    // Retrieve the url of the currently active tab
    let currentTabUrl = activeTab.url

    // Create a new window with the chrome.windows api and use the retrieved url as the tab data
    await chrome.windows.create({url: currentTabUrl, focused: true})

    // Remove the current active tab from the current tab list
    await chrome.tabs.remove(activeTab.id)
}

async function reattachTab(tabs, activeTab) {
    // Retrieve the url of the currently active tab
    let currentTabUrl = activeTab.url
    
    // Add a new tab to the prime browser window
    await chrome.tabs.create({active: true, url: currentTabUrl, windowId: 1})

    // Remove the current active tab from the current tab list
    await chrome.tabs.remove(activeTab.id)
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
        case "reattach-tab":
            reattachTab(tabs, activeTab)
    }
}