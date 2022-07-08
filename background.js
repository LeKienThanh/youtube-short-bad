var isShort = function(arg_link){
    return arg_link.indexOf("https://www.youtube.com/shorts") === 0;
}

var getVideoId = function(arg_link){
    return arg_link.substring(31);
}

var toNormalYtb = function(VideoId){
    return "https://www.youtube.com/watch?v=" + VideoId;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.storage.sync.get(["AlwaysOn"], function(item){
        let allowed = item.AlwaysOn;

        if (allowed === true){
            chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
                var link = tabs[0].url;
                if (isShort(link)) {
                    let newLink = toNormalYtb(getVideoId(link));
                    chrome.tabs.update(undefined, { url: newLink });
                }
            });
        }
    });
});

chrome.contextMenus.create({
    title: 'Convert From Short To Classic Video Player',
    onclick: function(){
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            var link = tabs[0].url;
            if (isShort(link)) {
                let newLink = toNormalYtb(getVideoId(link));
                chrome.tabs.update(undefined, { url: newLink });
            }
            else{
                alert("This only works on Youtube Short.");
            }
        });
    }

});