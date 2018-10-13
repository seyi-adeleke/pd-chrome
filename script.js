window.addEventListener('load', function load(event) {
    // chrome.storage.sync.clear();
    chrome.storage.sync.get(['url'], (result) => {
        if (result.hasOwnProperty('url')) {
            const urlContainer = getUrlContainer();
            if(result.url.length) {
                result.url.forEach(url => {
                    urlContainer.appendChild(createInputField(url));
                })
            }
         
        }
    });

    document.getElementById('addInput').onclick = () => {
        const urlContainer = getUrlContainer();
        urlContainer.appendChild(createInputField());
    };

    document.getElementById('removeInput').onclick = () => {
        const urlContainer = getUrlContainer();
        removeFromStorage(urlContainer.lastChild.value)
        urlContainer.removeChild(urlContainer.lastChild);
    };

    document.getElementById('save').onclick = () => {
       const urlContainer = document.getElementById('urlContainer');
       let inputs = urlContainer.getElementsByTagName('input');
       const urlValues = [];
       [].forEach.call(inputs, (input) => {
            urlValues.push(input.value);
       });
       saveToStorage(urlValues);
    }

    getUrlContainer = () => {
        return document.getElementById('urlContainer');
    }

    createInputField = (value = '') => {
        const newInput = document.createElement('input');
        newInput.value = value;
        return newInput;
    }

    saveToStorage = (value) => {
        chrome.storage.sync.set({url: value}, function() {
            console.log('Value is set to ' + value);
        });
    }

    removeFromStorage = (value) => {
        chrome.storage.sync.get(['url'], (result) => {
            if (result.url.length) {
              const urls = result.url.filter((ele) => ele !== value);
              chrome.storage.sync.set({url: urls});
            }
        });
    }

});
