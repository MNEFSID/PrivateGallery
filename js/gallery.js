async function checkUser(){

const {data} = await supabaseClient.auth.getUser();

if(!data.user){
    window.location.href="index.html";
}

}

checkUser();



async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}



async function uploadPhoto(){

const file = document.getElementById("fileInput").files[0];

if(!file){
    alert("Pilih foto dulu");
    return;
}


let filename = Date.now()+"-"+file.name;


const {error} = await supabaseClient
.storage
.from("gallery")
.upload(filename,file);


if(error){

alert(error.message);

}else{

alert("Foto berhasil upload");

loadPhotos();

}

}



async function loadPhotos(){

const {data,error}=await supabaseClient
.storage
.from("gallery")
.list();


if(error) return;


let html="";


data.forEach(file=>{

let url = supabaseClient
.storage
.from("gallery")
.getPublicUrl(file.name).data.publicUrl;


html += `

<div>
<img src="${url}" width="200">

<br>

<a href="${url}" download>
Download
</a>

</div>

`;

});


document.getElementById("gallery").innerHTML=html;

}


loadPhotos();
