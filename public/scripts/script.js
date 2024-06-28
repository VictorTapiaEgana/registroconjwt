const nombre = document.getElementById('lnombre');
const password = document.getElementById('lpassword');
const btn = document.getElementById('btnLogin')
const ErrorMsg = document.getElementById('errorMsj');

btn.onclick = (e) =>{    
    
    e.preventDefault();

    fetch('/login',{
        method : 'POST',        
        headers: {"Content-type": "application/json;charset=UTF-8"},
        body: JSON.stringify({
                              nombre:nombre.value,
                              password:password.value
                             }
                            )
    })    

    .then(response => response.json())
    .then(data => {
        
        if (data.status.length > 100){
                   
            sessionStorage.setItem('token', data.status)

            nombre.value = '';
            password.value = '';

            // window.location.href ='/dashboard'

            const TOKEN = sessionStorage.getItem('token');

            fetch('/dashboard',{
                                method:'GET',
                                headers: { 'Authorization': `Bearer ${TOKEN}`}
            })
            .then(response => {

                if (response.ok) {         

                      window.location.href = './dashboard.html';
                }
                
            })                        
            .catch(error => {

                console.error('Error:', error);               

            });

        } else {

            ErrorMsg.textContent = data.status.toUpperCase();

        }

    })
};