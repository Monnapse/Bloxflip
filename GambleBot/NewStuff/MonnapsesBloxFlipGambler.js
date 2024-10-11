/*

    Made by Monnapse
    Current Version 0.1.0

    //////  Updates ///////

    Version 0.1.0 | 10/9/2024
        - In Development
*/

((async (startPage = 0, autoClearConsole = true) => {
    ////// CONSTANTS ///////
    const name = "Monnapse's Auto Gambler";
    const version = "0.1.0";

    ////// VARIABLES ///////
    var currentPage = null;

    // CLASSES
    var TOWERSGAME = null;

    /////// ENUMS ///////
    const Page = Object.freeze({
        None: 0,
        Towers: 1
    });
    const TowerMethods = Object.freeze({
        Default: "Default",
        Adams: "Adam's Method"
    });
    const TowerTab = Object.freeze({
        Manual: 0,
        Auto: 1
    });
    const Difficulty = Object.freeze({
        Easy: 0,
        Normal: 1,
        Hard: 2
    });

    /////// CLASSES ///////
    class Debug {
        constructor(name, defaultValue)
        {
            this.name = name;
            this.value = defaultValue;
            this.variableName = this.name.replace(/ /g, "_");
            this.debugger = null;

            this.createDebugger();
        }

        updateValue(value)
        {
            this.value = value;
            this.debugger.textContent = this.value;
        }

        createDebugger()
        {
            // <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">Current Game: 0</p>
            getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button").insertAdjacentHTML('afterbegin',`
                <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel mbfg_value_${this.variableName}">${this.name}: ${this.value}</p>
                `
            );

            this.debugger = document.getElementsByClassName(`mbfg_value_${this.variableName}`)[0];
        }
    }

    class ToggleButton {
        constructor(name1, name2, clicked)
        {
            this.name1 = name1;
            this.name2 = name2;
            this.clicked = clicked;
            this.button = null;
            this.toggled = false;
            this.canChangeState = true;
            this.createToggleButton();
        }

        toggleButton(callFunction)
        {
            if (this.toggled)
            {
                this.button.classList.remove("button_primary__LXFHi");
                this.button.classList.add("button_secondary__Fa_lP");
                this.button.textContent = this.name2;
            } else {
                this.button.classList.remove("button_secondary__Fa_lP");
                this.button.classList.add("button_primary__LXFHi");
                this.button.textContent = this.name1;
            }

            if (callFunction == true && this.clicked != null)
            {
                this.clicked(this.toggled);
            }
        }

        switchTo(toggled)
        {
            this.toggled = toggled;
            this.toggleButton(false);
        }

        createToggleButton()
        {
            // <button class="button_button__dZRSb button_primary__LXFHi gameBetSubmit mobileBottomMargin">Start new game</button>
    
            getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button").insertAdjacentHTML('beforebegin',`
                <button class="button_button__dZRSb button_primary__LXFHi gameBetSubmit toggleButton mobileBottomMargin">${this.name1}</button>
                `
            );
    
            this.button = document.getElementsByClassName("toggleButton")[0];
            this.button.addEventListener("click", ()=>{
                if (this.canChangeState)
                {
                    this.toggled = !this.toggled;
                    this.toggleButton(true);
                }
            })
        }
    }
    class TowersGame {
        constructor()
        {
            this.currentTab = TowerTab.Manual;
            this.tabElements = [];
            this.methodElements = [];
            this.method = TowerMethods.Default;

            this.gameInPlay = false;
            //this.canChangeGameState = true;

            
            this.gamesLostInRow = 0;
            this.rows = 8;
            this.buttons = 3;

            this.currentDifficultyLevel = 1;

            // Other Classes
            this.autoPlayButton = null;
            this.gamesDebug = null;

            // GAME
            this.currentGame = 1;
            this.gamesToPlay = 1;
            this.rowsToTarget = 1;
            this.checkForGameWinOrLose = false;
            this.currentRow = this.rows;
        }

        setVariables()
        {
            this.currentTab = TowerTab.Manual;
            this.tabElements = [];
            this.methodElements = [];
            this.method = TowerMethods.Default;
            this.gamesToPlay = 1;
            this.rowsToTarget = 1;
            this.gameInPlay = false;
            //this.canChangeGameState = true;
            this.currentGame = 1;
            this.gamesLostInRow = 0;
            this.rows = 8;
            this.buttons = 3;
            this.currentDifficultyLevel = 1;
            this.autoPlayButton = null;
        }

        addDefaultMethodSettings()
        {
            // Number Of Games
            const NOGElement = addNumberSettings("Number Of Games", this.gamesToPlay, (games)=>{ this.gamesToPlay=games; });
            this.methodElements.push(NOGElement);
            
            // Number Of Rows
            const NORElement = addNumberSettings("Number Of Rows", this.rowsToTarget, (rows)=>{ this.rowsToTarget=rows; });
            this.methodElements.push(NORElement);
        }
        
        addAdamsMethodSettings()
        {
            // Number Of Games
            const NOGElement = addNumberSettings("Number Of Games", this.gamesToPlay, (games)=>{ this.gamesToPlay=games; });
            this.methodElements.push(NOGElement);
        }
        clearMethodSettings()
        {
            //console.log("Clearing Methods");
            // Reset Values
            this.gamesToPlay = 1;
            this.rowsToTarget = 1;

            // Clear Method Settings
            if (this.methodElements.length > 0)
            {
                for(let i=0;i<=this.methodElements.length;i++)
                {
                    const element = this.methodElements[0];
                    this.methodElements.splice(0, 1);
                    element.remove();
                }
            }
        }

        methodChanged(method)
        {
            this.method = TowerMethods[method];

            this.clearMethodSettings();
            if (this.method == TowerMethods.Default)
            {
                this.addDefaultMethodSettings();
            }
            else if (this.method == TowerMethods.Adams)
            {
                this.addAdamsMethodSettings();
            }
        }

        clickHalfButton() { getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[2]/div/div/button[1]').click(); }
        clickDoubleButton() { getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[2]/div/div/button[2]').click(); }
        clickSubmitButton() { getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button[2]').click(); }
        clickTowerButton(row, button) { getElementByXpath(`/html/body/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div/div[${row}]/div[${button}]/button`).click() }
        getDifficultyLevel() {
            const difficulties = getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[3]/div");

            difficulties.querySelectorAll("button").forEach(btn => {
                //console.log(btn.classList.contains("button_isActive__tpT2u"));
                //console.log(Difficulty[btn.textContent]);
                if (btn.classList.contains("button_isActive__tpT2u") == true)
                {
                    //console.log(Difficulty[btn.textContent]);
                    this.currentDifficultyLevel = Difficulty[btn.textContent];
                    return Difficulty[btn.textContent];
                }
            })

            return Difficulty.Normal;
        }

        /*
        console.log("Ended on Adam's Method");
                
        if (didWin)
        {
            // Reset
            // Click Half button
            function clickHalfButton(i)
            {
                if (i <= 0)
                {
                    // Reseting Lost Counter
                    gamesLost = 0;
                    towersGame.startGame();
                } else
                {
                    getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[2]/div/div/button[1]').click();
                    setTimeout(()=>{
                        clickHalfButton(i-1)
                    }, 800);
                }
            }
            if (gamesLost <= 0)
            {
                towersGame.startGame();
            } else {
                clickHalfButton(gamesLost);
            }
        } else {
            // Double
            // Click Double button
            gamesLost++;
            getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[2]/div/div/button[2]').click();

            setTimeout(()=>{
                towersGame.startGame();
            }, 800);
        }
        */
        clickHalfButtonUntil(i, callBackFunction)
        {
            if (i > 0)
            {
                this.clickHalfButton();
                setTimeout(()=>{
                    this.clickHalfButtonUntil(i-1, callBackFunction);
                }, 500)
            }
            else if (callBackFunction != null)
            {
                callBackFunction();
            }
        }

        gameEndedOnAdamsMethod(didWin)
        {
            //console.log("Ended on Adam's Method");

            if (didWin == true)
            {
                //console.log(`Games lost in a row: ${this.gamesLostInRow}`);
                if (this.gamesLostInRow <= 0)
                {
                    this.startGame();
                } else {
                    
                    this.clickHalfButtonUntil(this.gamesLostInRow, ()=>{
                        // Reseting Lost Counter
                        this.startGame();
                    });
                }
            }
            else 
            {
                // Double
                // Click Double button
                this.clickDoubleButton();

                setTimeout(()=>{
                    this.startGame();
                }, 500);
            }
        }

        gameEndedOnDefaultMethod(didWin)
        {
            //console.log(`WON: ${didWin} On Default`);
            this.startGame();
        }

        /*
        gameEnded(didWin)
        {
            
            if (this.gameInPlay == false || this.currentGame > this.gamesToPlay)
            {
                this.sessionEnded();
                console.log(`Game Ended on: ${this.gameInPlay}`)
            }
            else if (this.gameInPlay == true && this.gamesAmount == -1 || this.gameInPlay == true && this.currentGame <= this.gamesToPlay)
            {
                console.log(`starting new game on method: ${this.method}`)
                setTimeout(()=>{
                    if (this.method == TowerMethods.Default)
                    {
                        this.gameEndedOnDefaultMethod(didWin);
                    } else (this.method == TowerMethods.Adams)
                    {
                        this.gameEndedOnAdamsMethod(didWin);
                    }
                }, 1000)
            }
        }
        */

        /*
        sessionEnded()
        {
            this.gameInPlay = false;
            this.autoPlayButton.switchTo(this.gameInPlay);
        }
        */
        sessionEnded()
        {
            //this.gameInPlay = false;
            //this.autoPlayButton.switchTo(this.gameInPlay);
            //console.log("AUTOPLAY Session Ended");
            this.autoPlayButton.switchTo(false);
            this.gamesLostInRow = 0;
        }

        gameEnded(didWin)
        {
            //console.log(`Did win: ${didWin}`);
            //if (this.isGameLost() == false)
            //{
            //    // Game still in play so just end
            //    this.clickSubmitButton();
            //}

            if (!didWin)
            {
                this.gamesLostInRow++;
            } 

            if (this.currentGame > this.gamesToPlay)
            {
                this.sessionEnded();
            }
            else if (this.gameInPlay == true && this.currentGame <= this.gamesToPlay)
            {
                setTimeout(()=>{
                    if (this.method == TowerMethods.Default)
                    {
                        this.gameEndedOnDefaultMethod(didWin);
                    } else (this.method == TowerMethods.Adams)
                    {
                        //this.gameEndedOnAdamsMethod(didWin);
                    }
                    if (didWin)
                    {
                        this.gamesLostInRow = 0;
                    } 
                }, 500)
            }
            else 
            {
                this.sessionEnded();
            }
        }
        /*
        // Click on rows & detect if game ends
        clickButton(i)
        {
            var buttonIndex = getRandomInt(1, this.buttons+1);
        
            this.clickTowerButton(i, buttonIndex);
            setTimeout(()=>{
                if (this.isGameLost()) 
                { 
                    console.log("Game Lost");
                    this.gameEnded(false);
                } else if (this.rows-i >= this.rowsToTarget-1)
                {
                    console.log("Game Won");
                    setTimeout(()=>{
                        this.clickSubmitButton();
                        this.gameEnded(true);
                    }, 1000)
                } else {
                    console.log("Next Row");
                    setTimeout(()=>{this.clickButton(i-1)}, 750);
                }
            }, 500)
        }
        */

        clickButton(i)
        {
            this.currentRow = i;
            const currentRow = this.rows-i;
            if (currentRow < this.rowsToTarget)
            {
                //console.log("click on row");

                var buttonIndex = getRandomInt(1, this.buttons+1); // Get Random Button Index
                this.clickTowerButton(i, buttonIndex); // Click on button

                this.checkForGameWinOrLose = true;
            } else 
            {
                console.log("Game Won");
                this.clickSubmitButton();
                this.gameEnded(true);
            }
        }

        // Starts of by clicking start game and contue it off clickButton Function
        startGame()
        {
            console.log("Starting New Game");
            this.currentGame++;
            this.gamesDebug.updateValue(this.currentGame);
            this.clickSubmitButton();
            setTimeout(()=>{
                //console.log(`Starting game on row: ${this.rows}, rows targeting: ${this.rowsToTarget}`);
                this.clickButton(this.rows);
            }, 1000)
        }

        startAutoPlay()
        {
            this.gameInPlay = true;
            //this.canChangeGameState = false;

            this.getDifficultyLevel();
            if (this.currentDifficultyLevel == Difficulty.Normal)
            {
                this.buttons = 2;
            } else {
                this.buttons = 3;
            }

            this.currentGame = 1;
            this.checkForGameWinOrLose = false;
            this.currentRow = this.rows;
            this.gamesDebug.updateValue(this.currentGame);

            this.startGame();
        }
        cancelAutoPlay()
        {
            this.gameInPlay = false;

            this.autoPlayButton.canChangeState = false;
            setTimeout(()=>{
                //this.canChangeGameState = true;
                this.autoPlayButton.canChangeState = true;
            }, 2000)
        }
        openAutoTab()
        {
            const methods = addEnumSettings("Methods", TowerMethods, TowerMethods.Default, (method)=>{ this.methodChanged(method); });
            this.tabElements.push(methods);

            this.methodChanged(this.method);

            this.gamesDebug = new Debug("Current Games", 0);

            this.autoPlayButton = new ToggleButton("Start Autoplay", "Cancel Autoplay", (toggled)=>{
                this.gameInPlay=toggled;
                if (this.gameInPlay)
                {
                    this.startAutoPlay();
                } else {
                    this.cancelAutoPlay();
                }
            });
            this.tabElements.push(this.autoPlayButton.button);

            const gameToggleButton = document.getElementsByClassName("gameBetSubmit")[1];
            gameToggleButton.addEventListener("click", ()=>{
                if (gameToggleButton.textContent == "Cashout")
                {
                    // Ending
                    //console.log(gameToggleButton.textContent);
                    //this.autoPlayButton.switchTo(false);
                } else {
                    // Starting
                }
            })

            //const autoPlayButton = addToggleButton("Start Autoplay", "Cancel Autoplay", (toggled)=>{ this.gameInPlay=toggled; console.log(this.gameInPlay); });
            //this.tabElements.push(autoPlayButton);

            
        }
        clearTab()
        {
            //console.log("Clearing Tab");
            this.clearMethodSettings();
            // Clear all elements in tabElements Array
            for(let i=0;i<=this.tabElements.length;i++)
            {
                const element = this.tabElements[0];
                this.tabElements.splice(0, 1);
                element.remove();
            }
        }

        openTab(tabName)
        {
            //console.log(tabName);
            if (tabName != null && TowerTab[tabName] == TowerTab.Auto && this.currentTab != TowerTab.Auto)
            {
                this.currentTab = TowerTab.Auto;
                this.openAutoTab();
            } else if (tabName != null && TowerTab[tabName] == TowerTab.Manual && this.currentTab != TowerTab.Manual)
            {
                this.currentTab = TowerTab.Manual;
                this.clearTab();
            }
        }
        
        isGameLost() 
        { 
            var button = document.getElementsByClassName("gameBetSubmit")[0];
            if (this.currentTab == TowerTab.Auto)
            {
                button = document.getElementsByClassName("gameBetSubmit")[1];
            }
            if (button.textContent == "Cashout"){ return false; } 
            return true;  
        }

        onGamePoint()
        {
            if (this.isGameLost() == true)
            {
                console.log("Game Lost");
                this.gameEnded(false);
            }
            else if (this.isGameLost() == false)
            {
                //console.log("Continue Game");
                this.clickButton(this.currentRow-1); // Go to next row
            }
        }

        initialize()
        {
            this.setVariables();
            addBetTab("Auto", (e)=>{this.openTab(e);});

            //this.checkForGameWinOrLose = true;
            const towersGame = document.getElementsByClassName("towers_towersGameInner__gbFa9")[0];
            var observer = new MutationObserver(() => {
                if (this.checkForGameWinOrLose == true)
                {
                    console.log("Game Point");
                    this.checkForGameWinOrLose = false;
                    setTimeout(()=>{
                        //console.log(`Game Lost: ${this.isGameLost()}`);
                        this.onGamePoint();
                    }, 1000)
                }
            });
            
            var config = {
                childList: true,
                subtree: true,
            };
              
            observer.observe(towersGame, config);
        }
    }

    /////// FUNCTIONS ///////
    // HTML RELATED
    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    function addBetTab(tabName, tabPressed)
    {
        const gameBetTabs = document.getElementsByClassName("gameBetTabs")[0];
        const beforeTabDiv = getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[1]/div");
        
        // Remove & Add Tabs Back
        var buttonsString = "";
        const buttons = gameBetTabs.getElementsByClassName("button_tab__RC45L");
        for(let i=0;i<=buttons.length;i++) {
            const btn = buttons.item(i);
            //console.log(btn.outerHTML);
            buttonsString += btn.outerHTML;
            btn.remove();
        }
        buttonsString += `<button class="button_button__dZRSb button_tab__RC45L mbfg_button">${tabName}</button>`;
        beforeTabDiv.insertAdjacentHTML("beforebegin", `<div class="mbfg_bet_tabs">${buttonsString}`);

        const customTab = gameBetTabs.getElementsByClassName("mbfg_button")[0];

        gameBetTabs.getElementsByClassName("mbfg_bet_tabs")[0].querySelectorAll("button").forEach(btn => {
            btn.addEventListener("click", ()=>{
                gameBetTabs.querySelectorAll("button").forEach(btn2 => {
                    btn2.classList.remove("button_isActive__tpT2u");
                })
                btn.classList.add("button_isActive__tpT2u");

                if (tabPressed != null)
                {
                    tabPressed(btn.textContent);
                }
            });
        })
    }
    function addNumberSettings(name, defaultValue, numberChanged)
    {
        /*
            <div class="customInput gameBetInput mbfp_number_${name}">
                <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${name}</p>
                <div class="customInputInner">
                    <input class="input_input__N_xjH input_inputWithCurrencyEnd__y_4V_" type="text"
                        pattern="^-?[0-9]\d*(\.\d+)?$" placeholder="0" value="${defaultValue}"
                        style="background-image: url(&quot;/icons/infinity.svg&quot;);">
                    </div>
            </div>
        */
        const variableName = name.replace(/ /g, "_");
        getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button").insertAdjacentHTML('beforebegin',`
            <div class="customInput gameBetInput mbfp_number_${variableName}">
                <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${name}</p>
                <div class="customInputInner">
                    <input class="input_input__N_xjH input_inputWithCurrencyEnd__y_4V_" type="text"
                        pattern="^-?[0-9]\d*(\.\d+)?$" placeholder="0" value="${defaultValue}"
                        style="background-image: url(&quot;/icons/infinity.svg&quot;);">
                    </div>
            </div>`
        );

        const numberSettings = document.getElementsByClassName(`mbfp_number_${variableName}`)[0];
        const input = numberSettings.getElementsByTagName("input")[0];
        input.addEventListener("change", ()=>{
            if (numberChanged != null)
            {
                numberChanged(input.value);
            }
        })

        return numberSettings;
    }
    function addEnumSettings(name, enumObject, defaultEnum, enumChanged)
    {
        /*
        <div class="customInput gameBetInput">
            <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">Method</p>
            <div class="customInputOptions">
                <button class="button_button__dZRSb button_betOption__yOLYh">Normal</button>
                <button class="button_button__dZRSb button_betOption__yOLYh button_isActive__tpT2u">Adam's Method</button>
            </div>
        </div>
        */
        var enumButtons = "";
        Object.entries(enumObject).forEach(([key, value]) => {
            if (value == defaultEnum)
            {
                enumButtons += `<button id="mod_enum_${key}" class="button_button__dZRSb button_betOption__yOLYh button_isActive__tpT2u">${value}</button>`;
            }
            else
            {
                enumButtons += `<button id="mod_enum_${key}" class="button_button__dZRSb button_betOption__yOLYh">${value}</button>`;
            }
        });
        

        getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button").insertAdjacentHTML('beforebegin',`
            <div class="customInput gameBetInput mbfp_enum_${name}">
                <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${name}</p>
                <div class="customInputOptions">
                    ${enumButtons}
                </div>
            </div>`
        );

        const enums = document.getElementsByClassName(`mbfp_enum_${name}`)[0];
        const buttons = enums.querySelectorAll("button");
        Object.entries(enumObject).forEach(([key, value]) => {
            const btnClick = document.getElementById(`mod_enum_${key}`);
            btnClick.addEventListener("click", ()=>{
                buttons.forEach(btnSelected=>{
                    btnSelected.classList.remove("button_isActive__tpT2u");
                })
                btnClick.classList.add("button_isActive__tpT2u");

                if (enumChanged != null)
                {
                    enumChanged(key);
                }
            })
        });
        /*
        buttons.forEach(btnClick=>{
            
        })
        */
        return enums;
    }

    // GAMES RELATED
    function getTowerGame()
    {
        if (TOWERSGAME == null)
        {
            TOWERSGAME = new TowersGame();
        }
        return TOWERSGAME;
    }

    function initializeTowersGame()
    {
        const towerGame = getTowerGame();
        towerGame.initialize();
    }
    /*
    function stopPage()
    {
        if (currentPage == Page.Towers)
        {
            const towerGame = getTowerGame();
            towerGame.stop();
        }
    }
    */
    // OTHERS
    function locationChanged()
    {
        if (window.location.href == "https://bloxflip.com/towers" && currentPage != Page.Towers)
        {
            // Towers Game
            currentPage = Page.Towers;
            //stopPage();
            initializeTowersGame();
            //console.log("Initialized Tower Game");
        } else {
            // Game unsupported tab
            currentPage = Page.None;
            //console.log("This page is not currently supported");
        }
    }
    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    /////// EVENT LISTENERS ///////
    window.navigation.addEventListener("navigate", ()=>{
        setTimeout(()=>{
            locationChanged();
        }, 100);
    })
    /*
    const links = document.querySelectorAll('a[href*="/"]');
    links.forEach(link => {
        console.log(`Button: ${link}`);
        link.addEventListener('click', (e) => {
            setTimeout(()=>{
                locationChanged();
            }, 1000)
        });
    });
    */
    /////// START ///////
    locationChanged();
})())