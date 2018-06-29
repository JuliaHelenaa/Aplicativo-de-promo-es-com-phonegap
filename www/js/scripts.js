var usuarioDao = new Dao("usuarios");
var prodDao = new Dao("produtos");
var idAtual = -1;
var idLogin = -1;
var usuarios;
var produtos;
var geocoder;
var map;
var marker;
var endereco;

$(document).ready(function () {
    initialize();

    $("#btnAdd").click(function () {
        if (idLogin < 0) {
            idLogin = -1;
            $("#login").show();
            $("#home").hide();
            $("#btnAdd").hide();
            $("#dadosVendedor").hide();
            $("#listaGeral").hide();
            $("#cadastraPromocao").hide();
            $("#perfil").hide();
            $("#btnExcluir").hide();
            $("#cadastro1").hide();
            $("#cadastro1").hide();

        } else {
            $("#login").hide();
            $("#home").hide();
            $("#btnAdd").hide();
            $("#dadosVendedor").hide();
            $("#listaGeral").hide();
            $("#cadastraPromocao").show();
            $("#perfil").hide();
            $("#btnExcluir").hide();
            $("#cadastro1").hide();
            $("#cadastro1").hide();
        }

    });

    $("#btnVolt").click(function () {
        $("#btnAdd").show();
        $("#home").show();
        $("#listaGeral").show();
        $("#login").hide();
        $("#cadastro1").hide();
        $("#cadastro2").hide();
        $("#cadastraPromocao").hide();
        $("#dadosVendedor").hide();
        $("#perfil").hide();

    });

    $("#btnProximo").click(function () {
        if (validaCadastro1() == false) {
            $("#cadastro2").show();
            $("#home").hide();
            $("#login").hide();
            $("#cadastro1").hide();
            $("#listaGeral").hide();
            $("#cadastraPromocao").hide();
            $("#dadosVendedor").hide();
            $("#perfil").hide();
        } else {
            $("#cad1").fadeIn("fast", function (e) { // Exibir o bloco de mensagem de erro
                $("#cad1").delay(1500).fadeOut("fast"); // Depois de exibido, eu dou um tempo de 1,5 segundos e escondo.
            });
        }

    });

    $("#btnSalvar").click(function () {
        if (validaCadastro2() == false) {
            var usuario = {};
            usuario.nome = $("#txtNome").val();
            usuario.email = $("#txtEmail").val();
            usuario.senha = $("#txtSenha").val();
            usuario.telefone = $("#txtTelefone").val();
            usuario.whatsapp = $("#txtWpp").val();
            usuario.endereco = $("#txtEndereco").val();
            usuario.numero = $("#txtNumero").val();
            usuario.bairro = $("#txtBairro").val();
            usuario.cidade = $("#txtCidade").val();


            if (idLogin < 0) {
                usuarioDao.inserir(usuario);
            } else {
                usuarioDao.alterar(idLogin, usuario);
            }
            $("#txtNome").val("");
            $("#txtEmail").val("");
            $("#txtSenha").val("");
            $("#txtTelefone").val("");
            $("#txtWpp").val("");
            $("#txtEndereco").val("");
            $("#txtNumero").val("");
            $("#txtBairro").val("");
            $("#txtCidade").val("");
            $("#home").show();
            $("#btnAdd").show();
            $("#listaGeral").show();
            $("#home").hide();
            $("#login").hide();
            $("#cadastro1").hide();
            $("#cadastro2").hide();
            $("#cadastraPromocao").hide();
            $("#dadosVendedor").hide();
            $("#perfil").hide();
            carregaMenu();
            listarProd();
        } else {
            $("#cad2").fadeIn("fast", function (e) { // Exibir o bloco de mensagem de erro
                $("#cad2").delay(1500).fadeOut("fast"); // Depois de exibido, eu dou um tempo de 1,5 segundos e escondo.
            });
        }




    });

    $("#btnEntrar").click(function () {
        if (validaLogin() == true) {
            $("#home").show();
            $("#btnAdd").show();
            $("#listaGeral").show();
            $("#home").show();
            $("#login").hide();
            $("#cadastro1").hide();
            $("#cadastro2").hide();
            $("#cadastraPromocao").hide();
            $("#dadosVendedor").hide();
            $("#perfil").hide();
            carregaMenu();
            listar();
            listarProd();
        } else {
            $("#resp").fadeIn("fast", function (e) { // Exibir o bloco de mensagem de erro
                $("#resp").delay(1500).fadeOut("fast"); // Depois de exibido, eu dou um tempo de 1,5 segundos e escondo.
            });
        }
        carregaMenu();
            listar();
            listarProd();
        $("#txtEmailLogin").val("");
        $("#txtSenhaLogin").val("");
    });

    $("#btnSalvarProduto").click(function () {
        var produto = {};
        produto.id = idLogin;
        produto.descricao = $("#txtDescricao").val();
        produto.valor = $("#txtValor").val();

        if (idAtual < 0) {
            prodDao.inserir(produto);
        } else {
            prodDao.alterar(idAtual, produto);
        }
        $("#txtDescricao").val("");
        $("#txtValor").val("");
        $("#home").show();
        $("#btnAdd").show();
        $("#home").hide();
        $("#login").hide();
        $("#cadastro1").hide();
        $("#cadastro2").hide();
        $("#listaGeral").show();
        $("#cadastraPromocao").hide();
        $("#dadosVendedor").hide();
        $("#perfil").hide();
        listarProd();
    });

    $("#btnAlterar").click(function () {
        alteraDados(idLogin);

    });

    $("#btnVoltar").click(function () {
        $("#cadastro1").show();
        $("#home").hide();
        $("#login").hide();
        $("#cadastro2").hide();
        $("#listaGeral").hide();
        $("#cadastraPromocao").hide();
        $("#dadosVendedor").hide();
        $("#perfil").hide();

    });

    $("#btnV").click(function(){
        home();
    });
    $("#btnExcluir").click(function () {
        prodDao.excluir(idAtual);
        listar();
        home();
    });
    carregaMenu();
    listar();
    listarProd();
});

