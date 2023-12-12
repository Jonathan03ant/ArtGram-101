console.log("search.js loaded");
document.getElementById('search-artworks').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get search query from form
    const query = this.elements.query.value;

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', `/search-artworks?query=${encodeURIComponent(query)}`);
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            // Update page with matching artworks
            // Parse JSON response
            const artworks = JSON.parse(xhttp.responseText);

            // Get search-container div
            const searchContainer = document.getElementById('search-container');

            // Clear the container
            searchContainer.innerHTML = '';

            // Append matching artworks to the container
            artworks.forEach(artwork => {
                // Create new elements for each artwork
                const div = document.createElement('div');
                const h2 = document.createElement('h2');
                const a = document.createElement('a');

                // Set the content of the new elements
                h2.textContent = artwork.title;
                a.textContent = artwork.artistName;

                // Set the href of the anchor element to the public artwork page
                a.href = `/public/artwork/${artwork._id}`;

                // Append the new elements to the div
                div.appendChild(h2);
                div.appendChild(a);

                // Append the div to the search-container
                searchContainer.appendChild(div);
            });
        } else {
            alert('Failed to search artworks');
        }
    };
    xhttp.send();
});