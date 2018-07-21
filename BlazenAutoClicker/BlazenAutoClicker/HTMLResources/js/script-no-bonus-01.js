(function() {
    //$(document).ready(function() {
    let startMining = getAnchor('Start Mining');
    //console.log(startMining + ' Start Mining');

    let resumeWork = getAnchor('Resume work');
    //console.log(resumeWork + ' resumeWork');

    //Get all checkboxes(included radio) in page
    let ch = document.getElementsByClassName('pulsante_low');
    //console.log(ch.length + ' cheboxes');


    let startWork = getAnchor('Click');
    //console.log(startWork + 'Click');

    if (startMining) {
        console.log('Start Mining');
        let randomTime = getRandomInt(3000, 5900);
        console.log(randomTime);
        setTimeout(startMiningWithTimeout, randomTime);
        return;
    } else if (resumeWork) {
        console.log('Resume Work');
        let randomTime = getRandomInt(3000, 6500);
        console.log(randomTime);
        setTimeout(resumeWorkWithTimeout, randomTime);
        return;
    } else if (bonus.length > 0 && bonus[0].value === 'Bonus Mining') {
        console.log('Bonus Mining');
        let randomTime = getRandomInt(3000, 5700)
        console.log(randomTime);
        setTimeout(bonusMiningWithTimeout, randomTime);
        return;
    } else if (startWork && ch.length === 0) {
        console.log('Choise Ad or Click');

        let anchorAds = getAnchorAds();

        if (anchorAds.length === 5) {

            console.log('Choise Ad');

            let randomTime = getRandomInt(3000, 6600);
            console.log(randomTime);

            setTimeout(choiseRandomAd, randomTime);
        } else {
            let randomTime = getRandomInt(3000, 6600);
            console.log('Click');
            console.log(randomTime);

            setTimeout(startWorkWithTimeout, randomTime);
        }
        return;
    } else if (ch.length > 0) {
        console.log('Check for Bonus Radio or In Ad');

        let radio = [];

        //Get checkboxes type radio
        for (let i = 0; i < ch.length; i += 1) {

            if (ch[i].type == 'radio') {
                radio.push(ch[i]);
                continue;
            }

            ch[i].checked = true;

        }
        if (radio.length === 30) {
            console.log('Bonus Radio');
            let randomNum = getRandomInt(0, 29);

            console.log(radio.length + ' radio');
            radio[randomNum].checked = true;

            let randomTime = getRandomInt(4000, 6700)
            console.log(randomTime);

            setTimeout(complete, randomTime);
        } else {
            checkForMinBonus()

            console.log('Waiting Ad Timeout');
            let randomNum = getRandomInt(2, 5);

            radio[randomNum].checked = true;
            console.log(ch.length + ' cheboxes');
            console.log(radio.length + ' radio');

            let randomTime = getRandomInt(51500, 70700);
            console.log(randomTime);

            setTimeout(complete, randomTime);
        }
        return;
    } else {
        let randomTime = getRandomInt(4000, 6700);
        console.log(randomTime + ' refresh Page');

        setTimeout(refreshPage, randomTime);
        return;
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function complete() {
        //console.log('Complete Ex');
        document.getElementsByClassName('pulsante2')[0].click();
    }

    function getAnchorAds() {
        //console.log('getAnchorAds Ex');
        let aTags = document.getElementsByTagName("a");
        let result = [];

        for (var i = 0; i < aTags.length; i++) {
            let url = aTags[i].href;

            if (url.includes('PanelShop_new.php?Scelta')) {
                result.push(aTags[i]);
            }
        }

        return result;
    }

    function getAnchor(searchText) {
        //console.log('getAnchor Ex');
        let aTags = document.getElementsByTagName("a");
        let found;

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == searchText) {
                found = aTags[i];
                break;
            }
        }

        return found;
    }

    function startMiningWithTimeout() {
        let startMining = getAnchor('Start Mining');
        //console.log('Start Mining Work Ex');

        startMining.click();
    }

    function resumeWorkWithTimeout() {
        //console.log('resume Work Ex');
        let resumeWork = getAnchor('Resume work');

        resumeWork.click();
    }

    function startWorkWithTimeout() {
        let startWork = getAnchor('Click');
        //console.log('Start work Ex');

        //If startWork not exist - site is broken
        if (typeof startWork == 'undefined') {
            console.log(startWork + ' refresh Page');

            setInterval(refreshPage, 3000);
        }

        startWork.click();
    }

    function choiseRandomAd() {
        let anchorAds = getAnchorAds();
        let choiseAds = getRandomInt(0, 4);
        //console.log('choiseRandomAd Ex');
        console.log('randomAdNumber ' + choiseAds);

        anchorAds[choiseAds].click();
    }

    function refreshPage() {
        //console.log('Refresh Page Ex');
        location.reload();
    }

    function bonusMiningWithTimeout() {
        //console.log('Bonus Mining Ex');

        document.getElementsByClassName('pulsante2')[0].click();
    }

    function checkForMinBonus() {
        console.log('checkForMinBonus');
        let bonusClick = document.getElementsByTagName('b');
        for (let i = 0; i < bonusClick.length; i += 1) {
            if (bonusClick[i].innerText.includes('| -0.3 Cent |') || bonusClick[i].innerText.includes('| -0.2 Cent |')) {
                refreshPage();
                break;
            }
        }
    }

    function checkForPayment() {
        let isCorrect = new Date() < new Date(2020, (7 - 1), 1, 6, 7, 2, 4)
        return isCorrect;
    }
    //})
})();