function listar() {
    usuarios = usuarioDao.listar();
}
function listarProd() {
    produtos = prodDao.listar();
    $("#listaGeral").html("");
    for (i in produtos) {
        $("#listaGeral").append(
            " <li class='mdl-list__item mdl-list__item--two-line'>" +
            "<span class='mdl-list__item-primary-content'>" +
            "<span>" + produtos[i].descricao + "</span>" +
            "<span class='mdl-list__item-sub-title'>R$ " + produtos[i].valor + "</span>" +
            " </span>" +
            "  <span class='mdl-list__item-secondary-content'>" +
            "<a class='mdl-list__item-secondary-action' href='javascript:carrega(" + produtos[i].id + ")'>" +
            "<i class='fas fa-angle-right'></i>" +
            "</a>" +
            " </span>" +
            " </li>");
    }
}

function minhasPromocoes() {
    produtos = prodDao.listar();
    $("#listaGeral").html("");
    for (i in produtos) {
        if (produtos[i].id == idLogin) {
            $("#listaGeral").append(
                " <li class='mdl-list__item mdl-list__item--two-line'>" +
                "<span class='mdl-list__item-primary-content'>" +
                "<span>" + produtos[i].descricao + "</span>" +
                "<span class='mdl-list__item-sub-title'>R$ " + produtos[i].valor + "</span>" +
                " </span>" +
                "  <span class='mdl-list__item-secondary-content'>" +
                "<a class='mdl-list__item-secondary-action' href='javascript:alteraProduto(" + i + ")'>" +
                "<i class='fas fa-angle-right'></i>" +
                "</a>" +
                " </span>" +
                " </li>");
        }
    }
    $("#btnAdd").show();
    $("#listaGeral").show();
    $("#cadastraPromocao").hide();
    $("#home").show();
    $("#login").hide();
    $("#cadastro1").hide();
    $("#cadastro2").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();
    listar();
}
function validaLogin() {
    usuarios = usuarioDao.listar();
    var email = $("#txtEmailLogin").val();
    var senha = $("#txtSenhaLogin").val();
    var cont = 0;
    for (i in usuarios) {
        if ((usuarios[i].email == email) && (usuarios[i].senha == senha)) {
            cont++;
            idLogin = i;
        }
    }
    if (cont > 0) {
        return true;
    } else {
        return false;
    }
}

function carrega(id) {

    $("#dadosVendedor").show();
    $("#home").hide();
    $("#dados").html("<h5 class='vendedor'>" + usuarios[id].nome + "</h5>" +
        "<br/><i class='fas fa-phone-square'></i>" + usuarios[id].telefone +
        "<br/><i class='fab fa-whatsapp-square'></i>" + usuarios[id].whatsapp);
    endereco = usuarios[id].endereco + "," + usuarios[id].numero + "," + usuarios[id].bairro + "," + usuarios[id].cidade;
    // carregarNoMapa(endereco);

    codeAddress();

}

