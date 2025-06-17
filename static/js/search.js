(function() {
    const searchIcon = document.getElementById('search-icon');
    if (!searchIcon) {
        return;
    }

    const searchPopup = document.getElementById('search-popup');
    const searchPopupClose = document.querySelector('.search-popup-close');
    const searchQuery = document.getElementById('search-query');
    const searchResults = document.getElementById('search-results');
    let fuse;

    fetch('/blog/index.json')
        .then(response => response.json())
        .then(data => {
            const options = {
                keys: ['title', 'content', 'tags', 'complexity'],
                includeScore: true,
                threshold: 0.3,
                minMatchCharLength: 2,
            };
            fuse = new Fuse(data, options);
        })
        .catch(error => console.error('Error fetching search index:', error));

    searchIcon.addEventListener('click', () => {
        searchPopup.style.display = 'block';
        searchQuery.focus();
    });

    searchPopupClose.addEventListener('click', () => {
        searchPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == searchPopup) {
            searchPopup.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
            event.preventDefault();
            searchPopup.style.display = 'block';
            searchQuery.focus();
        }

        if (event.key === 'Escape') {
            searchPopup.style.display = 'none';
        }
    });

    searchQuery.addEventListener('keyup', (e) => {
        const query = e.target.value;
        if (query.length > 1) {
            const results = fuse.search(query);
            displayResults(results);
        } else {
            searchResults.innerHTML = '';
        }
    });

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length > 0) {
            const ul = document.createElement('ul');
            results.forEach(result => {
                const item = result.item;
                const li = document.createElement('li');
                
                let tagsHTML = '';
                if (item.tags && item.tags.length > 0) {
                    tagsHTML = `<div class="search-result-tags">Tags: ${item.tags.join(', ')}</div>`;
                }

                let complexityHTML = '';
                if (item.complexity) {
                    complexityHTML = `<div class="search-result-complexity">Complexity: ${item.complexity}</div>`;
                }

                li.innerHTML = `<a href="${item.url}">${item.title}</a>${tagsHTML}${complexityHTML}`;
                ul.appendChild(li);
            });
            searchResults.appendChild(ul);
        } else {
            searchResults.innerHTML = '<p>No results found.</p>';
        }
    }
})();
