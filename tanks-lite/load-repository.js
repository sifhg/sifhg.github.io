function getGitContent(username, repo, filePath, branch = 'main') {
    const rawUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${filePath}`;

    return fetch(rawUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${rawUrl}: ${response.status} ${response.statusText}`);
            }
            let htmlContent = response.text();
            return htmlContent;
        })
        .catch(error => {
            throw new Error(`Error fetching raw file: ${error}`);
        });
}

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

document,addEventListener('DOMContentLoaded', () => {
    const PLACEHOLDER = document.getElementById('placeholder');
    const THIS_BODY = document.getElementById('original-body');
    let paths = [];

    getGitContent('sifhg', 'api-test', 'index.html')
    .then(data => {
        PLACEHOLDER.innerHTML = data;
        paths = extractFilePaths(PLACEHOLDER);
        console.log(paths);
        THIS_BODY.style.display = 'none';
    })
    .catch(error => {
        console.error(error.message);
    });
});