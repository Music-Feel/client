$(document).ready( () => {
    ceckStatus()         
    $('#toLoginPage').click(toLogin)
    $('#login-button').click(toLogin)    
    $('#register-button').click(toRegister)
    
    $('#register').submit(registerMember)
    $('#login').submit(loginMember)
    $('#logout-button').click(signOut)

    $('#form-fetch-data').submit(event => {
        event.preventDefault()
        fetchDataFilm()
    })

}) // ini tutup bagian document



function ceckStatus() {
    if(localStorage.getItem('token')){
        $('#mainPage').show()
        $('#loginForm').hide()
        $('#registerForm').hide() 
        $('#login-button').hide()  
        $('#register-button').hide()
        $('#logout-button').show()

        //$('#google').hide()
        //$('#todo_form').hide()
        //viewTodoToday() 
    } else {
        $('#registerForm').show()
        $('#mainPage').hide()
        $('#loginForm').hide()
        //$('#google').show()
        $('#login-button').show()  
        $('#register-button').show()
        $('#logout-button').hide()        
    } 
}

function toLogin(event) {
    console.log('ketrigger')
    event.preventDefault()
    $('#loginForm').show() 
    $('#registerForm').hide() 
    $('#mainPage').hide()

}

function toRegister(event) {
    event.preventDefault()
    $('#loginForm').hide() 
    $('#registerForm').show()
    $('#mainPage').hide()

}

function registerMember(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url : `http://localhost:3000/register`,
        method : 'POST',
        data : {
            email : email,
            password : password,
        }
    }).done( result => {
        Swal.fire(
            'Register Success!',
            'You have been registered in our web!',
            'success'
          )
          toLogin(event)
    }).fail( err => {
        Swal.fire({
            title: 'error',
            type: 'error',
            text: err.responseJSON.message.join(', ')
        })
    })    
}

function loginMember(event) {
event.preventDefault()        
let email = $('#email_login').val()
let password = $('#password_login').val()
$.ajax({
    url : `http://localhost:3000/login`,
    method : 'POST',
    data : {
        email : email,
        password : password
    }
})
.done( data => {
    Swal.fire(
        'Loggin Success!',
        'You are now loggin in our web!',
        'success'
        )
    localStorage.setItem("token", data.token)
    ceckStatus()   
})
.fail( err => {
    Swal.fire({
        title: 'Ops...',
        type: 'error',
        text: err.responseJSON.message
    })
})    
}



function fetchDataFilm (page) {
    console.log("fetch data masuk")
    Swal.fire({
        imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text:'Calculate your feeling...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
    })    
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/quote',
        data:{
            text: $("#sentence-emotion").val(),
        }
    })
    .done(function({quotes, myEmotion}){
        displayQuotes(quotes, myEmotion)
    })
    .fail(function(err){
        console.log(err)
    })
    .always(function(){
        Swal.close()
    })
}

function displayQuotes(quotes, myEmotion) {
    let emotions = {
        happy: 'yellow',
        sad: 'grey',
        angry: 'red',
        fear: 'black',
        excited: 'blue',
        indifferent: 'purple'
    }
    $('#quotes-container').empty()
    $('#quotes-container').append(`
        <h4>It seems that you are <strong style="color:${emotions[myEmotion]}; font-family: 'Carter One', cursive;">${myEmotion}</strong> here are list of quote that might describe your feeling</h4>
    `)
    quotes.forEach(quote => {
        console.log(quote)
        let author = ''
        if(quote.quoteAuthor === ''){
            author = 'Author: Pemuja Rahasia'
        }else{
            author = `Author: ${quote.quoteAuthor}`
        }
        $('#quotes-container').append(
          
    `<div class="card mt-5">
    <h5 class="card-header">${author}</h5>
    <div class="card-body">
      <p class="card-text" style="font-family: 'Merienda One', cursive;">${quote.quoteText}</p>
      <a class="twitter-share-button"
         href="https://twitter.com/intent/tweet?text=${encodeURI(quote.quoteText)}">
       Tweet</a>  
    </div>
  </div>`
    )

    });
    
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(profile)
    $('#user-image').attr("src", profile.Paa);
    $('#user-title').empty()
    $('#user-title').append(`<li class="list-group-item pl-1" id="user-title">${profile.ig}</li>`)
    $('#user-email').empty()
    $('#user-email').append(`<li class="list-group-item pl-1" id="user-title">${profile.U3}</li>`)
    $.ajax({
        url : `http://localhost:3000/login-google`,
        method : "POST",
        data : {
            google_token : id_token
        }
    })
    .done( data => {
        localStorage.setItem("token", data.token)
        ceckStatus()
    })
    .fail(err=> {
        console.log(err)
    })
}

function signOut() {
    localStorage.removeItem("token")
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        ceckStatus()
        console.log('User signed out.');
    });
}