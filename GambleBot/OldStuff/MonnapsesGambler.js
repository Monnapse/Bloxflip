((async (startPage = 0, autoClearConsole = true) => {
    var name = "Monnapse's Auto Gambler"
    function closeModal()
    {
        document.getElementsByClassName('mod_modal')[0].remove();
    }

    function createIntModal(name, title, inputText, defaultAmount, executeName, nextFunction)
    {
        document.body.insertAdjacentHTML('afterBegin',`<div class="mod_modal ReactModal__Overlay ReactModal__Overlay--after-open" style="position: fixed; inset: 0px; background-color: rgba(255, 255, 255, 0.75);"><div class="ReactModal__Content ReactModal__Content--after-open modals_defaultModal__OyCO0 modals_modalDeposit__1s7P2" tabindex="-1" role="dialog" aria-label="Replenishment modal" aria-modal="true"><div class="modals_defaultModalBreadcrumbs___fecQ"><div class="button_button__dZRSb modals_defaultModalBreadcrumbsItem__uWfTN"><span class="text_text__fMaR4 text_labelsRegular__YFakN">${name}</span></div></div><h2 class="heading_heading__rQMSe heading_heading2__HIhIE modals_modalDepositTitle__QXbSE" style="margin: 0.3em 0px 1em;">${title}</h2><div class="customInput modals_modalDepositInput__cCMcC"><p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${inputText}</p><div class="customInputInner"><input class="input_input__N_xjH input_inputWithCurrencyStart__agCI6 mag_robuxAmount" type="number" placeholder="Enter Amount of Robux" value="${defaultAmount}" style="background-image: url(&quot;/currency-icon.svg&quot;);"></div></div><button class="button_button__dZRSb button_primary__LXFHi modals_modalDepositButton__lYujJ mag_modalNext">${executeName}</button><button class="button_button__dZRSb modals_defaultModalClose__fP0aZ" aria-label="Close"></button></div></div>`);
        var closeButton = document.getElementsByClassName('modals_defaultModalClose__fP0aZ')[0];
        var nextButton = document.getElementsByClassName('mag_modalNext')[0];

        nextButton.addEventListener("click", ()=>{
            if (nextFunction != null) { nextFunction(document.getElementsByClassName("mag_robuxAmount")[0].value); }
        })
        closeButton.addEventListener("click", ()=>{ closeModal(); })
    }
    function createEnumModal(name, title, inputText, defaultIndex, object, executeName, nextFunction)
    {
        var enumButtons = "";
        Object.entries(object).forEach(([key, value]) => {
            if (value == defaultIndex)
            {
                enumButtons += `<button id="mod_enum_${value}" class="button_button__dZRSb button_betOption__yOLYh button_isActive__tpT2u">${key}</button>`;
            }
            else
            {
                enumButtons += `<button id="mod_enum_${value}" class="button_button__dZRSb button_betOption__yOLYh">${key}</button>`;
            }
        });
        document.body.insertAdjacentHTML('afterBegin',`<div class="mod_modal ReactModal__Overlay ReactModal__Overlay--after-open" style="position: fixed; inset: 0px; background-color: rgba(255, 255, 255, 0.75);"> <div class="ReactModal__Content ReactModal__Content--after-open modals_defaultModal__OyCO0 modals_modalDeposit__1s7P2" tabindex="-1" role="dialog" aria-label="Replenishment modal" aria-modal="true"> <div class="modals_defaultModalBreadcrumbs___fecQ"> <div class="button_button__dZRSb modals_defaultModalBreadcrumbsItem__uWfTN"><span class="text_text__fMaR4 text_labelsRegular__YFakN">${name}</span></div> </div> <h2 class="heading_heading__rQMSe heading_heading2__HIhIE modals_modalDepositTitle__QXbSE" style="margin: 0.3em 0px 1em;">${title}</h2> <div class="customInput modals_modalDepositInput__cCMcC"> <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${inputText}</p> <div class="customInputInner"> <div class="customInput gameBetInput"> <div class="customInputOptions">${enumButtons}</div> </div> </div> </div><button class="button_button__dZRSb button_primary__LXFHi modals_modalDepositButton__lYujJ mag_modalNext">${executeName}</button><button class="button_button__dZRSb modals_defaultModalClose__fP0aZ" aria-label="Close"></button> </div> </div>`);
        
        Object.entries(object).forEach(([key, value]) => {
            var enumButton = document.getElementById(`mod_enum_${value}`);
            enumButton.addEventListener('click', ()=>{
                Object.entries(object).forEach(([key, value]) => {
                    var enumButton = document.getElementById(`mod_enum_${value}`);
                    enumButton.classList.remove('button_isActive__tpT2u')
                });

                enumButton.classList.add('button_isActive__tpT2u');
            })
        });
        
        var closeButton = document.getElementsByClassName('modals_defaultModalClose__fP0aZ')[0];
        var nextButton = document.getElementsByClassName('mag_modalNext')[0];

        nextButton.addEventListener("click", ()=>{
            if (nextFunction != null) { 
                Object.entries(object).forEach(([key, value]) => {
                    var enumButton = document.getElementById(`mod_enum_${value}`);
                    if (enumButton.classList.contains('button_isActive__tpT2u'))
                    {
                        nextFunction(value); 
                    }
                });
                
            }
        })
        closeButton.addEventListener("click", ()=>{ closeModal(); })
    }

    function checkEnumButton(object, Xpath, returnF)
    {
        //var enumButton = getElementByXpath(Xpath);
        Object.entries(object).forEach(([key, value]) => {
            var enumButton = getElementByXpath(Xpath + `/button[${value+1}]`);//*[@id="__next"]/div[2]/div/div[2]/div[1]/div[1]/div/div[3]/div/button[1]
            
            if (enumButton.classList.contains('button_isActive__tpT2u'))
            {
                console.log(value);
                returnF(value);
                return value; 
            }
        });
    }

    const Games = Object.freeze({
        Towers: 0,
    });
    function createGamesModal(name, title, inputText, gameFunction)
    {
        document.body.insertAdjacentHTML('afterBegin',`<div class="mod_modal ReactModal__Overlay ReactModal__Overlay--after-open" style="position: fixed; inset: 0px; background-color: rgba(255, 255, 255, 0.75);"> <div class="ReactModal__Content ReactModal__Content--after-open modals_defaultModal__OyCO0 modals_modalDeposit__1s7P2" tabindex="-1" role="dialog" aria-label="Replenishment modal" aria-modal="true"> <div class="modals_defaultModalBreadcrumbs___fecQ"> <div class="button_button__dZRSb modals_defaultModalBreadcrumbsItem__uWfTN"><span class="text_text__fMaR4 text_labelsRegular__YFakN">${name}</span></div> </div> <h2 class="heading_heading__rQMSe heading_heading2__HIhIE modals_modalDepositTitle__QXbSE" style="margin: 0.3em 0px 1em;">${title}</h2> <div class="customInput modals_modalDepositInput__cCMcC"> <p class="text_text__fMaR4 text_labelsRegular__YFakN customInputLabel">${inputText}</p> <div class="customInputInner"> <div class="modals_coinbaseChooseCurrency__MG3uh" style="animation: 0.4s ease 0s 1 normal none running bottomTop; margin-top: 3em;"> <div class="modals_modalDepositMethods__iKjU6" style="margin-bottom: 0px; gap: 5px 24px;"> <button class="button_button__dZRSb modals_modalDepositMethodsItem__WzGgY mag_game_towers"> <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg" class=""> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 6.017 6.037 9.26v8.637c-.013.1-.121.347-.453.528-.332.18-.943.528-1.207.678-.126.076-.377.34-.377.792v1.735c.025.226.226.679.83.679H18.82c.226-.05.679-.256.679-.679v-1.923a1.07 1.07 0 0 0-.377-.566c-.242-.18-.98-.578-1.32-.754-.138-.076-.415-.355-.415-.867V9.336l2.074-3.432v-2.3A.751.751 0 0 0 18.708 3h-1.999c-.188.05-.565.241-.565.603v1.245c-.013.1-.091.302-.302.302h-1.924c-.113-.013-.339-.09-.339-.302v-1.32A.624.624 0 0 0 12.938 3h-2.565c-.175 0-.527.12-.527.603v1.245a.357.357 0 0 1-.378.302H7.545c-.088-.013-.264-.106-.264-.377v-1.17c0-.2-.128-.603-.641-.603H4.566A.562.562 0 0 0 4 3.603v2.414Zm6.26 7.92h2.942a.519.519 0 0 0 .415-.528v-2.753c0-.49-.415-1.471-1.735-1.471h-.453c-.515.038-1.546.385-1.546 1.47v2.867c.025.138.136.415.377.415Z"> </path> </svg> <span class="text_text__fMaR4 text_regular14__MHg5s modals_coinbaseCurrencyText__cZCcB">Towers </span> </button> </div> </div> </div> </div> <button class="button_button__dZRSb button_primary__LXFHi modals_modalDepositButton__lYujJ mag_modalNext">Next</button> <button class="button_button__dZRSb modals_defaultModalClose__fP0aZ" aria-label="Close"></button> </div> </div>`);
        var closeButton = document.getElementsByClassName('modals_defaultModalClose__fP0aZ')[0];
        var nextButton = document.getElementsByClassName('mag_modalNext')[0];
        closeButton.addEventListener("click", ()=>{ closeModal(); })
        towersButton.addEventListener("click", ()=>{ 
            gameFunction(); 
        })
    }

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function changeInputByClassName(className, value)
    {
        var inputElement = document.getElementsByClassName(className)[0];
        //console.log(value);
        //inputElement.value = parseInt(value);
        
        inputElement.focus(); // Focus the input field
        //inputElement.click();
        //inputElement.setAttribute("value", parseInt(value));
        //inputElement.value = parseInt(value);
        //console.log("Updated input value");

        setTimeout(()=>{
            const event = new KeyboardEvent('keydown', {
                key: '1',
                code: 'Digit1',
                keyCode: 49, // Deprecated, but still widely used
                charCode: 0,
                bubbles: true
            });
            
            // Dispatch the event to the input field
            inputElement.dispatchEvent(event);
        }, 800);
        
    }

    function changeButtonEnumByXpath(Xpath, value)
    {
        //var enumElement = getElementByXpath();
        var enumElement = getElementByXpath(Xpath+`/button[${value+1}]`);
        enumElement.click();
    }

    const Difficulty = Object.freeze({
        Easy: 0,
        Normal: 1,
        Hard: 2
    });
    const Methods = Object.freeze({
        Default: 0,
        Adams_Method: 1,
    });


    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }
      
    class TowersGame {
        constructor(difficultyIndex, gamesAmount, cashoutAt, gameEndedFunction)
        {
            this.difficultyIndex = difficultyIndex;
            this.gamesAmount = gamesAmount;
            this.cashoutAt = cashoutAt;
            this.gameEndedFunction = gameEndedFunction;
            this.currentGame = 1;
            this.rows = 8;
            this.buttons = 3;
    
            if (difficultyIndex == 1)
            {
                this.buttons = 2;
            }

            //startGame();
        }

        clickTowerButton(row, button) { getElementByXpath(`/html/body/div[2]/div[2]/div/div[2]/div[1]/div[2]/div/div/div[${row}]/div[${button}]/button`).click() }
        isGameLost() { if (document.getElementsByClassName("gameBetSubmit")[0].textContent == "Cashout"){ return false; } return true;  }

        //console.log("Robux: " + robuxAmount);
        //console.log("Difficulty: " + difficultyIndex);


        startGame()
        {
            if (this.gamesAmount == -1 || this.currentGame <= this.gamesAmount)
            {
                console.log("Starting Game");
                this.currentGame += 1;
                getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button').click();
                setTimeout(()=>{
                    this.clickButton(this.rows);
                }, 1000)
            }
        }

        defaultGameEnded(didWin)
        {
            if (this.gameEndedFunction != null)
            {
                setTimeout(()=>{
                    this.gameEndedFunction(didWin);
                },500)
            } else {
                //console.log(`${currentGame} <= ${gamesAmount}`);
                if (this.gamesAmount == -1 || this.currentGame <= this.gamesAmount)
                {
                    setTimeout(()=>{
                        this.startGame();
                    }, 1000)
                }
            }
        }

        clickButton(i)
        {
            var buttonIndex = getRandomInt(1, this.buttons+1);
        
            //console.log(`Current Row: ${this.rows-i} Cashing Out At: ${this.cashoutAt}`);
            this.clickTowerButton(i, buttonIndex);
            setTimeout(()=>{
                if (this.isGameLost()) 
                    { 
                        //console.log("Game Lost");
                        this.defaultGameEnded(false);
                    } else if (this.rows-i >= this.cashoutAt)
                    {
                        //document.getElementsByClassName("button_secondary__Fa_lP")[0].click();
                        //console.log("CASHING OUT");
                        setTimeout(()=>{
                            getElementByXpath("/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/button").click();
                            this.defaultGameEnded(true);
                        }, 1000)
                    } else {
                        setTimeout(()=>{this.clickButton(i-1)}, 750);
                    }
            }, 500)
        }
    }

    function startTowersGame(difficultyIndex, gamesAmount, cashoutAt, gameEndedFunction)
    {
        
    }

    function initializeNormalTowersGameMethod(difficultyIndex, method, gameAmount, cashoutAt)
    {
        createIntModal(name, "Games Amount", "Amount of Games (-1 for infinite)", 1, "Next", (gameAmount)=>{
            closeModal();
            gameAmount = gameAmount;

            createIntModal(name, "Cashout Tower Amount", "Chashout At Row", 1, "Next", (cashoutAmount)=>{
                closeModal();
                cashoutAt = cashoutAmount;
                
                const towersGame = new TowersGame(difficultyIndex, gameAmount, cashoutAt-1);
                towersGame.startGame();
                //startTowersGame(difficultyIndex, gameAmount, cashoutAt-1);
            });
        });
    }
    
    function getRobuxAmount()
    {
        return parseFloat(getElementByXpath('/html/body/div[2]/div[2]/header/div/div[1]/div/div/span/span').textContent);
    }
    function getRobuxAmountEntered()
    {
        return parseFloat(getElementByXpath('/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[2]/div/input').value);
    }

    function calculateMaxLoses()
    {
        return Math.floor(Math.log2(getRobuxAmount()/getRobuxAmountEntered()));
    }

    function initializeAdamsMethodTowersGameMethod(difficultyIndex, method, gameAmount)
    {
        createIntModal(name, "Games Amount", `Amount of Games (-1 for infinite)<br>Max Loses: <b>${calculateMaxLoses()}</b> (Loses in a row until you lose your streak)`, 1, "Next", (gameAmount)=>{
            closeModal();
            gameAmount = gameAmount;
    
            //startTowersGame(difficultyIndex, gameAmount, 0);
            var gamesLost = 0;
            const towersGame = new TowersGame(difficultyIndex, gameAmount, 0, (didWin)=>{
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
            });
            towersGame.startGame();
        });
    }

    function initializeTowersGame()
    {
        console.log("Tower Game");

        //var robuxAmount = 10;
        var method = 0;
        var gameAmount = 1;
        var cashoutAt = 1;
        var difficultyIndex = checkEnumButton(Difficulty, "/html/body/div[2]/div[2]/div/div[2]/div[1]/div[1]/div/div[3]/div", (index)=>{
            difficultyIndex=index
            //console.log(`Difficulty: ${difficultyIndex}`);

            createEnumModal(name, "Towers Method", `<b>Default:</b> Just goes through all games and rows you specify.
                <br><b>Adam's Method:</b> Recommended to play on normal difficulty. Adam's Method cash out on first row if won, if lost then double bet amount, 
                if won then bet goes back to default. This method almost guarantees you make more, because when you lose it doubles your bet amount and then when you win again you make your robux back and then the process restarts,
                so your bet amount will be resetted to whatever you put it to, the reason it doubles everytime on loss is so you can win it all back next time you win.`, 1, Methods, "Next", (index)=>{
                closeModal();
                method = index;

                if (method == Methods.Normal)
                {
                    initializeNormalTowersGameMethod(difficultyIndex, method, gameAmount, cashoutAt);
                } else if (method == Methods.Adams_Method)
                {
                    initializeAdamsMethodTowersGameMethod(difficultyIndex, method, gameAmount, cashoutAt);
                } else {
                    initializeNormalTowersGameMethod(difficultyIndex, method, gameAmount);
                }
            });
        });
        
        /*
        createIntModal(name, "Robux Amount", "Amount of Robux", 10, "Next", (rbxAmount)=>{
            
            closeModal();
            robuxAmount = rbxAmount;
            changeInputByClassName("input_inputWithCurrencyStart__agCI6", robuxAmount);
            //changeInputByClassName("input_inputWithCurrencyStart__agCI6", amount);
            
            createEnumModal(name, "Difficulty", "", 1, Difficulty, "Next", (index)=>{
                closeModal();
                difficultyIndex = index;

                
            });
        });
        */
    }

    if (window.location.href == "https://bloxflip.com/towers")
    {
        // Towers
        initializeTowersGame();
    } else {
        console.log("This game is not currently supported");
    }
})())


