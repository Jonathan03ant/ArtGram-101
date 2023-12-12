
/*
    *Switch Artist-->Patron
*/
document.addEventListener('DOMContentLoaded', function() {
    const switchAccountButton = document.getElementById('switch-account-button');
    console.log(switchAccountButton);
    switchAccountButton.addEventListener('click', function(event) {
        console.log("clicked");
        event.preventDefault();
        if (confirm('Are you sure you want to switch account type?')) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/change-account-ap');
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    window.location.href = '/patron/home';
                } else {
                    alert('Failed to switch account type');
                }
            };
            xhttp.send(JSON.stringify({ userId: this.dataset.userId }));
        }
    });
});


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
    *Switch Patron-->Artist, Patron has an artwork already
*/

document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('#change-account');
    button.addEventListener('click', function(event) {
        event.preventDefault();
        if (confirm('Are you sure you want to switch account type?')) {
            const xhttp = new XMLHttpRequest();
            xhttp.open('POST', '/change-account-pa');
            xhttp.setRequestHeader('Content-Type', 'application/json');
            xhttp.onload = function() {
                if (xhttp.status === 200) {
                    console.log("Sucess!");
                    window.location.href = '/artist/home';
                } else if (xhttp.status === 400) {
                    alert('You need to add an artwork before you can switch to an artist account.');
                    document.getElementById('addartwork').style.display = 'block';

                    /*
                        *Proceeding to add artwork
                    */

                        const submitArtworkButton = document.getElementById('submit-artwork');
                        submitArtworkButton.addEventListener('click', function(event) {
                            event.preventDefault();
                                //collect
                            const form = document.getElementById('addartwork');
                            const formData = new FormData(form);
                            const data = Object.fromEntries(formData);
                                //send AJAX
                            const xhttp = new XMLHttpRequest();
                            xhttp.open('POST', '/change-account-paw');
                            xhttp.setRequestHeader('Content-Type', 'application/json');
                            xhttp.onload = function() {
                                if (xhttp.status === 200) {
                                    console.log("Sucess!");
                                    window.location.href = '/artist/home';
                                } else {
                                    alert('Failed to add artwork');
                                }
                            };
                            xhttp.send(JSON.stringify(data));
                        });
                } else {
                    alert('Failed to switch account type');
                }
            };
            xhttp.send(JSON.stringify({ userId: this.dataset.userId }));
        }
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
            location.reload();
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
            location.reload();
        } else {
            alert('Failed to submit review');
        }
    };
    xhttp.send(JSON.stringify({ artworkId: artworkId, review: reviewText }));
});

/*
    *Deleting Review
*/
document.querySelectorAll('.delete-review-button').forEach(button => {
    button.addEventListener('click', function() {
        const reviewId = this.dataset.reviewId;
        const artworkId = this.dataset.artworkId;
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/delete-review');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                location.reload();
                const reviewElement = document.getElementById(`review-${reviewId}`);
                reviewElement.parentNode.removeChild(reviewElement);
            } else {
                alert('Failed to delete review');
            }
        };
        xhttp.send(JSON.stringify({ reviewId: reviewId, artworkId: artworkId }));
    });
});


/*
    *Editing Review
*/

document.querySelectorAll('.edit-review-button').forEach(button => {
    button.addEventListener('click', function() {
        const reviewElement = this.parentNode.querySelector('.comment');
        const reviewText = reviewElement.textContent;
        reviewElement.innerHTML = `<input type="text" value="${reviewText}">`;
        const input = reviewElement.querySelector('input');
        input.focus();
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const newReviewText = this.value;
                const reviewId = button.dataset.reviewId;
                const artworkId = button.dataset.artworkId;
                const xhttp = new XMLHttpRequest();
                xhttp.open('POST', '/edit-review');
                xhttp.setRequestHeader('Content-Type', 'application/json');
                xhttp.onload = function() {
                    if (xhttp.status === 200) {
                        reviewElement.textContent = newReviewText;
                        location.reload();
                    } else {
                        alert('Failed to edit review');
                    }
                };
                xhttp.send(JSON.stringify({ reviewId: reviewId, artworkId: artworkId, review: newReviewText }));
            }
        });
    });
}); 

/*
    *Notification
*/

document.getElementById('notification-link').addEventListener('click', function(event) {
    event.preventDefault();
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/notification');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.onload = function() {
        if (xhttp.status === 200) {
            const notifications = JSON.parse(xhttp.responseText);
            // Display the notifications in a pop-up box
            let notificationText = '';
            notifications.forEach(notification => {
                notificationText += notification.type === 'like' ? 'You have a new like on your artwork.\n' : `You have a new ${notification.type} on your artwork.\n`;
            });
            alert(notificationText);
        } else {
            alert('Failed to load notifications');
        }
    };
    xhttp.send(JSON.stringify({ artistId: this.dataset.artistId }));
});