/*
    *Adding Workshop
*/
console.log("Add workshop script loaded");
window.onload = function() {
    
    /*
        *Adding Workshop
    */
    document.getElementById('addworkshop').addEventListener('click', function(event) {
        console.log("Add workshop clicked")
        event.preventDefault();
        // Display the form
        document.getElementById('addworkshop-form').style.display = 'block';
        document.getElementById('addworkshop-form').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get workshop title from form
            const title = this.elements.title.value;

            // Send AJAX request to server
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/add-workshop');
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    alert('Workshop added successfully');
                    window.location.reload();
                } else {
                    alert('Failed to add workshop');
                }
            };
            xhttp.send(JSON.stringify({ userId: this.elements.userId.value, title }));
        });
    });

    /*
        *Adding Artwork
    */

    document.getElementById('addmore-artwork').addEventListener('click', function(event) {
        console.log("Add artwork clicked");
        event.preventDefault();
        // Display the form
        document.getElementById('addartworkkk').style.display = 'block';
    });

    document.getElementById('submit-artworkkk').addEventListener('click', function(event) {
        console.log("Add artwork form submitted");
        event.preventDefault();

        // Get artwork details from form
        const form = document.getElementById('addartworkkk');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Send AJAX request to server
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/add-more-artwork'); // Replace with your actual endpoint
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                alert('Artwork added successfully');
                window.location.reload();
            } else {
                alert('Failed to add artwork');
            }
        };
        xhttp.send(JSON.stringify(data));
    });
}