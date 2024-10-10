((async (startPage = 0, autoClearConsole = true) => {
    const name = "Monnapse's Auto Gambler";
    const version = "0.1.0";

    /////// CLASSES ///////

    /////// FUNCTIONS ///////
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    function locationChanged()
    {
        if (window.location.href == "https://bloxflip.com/towers")
        {
            // Towers
            console.log("Initialized Tower Game");
        } else {
            console.log("This game is not currently supported");
        }
    }


    window.navigation.addEventListener("navigate", (event) => {
        console.log('location changed!');
    })
})())


