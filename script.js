chrome.storage.sync.get(['total'], function (result) {
    let total = Number.parseInt(result.total || 0);
    document.querySelector('#total').innerText = total;
});

function functionGetTotalFromChromeStorage() {
    chrome.storage.sync.get(['total'], function (result) {
        let total = Number.parseInt(result.total || 0);
        const amount = Number.parseInt(document.querySelector('#amount').value || 0);
        total += amount;
        chrome.storage.sync.set({ total: total });
        document.querySelector('#total').innerText = total;
        document.querySelector('#amount').value = '';
    });
}

document.querySelector('#spendAmount').addEventListener('click', functionGetTotalFromChromeStorage);
