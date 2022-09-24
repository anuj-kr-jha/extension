import { notifyUser } from './util.mjs';

chrome.storage.sync.get(['total', 'limit'], function (result) {
    const total = Number.parseInt(result.total || 0);
    const limit = Number.parseInt(result.limit || 0);
    document.querySelector('#total').innerText = total;
    document.querySelector('#limit').innerText = limit;
});

function functionGetTotalFromChromeStorage() {
    chrome.storage.sync.get(['total', 'limit'], function (data) {
        let total = Number.parseInt(data.total || 0);
        const limit = Number.parseInt(data.limit || 0);
        const amount = Number.parseInt(document.querySelector('#amount').value || 0);
        total += amount;

        if (total > limit) return notifyUser('Limit reached!', `Uh oh! Looks like you've reached your limit!`);

        chrome.storage.sync.set({ total: total });
        document.querySelector('#total').innerText = total;
        document.querySelector('#amount').value = '';
    });
}

document.querySelector('#spendAmount').addEventListener('click', functionGetTotalFromChromeStorage);