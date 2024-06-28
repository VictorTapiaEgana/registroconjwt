const nombre = document.getElementById('parrafoNombre');
const correo = document.getElementById('parrafoCorreo');

document.addEventListener('DOMContentLoaded',()=>{
    
    const TOKEN = sessionStorage.getItem('token');

    if (TOKEN){

        const datos = window.jwt_decode(TOKEN);       
        nombre.textContent = `NOMBRE: ${datos.nombre.toUpperCase()}`;
        correo.textContent = `COREEO: ${datos.email.toUpperCase()}`;

    }    

});