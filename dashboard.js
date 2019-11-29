/* globals Chart:false, feather:false */

(function () {
    'use strict'

    feather.replace()

}())

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: '/test.php',
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
})