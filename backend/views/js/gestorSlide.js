/**
 * Ajustar el espacio de arrastre 
 */

if ( $('#columnasSlide').html() == 0 ) {
    $('#columnasSlide').css({"height": "100px"});
} else {
    $('#columnasSlide').css({"height": "auto"});
}

/**
 * Subir una imagen
 */

$('#columnasSlide').on("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $('#columnasSlide').css({
        "background": "url(views/images/pattern.png)"
    });
});


$('#columnasSlide').on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $('#columnasSlide').css({
        "background": "#fff"
    });

    var archivo = e.originalEvent.dataTransfer.files;
    var img = archivo[0];
    var imgSize = Number(img.size);
    var imgType = String(img.type);

    if ( imgSize > 2500000 ) {
        if ( $(".alert").length > 0 ) {
            return;
        }
        $('#columnasSlide').before('<div class="alert alert-warning"> El archivo excede el peso permitido, 2,5 MB </div>');

        setTimeout(function () {
            $(".alert").remove();
        }, 5000);
        
        return;
    }

    if ( imgType === "image/jpeg" || "image/jpg" || "image/png") {
        $(".alert").remove();
    } else {
        if ( $(".alert").length > 0 ) {
            return;
        }

        $('#columnasSlide').before('<div class="alert alert-warning"> El archivo debe ser formato png o jpg </div>');

        setTimeout(function () {
            $(".alert").remove();
        }, 5000);

        return;
    }

    var datos = new FormData();
    datos.append("img", img);

    $.ajax({
        url: "views/ajax/gestorSlide.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        beforeSend: function () {
            $('#columnasSlide').before('<img src="views/images/status.gif" id="status" class="status">');
        },
        success: function (res) {

            // console.log(res.ruta.slice(6));
            $('.status').remove();
            $('#columnasSlide').css({"height": "auto"});

            if ( res === "0" ) {
                $('#columnasSlide').before('<div class="alert alert-warning"> La imagen es inferior a 1600 x 600 </div>');
            } else {
                $('#columnasSlide').append('<li class="bloqueSlide"><span class="fa fa-times"></span><img src="'+res.ruta.slice(6)+'" class="handleImg"></li>');
                $('#columnasSlide').css({"height": "auto"});
            }
        }
    });

});