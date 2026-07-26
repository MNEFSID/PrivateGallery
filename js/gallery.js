async function checkUser(){

    const {data} = await supabaseClient.auth.getUser();

    if(!data.user){
        window.location.href = "index.html";
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

        return;

    }


    alert("Foto berhasil upload");


    loadPhotos();

}







async function loadPhotos(){


    const {data,error}=await supabaseClient
    .storage
    .from("gallery")
    .list();



    if(error){

        console.log(error);

        return;

    }



    let html="";



    if(data.length===0){

        html="<p>Belum ada foto</p>";

        document.getElementById("gallery").innerHTML=html;

        return;

    }





    data.forEach(file=>{


        html += `

        <div class="photo-card">


            <img 
            id="img-${file.name}"
            src=""
            >


            <br>


            <button onclick="downloadPhoto('${file.name}')">

            ⬇ Download

            </button>


        </div>

        `;



    });



    document.getElementById("gallery").innerHTML=html;



    data.forEach(file=>{

        loadImage(file.name);

    });



}






async function loadImage(name){


    const {data,error}=await supabaseClient
    .storage
    .from("gallery")
    .createSignedUrl(name,60);



    if(error){

        console.log(error);

        return;

    }



    const img=document.getElementById("img-"+name);



    if(img){

        img.src=data.signedUrl;

    }


}








async function downloadPhoto(name){


    const {data,error}=await supabaseClient
    .storage
    .from("gallery")
    .createSignedUrl(name,60);



    if(error){

        alert(error.message);

        return;

    }



    const link=document.createElement("a");


    link.href=data.signedUrl;


    link.download=name;


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


}







loadPhotos();
