async function register(){

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/register", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    document.getElementById("message").innerText = data.message;

    if(data.success){
        window.location.href = "/games";
    }
}

async function login(){

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/api/auth/login", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    document.getElementById("message").innerText = data.message;

    if(data.success){
        window.location.href = "/games";
    }
}
