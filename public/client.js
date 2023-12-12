/*
    *part1, sending post request to create an account
*/
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    /*
        *Two distinct POST requests
        *../createaccount
        *../login
    */

    if (this.id === "accountCreationForm") {
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value.trim();
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
    
        const data = `firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}
                    &username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/createaccount");
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
        xhttp.onload = function(){
            if (xhttp.status === 200){
                console.log(xhttp.responseText);
                window.location = '/patron/home';
            } else {
                console.error("Error:", xhttp.statusText);
            }
        };
    
        xhttp.send(data);
    } else if (this.id === "accountLoginForm"){
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', "/login");
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhttp.onload = function(){
            if (xhttp.status === 200){
                const response = JSON.parse(xhttp.responseText);
                console.log(response);
                console.log(response.message);
                if (response.message === 'success') {
                    if (response.accountType === 'patron') {
                        window.location.href = '/patron/home';
                    } else if (response.accountType === 'artist') {
                        window.location.href = '/artist/home';
                    }
                }
            } else {
                const response = JSON.parse(xhttp.responseText);
                alert(response.message)
            }
        };
        xhttp.send(data);
    }
});

/*
    *Switch Functionality (Artist)
*/

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#change-account');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (confirm('Are you sure you want to switch account type?')) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/change-account');
            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    const user = JSON.parse(xhttp.responseText);
                    window.location.href = user.accountType === 'artist' ? '/artist/home' : '/patron/home';
                } else if (xhttp.status === 400) {
                    alert('You need to add an artwork before you can switch to an artist account.');
                    document.getElementById('add-artwork').style.display = 'block';
                } else {
                    alert('Failed to switch account type');
                }
            };
            xhttp.send();
        }
    });

    const addArtworkForm = document.querySelector('#add-artwork');
    addArtworkForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/add-artwork');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        const formData = {
            title: addArtworkForm.elements.title.value,
            artistName: addArtworkForm.elements.artistName.value,
            year: addArtworkForm.elements.year.value,
            category: addArtworkForm.elements.category.value,
            medium: addArtworkForm.elements.medium.value,
            description: addArtworkForm.elements.description.value,
            poster: addArtworkForm.elements.poster.value
        };
        console.log(formData);
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                window.location.href = '/artist/home';
            } else {
                alert('Failed to add artwork');
            }
        };
        xhttp.send(JSON.stringify(formData));
    });

});

/*
    *Liking an artwork, POST request
*/
document.getElementById('like-button').addEventListener('click', function() {
    const artworkId = this.dataset.artworkId;
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/like-artwork');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            const likeCountElement = document.getElementById('artwork-likes');
            likeCountElement.textContent = `Likes: ${parseInt(likeCountElement.textContent.split(' ')[1]) + 1}`;
        } else {
            alert('Failed to like artwork');
        }
    };
    xhttp.send(JSON.stringify({ artworkId: artworkId }));
});

/*
    *Unliking an artwork, POST request
*/
document.getElementById('unlike-button').addEventListener('click', function() {
    const artworkId = this.dataset.artworkId;
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/unlike-artwork');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            const likeCountElement = document.getElementById('artwork-likes');
            likeCountElement.textContent = `Likes: ${parseInt(likeCountElement.textContent.split(' ')[1]) - 1}`;
        } else {
            alert('Failed to unlike artwork');
        }
    };
    xhttp.send(JSON.stringify({ artworkId: artworkId }));
});

/*
    *Reviewing an artwork, POST request
*/
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const reviewText = document.getElementById('review-text').value;
    const artworkId = this.dataset.artworkId;
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/add-review');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            const review = JSON.parse(xhttp.responseText);
            console.log(this.responseText);
            const reviewsElement = document.getElementById('artist-reviews');
            reviewsElement.innerHTML += `<p>${review.review} - ${review.user.firstName}</p>`;
        } else {
            alert('Failed to submit review');
        }
    };
    xhttp.send(JSON.stringify({ artworkId: artworkId, review: reviewText }));
});