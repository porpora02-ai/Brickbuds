async function register() {

    const username =
    document.getElementById("username").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const response = await fetch(
        "http://localhost:3000/api/auth/register",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    document.getElementById("message")
    .innerText = data.message;

    if(data.success){

        window.location.href = "games.html";
    }
}

async function login() {

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    const response = await fetch(
        "http://localhost:3000/api/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username,
                password
            })
        }
    );

    const data = await response.json();

    document.getElementById("message")
    .innerText = data.message;

    if(data.success){

        window.location.href = "games.html";
    }
}