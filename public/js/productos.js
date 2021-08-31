const formulario = document.getElementById('createForm');
const inputs = document.querySelectorAll('#createForm input')
console.log('validaciones create')

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,25}$/,
    precio: /^[0-9]{2,6}$/,
    descuento: /^[0-9]{0,2}$/
        /* imagen:  /^[.jpg,.jpeg,.png]$*/
}

const campos = {
    nombre: false,
    precio: false,
    descuento: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {

        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "precio":
            validarCampo(expresiones.precio, e.target, 'precio');
            break;

        case "descuento":
            validarCampo(expresiones.descuento, e.target, 'descuento');
            break;
    }
}
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('input-contenedor-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('input-contenedor-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('input-contenedor-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('input-contenedor-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}



inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario);
});
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.nombre && campos.precio) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});