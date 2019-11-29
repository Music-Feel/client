$(document).ready(() => {
    ceckStatus()
    $('#toLoginPage').click(toLogin)
    $('#login-button').click(toLogin)
    $('#register-button').click(toRegister)

    $('#register').submit(registerMember)
    $('#login').submit(loginMember)
    $('#logout-button').click(logout)

    $('#form-fetch-data').submit(event => {
        event.preventDefault()
        fetchDataFilm()
    })
    // $('#add-button').click(function(event){
    //     console.log('ini')
    //     $('#todo_form').show()
    //     $('#empty-todo').hide()
    // })

    // // ini form untuk membuat todolist baru
    // $('#todo_form').submit(addTodo)    
    // // todo today
    // $('#today-list').click(function(event){        
    //     event.preventDefault()
    //     viewTodoToday()
    // })
    // //all todo list
    // $('#all-list').click(function(event){        
    //     event.preventDefault()
    //     viewAll()
    // }) 
}) // ini tutup bagian document



function ceckStatus() {
    if (localStorage.getItem('token')) {
        $('#mainPage').show()
        $('#loginForm').hide()
        $('#registerForm').show()
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

function logout() {
    localStorage.removeItem("token")
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    ceckStatus()
    //     console.log('User signed out.');
    // });
}

function fetchDataFilm(page) {
    console.log("fetch data masuk")
    Swal.fire({
        imageUrl: "https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-18.gif",
        text: 'Calculate your mood...',
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
}

function displayQuotes(quotes, myEmotion) {
    $('#quotes-container').append(`
        <h4>It seems that you are ${myEmotion} here are list of quote that might describe your feeling</h4>
    `)
    quotes.forEach(quote => {
        $('#quotes-container').append(
            `<ul class="m-2 rounded" id="${quote._id}">
            <li class="list-group-item py-4 d-flex justify-content-between"> 
                <div>${quote.quoteText}</div>                 
            </li>
            <li class="list-group-item py-4 d-flex justify-content-between"> 
                <div>Author : ${quote.quoteAuthor}</div>                
            </li> 
        </ul>        
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

    // $('#click_advance').click(function() {
    //     $('#display_advance').toggle('1000');
    //     $("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    // });
}