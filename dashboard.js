/* globals Chart:false, feather:false */

(function () {
    'use strict'

    feather.replace()

}())

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: 'http://localhost:3000/order/all',
        dataType: 'json',
    })
        .done(
            $('#example').DataTable()
        )
        .fail(
            $('#example').DataTable()
        )

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
                $('select#kota').append('<option value=' + kota.city_id + '>' + kota.city_name + '</option>');
                $('select#order').append('<option value=' + kota.city_id + '>' + kota.city_name + '</option>')
            });
        })
        .fail(function (err) {
            console.log(err);
        })
})