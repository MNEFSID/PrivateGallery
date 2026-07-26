async function login(){

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

const {data,error} = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
});


if(error){

document.getElementById("message").innerHTML =
"Password atau email salah";

}else{

window.location.href="gallery.html";

}

}