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
function cloneScriptElement(scriptElement, username, repo, jsPath = null, branch = 'main') {
    if (!(scriptElement instanceof HTMLScriptElement)) {
        throw new Error("First argument must be a HTML script element.");
    }

    const SCRIPT_CLONE = document.createElement('script');

    for(let i = 0; i < scriptElement.attributes.length; i++) {
        var attribute = scriptElement.attributes[i];
        SCRIPT_CLONE.setAttribute(attribute.name, attribute.value);
    }

    args = [...arguments];
    if(args.length != 1 && args.length != 3 && args.length != 4 && args.length != 5) {
        throw new Error("Arguments must match (HTMLScriptElement, string, string, string, string?) or (HTMLScriptElement)");
    }
    if(args.length > 1) {
        for(let a = 1; a < args.length; a++) {
            if(typeof args[a]!= 'string') {
                throw new Error("The arugments, username, repo, jsPath, branch, must be of type string");
            }
        }
        let rawURL = `https://cdn.jsdelivr.net/gh/${username}/${repo}@${branch}/${jsPath}`;
        rawURL = rawURL.replace(/([^:])\/\//g, '$1/');
        SCRIPT_CLONE.setAttribute('src', rawURL);
    }

    SCRIPT_CLONE.text = scriptElement.text;

    if(SCRIPT_CLONE.type == 'importmap') {
        if(args.length < 2) {
            throw new Error("Arguments about the repository must be provided when cloning script elements of type 'importmap'. Please provide the arguments: (scriptElement, username, repo, jsPath, branch?)");
        }
        SCRIPT_CLONE.removeAttribute('src');
        const ABSOLUTE_PATH = `https://cdn.jsdelivr.net/gh/${username}/${repo}@${branch}/`;
        SCRIPT_CLONE.text = SCRIPT_CLONE.text.replace(/":\s*"/g, `": "${ABSOLUTE_PATH}`);
        SCRIPT_CLONE.text = SCRIPT_CLONE.text.replace(/([^:])\/\//g, '$1/');
    }

    return SCRIPT_CLONE;
}

/**
 * 
 * @param {string} username is the username of the owner of the repository.
 * @param {string} repo is the name of the repository.
 * @param {string[]} cssPaths is an array of paths to the files to be fetched.
 * @param {string} branch (optional) is set to 'main' by default and tells which branch of the repository is being fetched.
 * @param {HTMLElement} container (optional) The HTML element in which the interpolation takes place. Default document.
 */
function interpolateCSS(username, repo, cssPaths, container, branch = 'main') {
    const PATHS = cssPaths;
    const CSS_LINKS = container.querySelectorAll('link[rel="stylesheet"][href$=".css"]');
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
 * @param {HTMLElement} container (optional) The HTML element in which the interpolation takes place. Default document.
 */
function interpolateJS(username, repo, jsPaths, container, branch = 'main') {
    const PATHS = jsPaths;
    const SCRIPT_ELEMENTS = container.querySelectorAll('script[src]');
    if(PATHS.length != SCRIPT_ELEMENTS.length) {
        throw new Error(`Number of JS paths (${PATHS.length}) does not correspond to the number of link elements to .js files (${JS_LINKS.length}) in the target document.`);
    }

    const IMPORTMAPS = container.querySelectorAll('script[type="importmap"]');
    for(const MAP of IMPORTMAPS) {
        const MAP_CLONE = cloneScriptElement(MAP, username, repo);
        const PARENT = MAP.parentNode;
        PARENT.removeChild(MAP);
        PARENT.appendChild(MAP_CLONE);
    }

    for(let e = 0; e < SCRIPT_ELEMENTS.length; e++) {
        const SCRIPT_CLONE = cloneScriptElement(SCRIPT_ELEMENTS[e], username, repo, PATHS[e]);
        const PARENT = SCRIPT_ELEMENTS[e].parentNode;
        PARENT.removeChild(SCRIPT_ELEMENTS[e]);
        PARENT.appendChild(SCRIPT_CLONE);
    }

    console.log(IMPORTMAPS.length);
}

let paths = [];
const USER = 'sifhg';
const TARGET_REPOSITORY = 'tanks_lite';
const INDEX_PATH = 'index.html';
const BRANCH = 'main';
document.addEventListener('DOMContentLoaded', () => {
    const PLACEHOLDER = document.getElementById('placeholder');
    const THIS_BODY = document.getElementById('original-body');
    
    getGitContent(USER, TARGET_REPOSITORY, INDEX_PATH)
    .then(data => {
        let loadedPage = document.createElement('html');
        loadedPage.setAttribute('id', 'placeholder');
        loadedPage.innerHTML = data;
        loadedPage.outerHTML = loadedPage.querySelector('html');
        paths = extractFilePaths(loadedPage);
        console.log(paths);
        interpolateCSS(USER, TARGET_REPOSITORY, paths.CSS, loadedPage);
        interpolateJS(USER, TARGET_REPOSITORY, paths.JS, loadedPage);
        const PAGE_HTML = document.querySelector('html');
        const PARENT_HTML = PAGE_HTML.parentNode;
        PARENT_HTML.removeChild(PAGE_HTML);
        PARENT_HTML.appendChild(loadedPage);
        // PLACEHOLDER.replaceWith(loadedPage);
        // THIS_BODY.style.display = 'none';
    })
    .catch(error => {
        console.error(error.message);
    });
});