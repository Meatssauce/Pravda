const HOST_URL = 'http://127.0.0.1:5000/predict'

// chrome.runtime.onMessage.addListener(function(message, callback){
//     switch (message) {
//         case 'run':
//             // document.getElementById('loadingSign').style.display = 'block'
//             document.getElementById('loadingSign').style.visibility = 'visible'
//             break
//         case 'stop':
//             // document.getElementById('loadingSign').style.display = 'none'
//             document.getElementById('loadingSign').style.visibility = 'hidden'
//             break
//         case 'reliable':
//             break
//         case 'unreliable':
//             break
//         case 'unsupported_language':
//             break
//         case 'too_short':
//             break
//         case 'illegal_output':
//             break
//     }
// })

// chrome.runtime.sendMessage('run')
// const allElementIds = ['loadingSign', 'loadingText', 'tick', 'reliableText', 'cross', 
// 'unreliableText', 'attention', 'unsupportedLanguageText', 'paywallText', 'errorText']

// function hideAll() {
//     allElementIds.forEach(id => {
//         document.getElementById(id).style.visibility = 'hidden'
//     });
// }

// function showLoading() {
//     // hide other elements
//     document.getElementById('loadingSign').style.visibility = 'visible'
//     document.getElementById('loadingText').style.visibility = 'visible'
// }

// function showReliable() {
//     document.getElementById('tick').style.visibility = 'visible'
//     document.getElementById('reliableText').style.visibility = 'visible'
// }

// function showUnreliable() {
//     document.getElementById('cross').style.visibility = 'visible'
//     document.getElementById('unreliableText').style.visibility = 'visible'
// }

// function showUnsupportedLanguageWarning() {
//     document.getElementById('attention').style.visibility = 'visible'
//     document.getElementById('unsupportedLanguageText').style.visibility = 'visible'
// }

// function showPaywallWarning() {
//     document.getElementById('attention').style.visibility = 'visible'
//     document.getElementById('paywallText').style.visibility = 'visible'
// }

// function showErrorWarning() {
//     document.getElementById('attention').style.visibility = 'visible'
//     document.getElementById('errorText').style.visibility = 'visible'
// }

// Set background colour
// let color = 'red'
// const script = 'document.body.style.backgroundColor="' + color + '";';
// chrome.tabs.executeScript({code: script})

// Get prediction
document.getElementById('loadingSign').style.display = 'block'
document.getElementById('result').style.display = 'none'

const queryInfo = {
    active: true,
    currentWindow: true,
}

chrome.tabs.query(queryInfo, function(tabs) {
    tab = tabs[0]

    fetch(HOST_URL, {
        method: 'POST',
        body: JSON.stringify({urls: [tab.url]}),
        dataType: 'json'
    })
    .then(response => response.json())
    .then(predictions => {
        document.getElementById('loadingSign').style.display = 'none'
        document.getElementById('result').style.display = 'block'

        const flag = predictions['flag'][0]
        switch (flag) {
            case 0:
                if (predictions['reliability'][0] == 1) {
                    document.getElementById('result').src = 'assets/warnings3/reliable.png'
                } else {
                    document.getElementById('result').src = 'assets/warnings3/unreliable.png'
                }
                break
            case 1:
                document.getElementById('result').src = 'assets/warnings3/wrong_language.png'
                break
            case 2:
                document.getElementById('result').src = 'assets/warnings3/paywall.png'
                break
            default:
                document.getElementById('result').src = 'assets/warnings3/wrong_language.png'
        }

        // const code = 'window.location.reload();'
        // chrome.tabs.executeScript(tab.id, {code: code})
    })
})

// function showVerifying() {
//     document.getElementById('verifying').style.display = 'block'
// }

// function hideVerifying() {
//     document.getElementById('verifying').style.display = 'none'
// }

// document.querySelector('content').addEventListener('click', () => {chrome.runtime.sendMessage('start'); showVerifying()})
// document.querySelector('content').addEventListener('finished-verify', () => {chrome.runtime.sendMessage('end'); })

// function hello() {
//     chrome.tabs.executeScript({
//       file: 'predict.js'
//     }); 
// }
  
// // document.querySelector('#verify').addEventListener('click', predict)
// document.getElementById('verify').addEventListener('click', hello);

// chrome.browserAction.onClicked.addListener(function(tab) {
// 	// No tabs or host permissions needed!
// 	// chrome.scripting.executeScript({
// 	//   code: 'document.body.style.backgroundColor="red"'
// 	// })

// 	// const payload = {urls: [tab.url]}
// 	// var data = new FormData()
// 	// data.append('json', JSON.stringify(payload))
	
// 	// (async () => {
// 	// 	const response = await fetch(HOST_URL, {
// 	// 		method: 'POST',
// 	// 		body: JSON.stringify({urls: [tab.url]}),
// 	// 		dataType: 'json'
// 	// 	})
// 	// 	const result = await response.json()
	  
// 	// 	const is_real = result['reliability'][0] == 1
// 	// 	const flag = result['flag'][0]

// 	// 	chrome.tabs.getSelected(null, function(tab) {
// 	// 		const code = 'window.location.reload();';
// 	// 		chrome.tabs.executeScript(tab.id, {code: code});
// 	// 	})
// 	// })()
	
// 	fetch(HOST_URL, {
// 		method: 'POST',
// 		body: JSON.stringify({urls: [tab.url]}),
// 		dataType: 'json'
// 	})
// 	.then(response => response.json())
// 	.then(result => {
// 		const is_real = result['reliability'][0] == 1
// 		const flag = result['flag'][0]

// 		chrome.tabs.getSelected(null, function(tab) {
// 			const code = 'window.location.reload();';
// 			chrome.tabs.executeScript(tab.id, {code: code});
// 		})
// 	})
// })