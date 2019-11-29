$(document).ready( () => {
    ceckStatus()         
    $('#toLoginPage').click(toLogin)
    $('#login-button').click(toLogin)    
    $('#register-button').click(toRegister)
    
    $('#register').submit(registerMember)
    $('#login').submit(loginMember)
    $('#logout-button').click(logout)
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

function logout() {
    localStorage.removeItem("token")
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
        ceckStatus()   
    //     console.log('User signed out.');
    // });
}