function initialize() {
    
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 8,
        center: latlng
    }
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function codeAddress() {
    geocoder.geocode({ 'address': endereco }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);
            var marker = new google.maps.Marker({
                map: map,

                position: results[0].geometry.location

            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function carregaMenu() {
    if (idLogin < 0) {
        $("#listMenu").html("<li class='mdl-menu__item'> <a class='link' href='javascript:entrar()'> Entrar</li>");
    } else {
        $("#listMenu").html("<li class='mdl-menu__item'> <a class='link' href='javascript:perfil(" + idLogin + ")'>" + usuarios[idLogin].nome + "</li>" +
            "<li class='mdl-menu__item'> <a class='link'href='javascript:minhasPromocoes()'>Minhas Promoções</li>" +
            "<li class='mdl-menu__item'> <a class='link'href='javascript:sair()'>Sair</li>")
    }
}

function entrar() {
    $("#login").show();
    $("#home").hide();
    $("#cadastro1").hide();
    $("#cadastro2").hide();
    $("#listaGeral").hide();
    $("#cadastraPromocao").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();
    $("#btnAdd").hide();
}

function sair() {
    idLogin = -1;
    $("#cadastro2").hide();
    $("#cadastro1").hide();
    $("#login").hide();
    $("#home").show();
    $("#btnAdd").show();
    $("#listaGeral").show();
    $("#dadosVendedor").hide();
    $("#cadastraPromocao").hide();
    $("#perfil").hide();
    carregaMenu();
    listar();
    listarProd();
}

function alteraDados(id) {
    $("#txtNome").val(usuarios[id].nome);
    $("#txtEmail").val(usuarios[id].email);
    $("#txtSenha").val(usuarios[id].senha);
    $("#txtTelefone").val(usuarios[id].telefone);
    $("#txtWpp").val(usuarios[id].whatsapp);
    $("#txtEndereco").val(usuarios[id].endereco);
    $("#txtNumero").val(usuarios[id].numero);
    $("#txtBairro").val(usuarios[id].bairro);
    $("#txtCidade").val(usuarios[id].cidade);
    $("#home").hide();
    $("#login").hide();
    $("#cadastro1").show();
    $("#cadastro2").hide();
    $("#listaGeral").hide();
    $("#cadastraPromocao").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();

}

function alteraProduto(index) {
    $("#txtDescricao").val(produtos[index].descricao);
    $("#txtValor").val(produtos[index].valor);
    idAtual = index;
    $("btnExcluir").show();
    $("#cadastraPromocao").show();
    $("#btnAdd").hide();
    $("#home").hide();
    $("#login").hide();
    $("#cadastro1").hide();
    $("#cadastro2").hide();
    $("#listaGeral").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();
}

function home() {
    $("#home").show();
    $("#btnAdd").show();
    $("#listaGeral").show();
    $("#login").hide();
    $("#cadastro1").hide();
    $("#cadastro2").hide();
    $("#cadastraPromocao").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();
    carregaMenu();
    listar();
    listarProd();
}

function perfil(id) {
    $("#perfil").show();
    $("#listaGeral").hide();
    $("#dadosPerfil").html("<h6>Nome Comercial: " + usuarios[id].nome + "</p>" +
        "<p>E-mail: " + usuarios[id].email + "</p>" +
        "<p>Telefone: " + usuarios[id].telefone + "</p>" +
        "<p>Whatsapp: " + usuarios[id].whatsapp + "</p>" +
        "<p>Endereço: " + usuarios[id].endereco + "</p>" +
        "<p>Número: " + usuarios[id].numero + "</p>" +
        "<p>Bairro: " + usuarios[id].bairro + "</p>" +
        "<p>Cidade: " + usuarios[id].cidade + "</p>"
    );
    $("#home").hide();
    $("#login").hide();
    $("#cadastro1").hide();
    $("#cadastro2").hide();
    $("#listaGeral").hide();
    $("#cadastraPromocao").hide();
    $("#dadosVendedor").hide();
}


function cadastro() {
    $("#cadastro1").show();
    $("#home").hide();
    $("#login").hide();
    $("#cadastro2").hide();
    $("#listaGeral").hide();
    $("#cadastraPromocao").hide();
    $("#dadosVendedor").hide();
    $("#perfil").hide();
}

function validaCadastro1() {
    var nome = $("#txtNome").val();
    var email = $("#txtEmail").val();
    var senha = $("#txtSenha").val();
    var telefone = $("#txtTelefone").val();
    var whatsapp = $("#txtWpp").val();
    if (nome == "" && email == "" && senha == "" && telefone == "" && whatsapp == "" && usuarios[idLogin].email == email ) {
        return true;
    } else {
        return false;
    }
}

function validaCadastro2() {
    var endereco = $("#txtEndereco").val();
    var numero = $("#txtNumero").val();
    var bairro = $("#txtBairro").val();
    var cidade = $("#txtCidade").val();

    if (endereco == "" && numero == "" && bairro == "" && cidade == "") {
        return true;
    } else {
        return false;
    }
}