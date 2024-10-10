((async (startPage = 0, autoClearConsole = true) => {
    const name = "Monnapse's Auto Gambler";
    const version = "0.1.0";
    var currentPage = null;

    /////// ENUMS ///////
    const Page = Object.freeze({
        None: 0,
        Towers: 1
    });

    /////// CLASSES ///////

    /////// FUNCTIONS ///////
    // HTML RELATED
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    function addBetTab(tabName)
    {
        //const gameBetTabs = document.getElementsByClassName("gameBetTabs")[0];
        const beforeTabDiv = getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[1]/div");
        beforeTabDiv.insertAdjacentHTML("beforebegin", `<button class="button_button__dZRSb button_tab__RC45L">${tabName}</button>`);
    }
    // GAMES RELATED
    function initializeTowersGame()
    {
        console.log("TOWERS GAME");
        addBetTab("Auto");
    }

    // OTHERS
    function locationChanged()
    {
        if (window.location.href == "https://bloxflip.com/towers")
        {
            // Towers Game
            currentPage = Page.Towers;
            initializeTowersGame();
            //console.log("Initialized Tower Game");
        } else {
            // Game unsupported tab
            currentPage = Page.None;
            //console.log("This page is not currently supported");
        }
    }

    /////// EVENT LISTENERS ///////
    window.navigation.addEventListener("navigate", (event) => {
        locationChanged();
    })

    /////// START ///////
    locationChanged();
})())