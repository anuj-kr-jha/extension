// ------------------------------------ utils -------------------------------
function isNumber(n) {
    return !Number.isNaN(Number.parseInt(n));
}

function getAmountAndUpdateTotalCallback(data) {
    let total = Number.parseInt(data.total || 0);
    const limit = Number.parseInt(data.limit || 0);
    const amount = (isNumber(this.amount) ? Number.parseInt(this.amount) : null) ?? Number.parseInt(document.querySelector('#amount').value || 0);
    total += amount;

    if (total > limit) return notifyUser('Limit reached!', `Uh oh! Looks like you've reached your limit!`);

    chrome.storage.sync.set({ total: total });
}

function getAmountAndUpdateTotal(amount) {
    chrome.storage.sync.get(['total', 'limit'], amount ? getAmountAndUpdateTotalCallback.bind({ amount }) : getAmountAndUpdateTotalCallback);
}

function notifyUser(title, msg, iconUrl, type) {
    chrome.notifications.create('notification_x', {
        type: type ?? 'basic',
        iconUrl: iconUrl ?? 'logo_128.png',
        title: title ?? 'Limit reached!',
        message: msg ?? `Uh oh! Looks like you've reached your limit!`,
    });
}

// -------------------------------------------------------------------------------

const contextMenuItem = {
    id: 'spendMoney',
    title: 'SpendMoney',
    contexts: ['selection'], // selection: only show on text selection
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId === 'spendMoney' && clickData.selectionText) {
        const amount = Number.parseInt(clickData.selectionText);
        if (Number.isNaN(amount)) return notifyUser('Error', `Please enter a valid integer!`);
        getAmountAndUpdateTotal(amount);
        return notifyUser('Success', `Amount added to spending!`);
    }
});
