import { notifyUser } from './util.mjs';

chrome.storage.sync.get(['limit'], function (result) {
    const limit = Number.parseInt(result.limit || 0);
    document.querySelector('#limit').value = limit;
});

function updateLimit() {
    const limit = Number.parseInt(document.querySelector('#limit').value || 0);
    chrome.storage.sync.set({ limit }, () => {
        close();
        // return notifyUser('Success <3', `Your updated successfully!`);
    });
}

function resetTotal() {
    chrome.storage.sync.set({ total: 0 }, () => {
        // close();
        return notifyUser('Success <3', `Your total reset success!`);
    });
}

document.querySelector('#saveLimit').addEventListener('click', updateLimit);
document.querySelector('#resetTotal').addEventListener('click', resetTotal);
