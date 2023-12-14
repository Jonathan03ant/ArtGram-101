console.log('follow.js loaded');
window.onload = function() {
    document.querySelector('.follow-button').addEventListener('click', function(event) {
        const userId = this.dataset.userId;
        const artistId = this.dataset.artistId;

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/follow-artist');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                alert('Followed artist successfully');
                window.location.reload();
            } else {
                alert('Failed to follow artist');
            }
        };
        xhttp.send(JSON.stringify({ userId, artistId }));
    });

    document.querySelector('.unfollow-button').addEventListener('click', function(event) {
        const userId = this.dataset.userId;
        const artistId = this.dataset.artistId;

        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', '/unfollow-artist');
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.onload = function() {
            if (xhttp.status === 200) {
                alert('Unfollowed artist successfully');
                window.location.reload();
            } else {
                alert('Failed to unfollow artist');
            }
        };
        xhttp.send(JSON.stringify({ userId, artistId }));
    });
}
