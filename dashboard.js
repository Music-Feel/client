/* globals Chart:false, feather:false */

(function () {
    'use strict'

    feather.replace()

}())

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/order/all',
        headers: {
            token: localStorage.getItem('token')
        },
    })
        .done(function (data) {
            
            $('#example').DataTable()
        })
        .fail(function (error) {
            
        })

    $('.sidebar li a').click(function () {
        $('.sidebar li a').removeClass('active')
        $(this).addClass('active')
        $('main h1').text(this.text.trim())
        switch (true) {
            case ($(this).text().trim() === 'Dashboard'):
                $('#contentDashboard').show()
                $('#contentCheckIn').hide()
                $('#contentTitip').hide()
                break;
            case ($(this).text().trim() === 'Check In'):
                $('#contentDashboard').hide()
                $('#contentCheckIn').show()
                $('#contentTitip').hide()
                break;
            case ($(this).text().trim() === 'Titip Barang'):
                $('#contentDashboard').hide()
                $('#contentCheckIn').hide()
                $('#contentTitip').show()
                break;

            default:
                break;
        }
    });

    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/data-ongkir/kota',
        dataType: 'json',
    })
        .done(function (data) {
            $('select#kota, select#order').empty()
            data.kota.forEach(kota => {
                $('select#kota').append('<option value=' + kota.city_name + '>' + kota.city_name + '</option>');
                $('select#order').append('<option value=' + kota.city_name + '>' + kota.city_name + '</option>')
            });
        })
        .fail(function (err) {
            console.log(err);
        })

    $('#formCheckIn').submit(function (event) {
        event.preventDefault()
        let data = {
            city: $('#kota').val(),
            date: $('#tanggalLiburan').val(),
            sentDate: $('#tanggalPengiriman').val(),
            sentCity: $('#order').val()
        }
        // alert(JSON.stringify(data))

        $.ajax({
            type: "POST",
            url: 'http://localhost:3000/order',
            data: {
                city: $('#kota').val(),
                date: $('#tanggalLiburan').val(),
                sentDate: $('#tanggalPengiriman').val(),
                sentCity: $('#order').val()
            },
            headers: {
                token: localStorage.getItem('token')
            },
            dataType: 'json',
        })
            .done(function (data) {
                Swal.fire(
                    'Check In Success!',
                    'Share This Info!',
                    'success'
                )
                checkLogin()
            })
            .fail(function (err) {
                Swal.fire({
                    title: 'error',
                    type: 'error',
                    text: err.responseJSON.message
                })
            })

    })
})

