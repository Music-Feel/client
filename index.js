$(document).ready(() => {
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
    if (localStorage.getItem('token')) {
        $('#mainPage').show()
        $('#loginForm').hide()
        $('#registerForm').hide()
        $('#contentDashboard').show()
        //$('#google').hide()
        //$('#todo_form').hide()
        //viewTodoToday() 
    } else {
        //bypass mainpage untuk sementara
        // $('#mainPage').show()
        // $('#registerForm').hide()
        // $('#loginForm').hide()

        $('#registerForm').show()
        $('#loginForm').hide()
        //$('#google').show()
    }
}

function toLogin(event) {
    console.log('ketrigger')
    event.preventDefault()
    $('#loginForm').show()
    $('#registerForm').hide()
}

function toRegister(event) {
    event.preventDefault()
    $('#loginForm').hide()
    $('#registerForm').show()
}

function registerMember(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        url: `http://localhost:3000/register`,
        method: 'POST',
        data: {
            email: email,
            password: password,
        }
    }).done(result => {
        Swal.fire(
            'Register Success!',
            'You have been registered in our web!',
            'success'
        )
        toLogin(event)
    }).fail(err => {
        Swal.fire({
            title: 'error',
            type: 'error',
            text: err.responseJSON.message.join(', ')
        })
    })
}

function loginMember(event) {
    console.log('masuk');
    event.preventDefault()
    let email = $('#email_login').val()
    let password = $('#password_login').val()
    $.ajax({
        url: `http://localhost:3000/login`,
        method: 'POST',
        data: {
            email: email,
            password: password
        }
    })
        .done(data => {
            Swal.fire(
                'Loggin Success!',
                'You are now loggin in our web!',
                'success'
            )
            localStorage.setItem("token", data.token)
            ceckStatus()
        })
        .fail(err => {
            Swal.fire({
                title: 'Ops...',
                type: 'error',
                text: err.responseJSON.message
            })
            //ceckStatus()
        })

}



function fetchDataFilm(page) {
    console.log("fetch data masuk")
    Swal.fire({
        imageUrl: "https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text: 'Calculate your mood...',
        imageUrl:"https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text:'Calculate your feeling...',
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false
    })
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/quote',
        data: {
            text: $("#sentence-emotion").val(),
        }
    })
        .done(function ({ quotes, myEmotion }) {
            //console.log(data)
            displayQuotes(quotes, myEmotion)

            // $("#list-movie").empty()
            // for(let i = 0; i < list.results.length; i++){
            //     renderListMovie(list.results[i].id,list.results[i].title,list.results[i].backdrop_path)
            // }
            // renderListPage(emotion)
        })
        .fail(function (err) {
            console.log(err)
        })
        .always(function () {
            Swal.close()
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
            `<ul class="m-2 rounded" id="${quote._id}">
            <li class="list-group-item py-4 d-flex justify-content-between"> 
                <div>${quote.quoteText}</div>                 
            </li>
            <li class="list-group-item py-4 d-flex justify-content-between"> 
                <div>Author : ${quote.quoteAuthor}</div>                
            </li> 
        </ul>    
        <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=${encodeURI(quote.quoteText)}">
      Tweet</a>  
        `)
        // <div class="d-flex flex-column">
        //             <div class="ml-4">
        //                 <button class='btn' id="${todo._id}" onclick="doneTodo('${todo._id}','${todo.status}', '${day}')"><i class="glyphicon glyphicon-ok id="${todo._id}"></i></button>                         
        //                 <button class='btn' onclick="updateTodo('${todo._id}', '${day}')"><div class="glyphicon glyphicon-edit" id="${todo._id}"></div></button> 
        //                 <button class='btn' onclick="deleteTodo('${todo._id}', '${day}')"><div class="glyphicon glyphicon-trash" id="${todo._id}" ></div></button> 
        //             </div>
        //         </div>
        // if (todo.status == false) {
        //     $(`#bg${todo._id}`).css('background-color', 'red').css('color', 'red')
        // } else {
        //     $(`#bg${todo._id}`).css('background-color', 'green').css('color', 'green')
        // }
    });

          
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
    // $('#click_advance').click(function() {
    //     $('#display_advance').toggle('1000');
    //     $("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    // });
}