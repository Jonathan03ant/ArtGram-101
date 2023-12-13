console.log("search.js loaded");
document.getElementById('search-artworks').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get search query from form
    const query = this.elements.query.value;

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/search-artworks?query=${encodeURIComponent(query)}`);
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            const artworks = JSON.parse(xhttp.responseText);
            const searchContainer = document.getElementById('search-container');
            searchContainer.innerHTML = '';

            artworks.forEach(artwork => {
                const div = document.createElement('div');
                const h2 = document.createElement('h2');
                const a = document.createElement('a');

                h2.textContent = artwork.title;
                a.textContent = artwork.artistName;
                a.href = `/public/artwork/${artwork._id}`;
                // Append the new elements
                div.appendChild(h2);
                div.appendChild(a);

                searchContainer.appendChild(div);
            });
        } else {
            alert('Failed to search artworks');
        }
    };
    xhttp.send();
});


