const charNameArray = ['abigail', 'akira', 'akuma', 'alex', 'balrog', 'birdie',
    'blanka', 'cammy', 'chun-li', 'cody', 'dan', 'dhalsim',
    'ed', 'ehonda', 'falke', 'fang', 'g', 'gill', 'guile',
    'ibuki', 'juri', 'kage', 'karin', 'ken', 'kolin', 'laura',
    'lucia', 'luke', 'mbison', 'menat', 'nash', 'necalli',
    'oro', 'poison', 'rashid', 'rmika', 'rose', 'ryu', 'sagat',
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

}