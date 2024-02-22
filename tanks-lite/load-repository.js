/**
 * Returns a string of all the content of a file in a target github repository.
 * @param {string} username is the username of the owner of the repository.
 * @param {string} repo is the name of the repository.
 * @param {string} filePath is the path to the file, to be fetched.
 * @param {string} branch (optional) is set to 'main' by default and tells which branch of the repository is being fetched.
 * @returns {string} raw content of the file.
 */
async function getGitContent(username, repo, filePath, branch = 'main') {
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}`;

    try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${rawUrl}: ${response.status} ${response.statusText}`);
        }
        let rawContent = response.text();
        return await rawContent;
    } catch (error) {
        throw new Error(`Error fetching raw file: ${error}`);
    }
}

/**
 * 
 * @param {HTMLElement} htmlElement is the element of which paths to .css and .js will be extracted. 
 * @returns {CSS: string[], JS: string[]} an object with lists of paths to .css files and to .js files.
 */
function extractFilePaths(htmlElement) {
    const PATHS = {
        CSS: [],
        JS: []
    };

    const CSS_LINKS = htmlElement.querySelectorAll('link[rel="stylesheet"][href$=".css"]');
    CSS_LINKS.forEach(link => {
        const CSS_PATH = link.getAttribute('href');
        PATHS.CSS.push(CSS_PATH);        
    });

    const JS_SCRIPTS = htmlElement.querySelectorAll('script[src]');
    JS_SCRIPTS.forEach(script => {
        const jsPath = script.getAttribute('src');
        PATHS.JS.push(jsPath);
    })

    return PATHS;
}

/**
 * 
 * @param {object} scriptElement Element to be cloned
 * @returns {object} A clone of the argument
 */
function cloneScriptElement(scriptElement, username, repo, jsPaths, branch = 'main') {
    if (!(scriptElement instanceof HTMLScriptElement)) {
        throw new Error("First argument must be a HTML script element.");
    }

    const SCRIPT_CLONE = document.createElement('script');

    for (var i = 0; i < scriptElement.attributes.length; i++) {
        var attribute = scriptElement.attributes[i];
        SCRIPT_CLONE.setAttribute(attribute.name, attribute.value);
    }

    args = [...arguments];
    console.log(args.length);
    if(args.length != 1 && args.length != 4 && args.length != 5) {
        throw new Error("Arguments must match (HTMLScriptElement, string, string, string, string?) or (HTMLScriptElement)");
    }
    if(args.length > 1) {
        for(let a = 1; a < args.length; a++) {
            if(typeof args[a]!= 'string') {
                throw new Error("The arugments, username, repo, jsPaths, branch, must be of type string");
            }
        }
        const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${jsPaths}`;
        const SRC_ATTRIBUTE = SCRIPT_CLONE.getAttribute('src');
        SCRIPT_CLONE.setAttribute('src', `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}/${SRC_ATTRIBUTE}`);
    }

    SCRIPT_CLONE.text = scriptElement.text;

    return SCRIPT_CLONE;
}

/**
 * 
 * @param {string} username is the username of the owner of the repository.
 * @param {string} repo is the name of the repository.
 * @param {string[]} cssPaths is an array of paths to the files to be fetched.
 * @param {string} branch (optional) is set to 'main' by default and tells which branch of the repository is being fetched.
 */
function interpolateCSS(username, repo, cssPaths, branch = 'main') {
    const PATHS = cssPaths;
    const CSS_LINKS = document.getElementById("placeholder").querySelectorAll('link[rel="stylesheet"][href$=".css"]');
    if(PATHS.length != CSS_LINKS.length) {
        throw new Error(`Number of CSS paths (${PATHS.length}) does not correspond to the number of link elements to .css files (${CSS_LINKS.length}) in the target document.`);
    }
    for(let e = 0; e < CSS_LINKS.length; e++) {
        getGitContent(username, repo, PATHS[e])
        .then(data => {
            const STYLE_ELEMENT = document.createElement('style');
            STYLE_ELEMENT.textContent = data;
            CSS_LINKS[e].replaceWith(STYLE_ELEMENT);
        })
        .catch(error => {
            console.error(error.message);
        })
    }
}

/**
 * 
 * @param {string} username is the username of the owner of the repository.
 * @param {string} repo is the name of the repository.
 * @param {string[]} jsPaths is an array of paths to the files to be fetched.
 * @param {string} branch (optional) is set to 'main' by default and tells which branch of the repository is being fetched.
 */
function interpolateJS(username, repo, jsPaths, branch = 'main') {
    const PATHS = jsPaths;
    const SCRIPT_ELEMENTS = document.getElementById("placeholder").querySelectorAll('script[src]');
    if(PATHS.length != SCRIPT_ELEMENTS.length) {
        throw new Error(`Number of JS paths (${PATHS.length}) does not correspond to the number of link elements to .js files (${JS_LINKS.length}) in the target document.`);
    }
    for(let e = 0; e < SCRIPT_ELEMENTS.length; e++) {
        getGitContent(username, repo, PATHS[e])
        .then(data => {
            const SCRIPT_CLONE = cloneScriptElement(SCRIPT_ELEMENTS[e]);
            SCRIPT_CLONE.removeAttribute('src');
            SCRIPT_CLONE.text = data;
            const PARENT = SCRIPT_ELEMENTS[e].parentNode;
            PARENT.removeChild(SCRIPT_ELEMENTS[e]);
            PARENT.appendChild(SCRIPT_CLONE);
        })
        .catch(error => {
            console.error(error.message);
        })
    }
}

let paths = [];
const USER = 'sifhg';
const TARGET_REPOSITORY = 'api-test';
const INDEX_PATH = 'index.html';
document,addEventListener('DOMContentLoaded', () => {
    const PLACEHOLDER = document.getElementById('placeholder');
    const THIS_BODY = document.getElementById('original-body');
    

    getGitContent(USER, TARGET_REPOSITORY, INDEX_PATH)
    .then(data => {
        PLACEHOLDER.innerHTML = data;
        paths = extractFilePaths(PLACEHOLDER);
        console.log(paths);
        THIS_BODY.style.display = 'none';
        interpolateCSS(USER, TARGET_REPOSITORY, paths.CSS);
        interpolateJS(USER, TARGET_REPOSITORY, paths.JS);
    })
    .catch(error => {
        console.error(error.message);
    });
});