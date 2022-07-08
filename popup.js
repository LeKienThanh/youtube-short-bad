var poopoo = document.getElementById("poopoo");
var peepee = document.getElementById("checkbox1");

var isShort = function(arg_link){
    return arg_link.indexOf("https://www.youtube.com/shorts") === 0;
}

var getVideoId = function(arg_link){
    return arg_link.substring(31);
}

var toNormalYtb = function(VideoId){
    return "https://www.youtube.com/watch?v=" + VideoId;
}


poopoo.onclick = function(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let link = tabs[0].url;
        
        if (isShort(link)) {
            let newLink = toNormalYtb(getVideoId(link));
            chrome.tabs.update(undefined, { url: newLink });
        }
        else{
            alert("This only works on Youtube Short.")
        }
        window.close();
    });

}

peepee.onclick = function(){
    let hmm = peepee.checked;
    chrome.storage.sync.set({"AlwaysOn": hmm});

    if (hmm === true){
        chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
            var link = tabs[0].url;
            if (isShort(link)) {
                let newLink = toNormalYtb(getVideoId(link));
                chrome.tabs.update(undefined, { url: newLink });
            }
        });
    }
}

window.onload = function(){
    chrome.storage.sync.get(["AlwaysOn"], function(item) {
        let poop = item.AlwaysOn;
        if (poop === undefined){
            chrome.storage.sync.set({"AlwaysOn": false}, function() {});
            poop = false;
        }
        document.getElementById("checkbox1").checked = poop;
    });
}