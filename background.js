chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: main
    });
});

const main = () => {
    const currentUrl = new URL(location.href);

    const elm = document.head.querySelector("meta[property='og:title']");
    if (!elm) {
        return;
    }

    // memo: 「PR title by author · Pull Request #xxx · repository」 の authorまで欲しい
    const matches = /(.+) · Pull Request.*/.exec(elm.content);
    if (!matches[1]) {
        return;
    }

    const link = `[${matches[1]}](${currentUrl})`;

    // memo: clipboard apiがなんか怒られるので由緒正しい？方法を使う
    const textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = link;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
};
