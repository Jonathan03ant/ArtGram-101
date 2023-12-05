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
                window.location = '/account';
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
                        window.location.href = '/account/patron/' + response.username;
                    } else if (response.accountType === 'artist') {
                        window.location.href = '/account/artist/' + response.username;
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