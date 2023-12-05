/*
    *part1, sending post request to create an account
*/

const create = document.querySelector("#accountCreationForm");
create.addEventListener('submit', function(event){
    event.preventDefault();

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
        } else {
            console.error("Error:", xhttp.statusText);
        }
    };

    xhttp.send(data);
});