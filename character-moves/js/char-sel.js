const charNameArray = ['abigail', 'akira', 'akuma', 'alex', 'balrog', 'birdie',
    'blanka', 'cammy', 'chun-li', 'cody', 'dan', 'dhalsim',
    'ed', 'e. honda', 'falke', 'fang', 'g', 'gill', 'guile',
    'ibuki', 'juri', 'kage', 'karin', 'ken', 'kolin', 'laura',
    'lucia', 'luke', 'm. bison', 'menat', 'nash', 'necalli',
    'oro', 'poison', 'rashid', 'r. mika', 'rose', 'ryu', 'sagat',
    'sakura', 'seth', 'urien', 'vega', 'zangief', 'zeku'];

// Populates an array with the file paths to each character '.json' files

const charPromFileArr = charNameArray.map((name) => {
    return fetch(`json/${name.toUpperCase()}.json`)
});

// Using the file path array, asyncronously creates a promise array with
// the fetched json files and then creates another array with the
// json data to be used

Promise.all(charPromFileArr)
    .then((response) => Promise.all(response.map(prom => prom.json())))

// when the data is retrieved successfully, it calls 
// back the page creation function

    .then(buildPage);
        
function buildPage(charJsonArray) {

// creates the buttons to each character as an 'li' element inside the 'ul'
// element on the page with their names and pictures

    const charList = document.getElementById('character-list');
    
    for (charName of charNameArray) { 
        charList.appendChild(
                Object.assign(
                    document.createElement('li'),
                    {
                        id: `${charName}`,
                    }
            )).appendChild(
                Object.assign(
                    document.createElement('a'),
                    {
                        href: "./sfv_moves_abigail.html"       
                    }
            )).appendChild(
                Object.assign(
                    document.createElement('div'),
                    {
                        className: 'char-button',
                        style: 'background-image: ' +
                        `url("img/characters/small/${charName}.png"); flex: 1;`
                    }
            )).appendChild(
                Object.assign(
                    document.createElement('p'),
                    {
                        innerHTML: `${charName.toUpperCase()}`
                    }
                )
            );
    }


// this is a not very elegant solution to the problem that when the layout
// displays more than one column of buttons, the last button has a different
// size than the others

    const blankLiNum = 3;

    for (let i = 0; i < blankLiNum; ++i) {
        charList.appendChild(
            Object.assign(
                document.createElement('li'),
                {
                    style: 'visibility: hidden;',
                    className: 'blank'
                }
            )
        )
    }

// enables and disables character buttons based on search text input by the user

    const charLiElements = document.getElementsByTagName("li");
    const searchText = document.getElementById('search-term');

    searchText.addEventListener('input', () => {

        let inputText = searchText.value; 
        const regex = new RegExp(`^${inputText}`);
        
// iterate through <li> elements and changes their display property to
// none if their id property value doesn't match the input value.
// Also restores their visibility in case the input text goes back to nothing 

        if (inputText !== '') {

            for (char of charLiElements) {
                const idText = char.id;
                if (!idText.match(regex) && char.className !== 'blank') {
                    char.style.display = 'none';
                }
            }
            
        } else {
            for (char of charLiElements) {
                char.style.display = 'flex';
            }
        }

    })

    
}
