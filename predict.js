const HOST_URL = 'http://127.0.0.1:5000/predict'

var queryInfo = {
    active: true,
    currentWindow: true,
}

chrome.tabs.query(queryInfo, function(tabs) {
    fetch(HOST_URL, {
        method: 'POST',
        body: JSON.stringify({urls: [tab.url]}),
        dataType: 'json'
    })
    .then(response => response.json())
    .then(result => {
        const is_real = result['reliability'][0] == 1
        const flag = result['flag'][0]

        const code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    })
})