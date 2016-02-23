var chatHub;
var miNombre;
$(document).ready(function() {
    chatHub = $.connection.hubChat;
    registrarEventos();

    $.connection.hub.start().done(function() {
        registrarLlamadas();
        bootbox.prompt("¿Cómo te llamas?", function(res) {
            if (res != null) {
                miNombre = res;
                chatHub.server.conectar(miNombre);
            }
        });
    });
});

function registrarLlamadas() {
    $("btnEnviar").click(function() {
        var txt = $("#txtMens").val();
        chatHub.server.enviarMensaje(miNombre, txt);  // enviarMensaje tiene que escribirse así, y no EnviarMesanje porque las funciones empiezan por minúscula y las clases en mayúscula.
    });
}


// Clients.Caller.onConectado(usuario.Id, nombre, Usuarios, Mensajes
// Clients.AllExcept(usuario.Id).onNuevoConectado(usuario.Id,nombre);

function registrarEventos() {
    chatHub.client.onConectado = function(id, nombre, usuarios, mensajes) {
        $.each(usuarios, function(key, obj) {
            var elem = "<li id='us-" + obj.Id + "'> " + obj.nombre + ">/li>";
            $("#conetados").append(elem);
        });
        $.each(mensajes, function(key, obj) {
            var elem = "<p>" + obj.Usuario + "dice" + obj.Contenido + "</p>";
            $("#mensajes").append(elem);
        });
    };

    chatHub.client.onNuevoConectado = function(id, nombre) {
        var elem = "<li id='us-" + Id + "'> " + nombre + ">/li>";
        $("#conetados").append(elem);
        $("#mensajes").append("<p>Se ha conectado" + nombre + "</p>");
    };

    chatHub.client.enviadoMensaje = function(usuario, mensaje) {
        var elem = "<p>" + usuario + "dice" + mensaje + "</p>";
        $("#mensajes").append(elem);
    };

    chatHub.client.usuarioDesconectado = function(id, nombre) {
        var item = $("#us-" + id);
        $("#conectados").remove();
        var elem = "<p>" + nombre + " se ha desconectado</p>";
        $("#mensajes").append(elem);

    };
}
