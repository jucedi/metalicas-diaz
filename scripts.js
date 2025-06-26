// Espera a que todo el HTML se cargue
document.addEventListener('DOMContentLoaded', function() {

    // --- SELECCIÓN DE ELEMENTOS DEL FORMULARIO ---
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono'); // NUEVO
    const errorNombreDiv = document.getElementById('error-nombre');
    const errorEmailDiv = document.getElementById('error-email');
    const errorTelefonoDiv = document.getElementById('error-telefono'); // NUEVO
    const formulario = document.querySelector('.contact-form form');

    // --- FUNCIÓN PARA VALIDAR EL NOMBRE ---
    function validarNombre() {
        if (nombreInput.value.trim() === '') {
            errorNombreDiv.textContent = 'El campo nombre es obligatorio.';
            nombreInput.classList.add('campo-error');
            return false;
        } else {
            errorNombreDiv.textContent = '';
            nombreInput.classList.remove('campo-error');
            return true;
        }
    }

    // --- FUNCIÓN PARA VALIDAR EL EMAIL ---
    function validarEmail() {
        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoEmail.test(emailInput.value)) {
            errorEmailDiv.textContent = 'Por favor, introduce un email válido.';
            emailInput.classList.add('campo-error');
            return false;
        } else {
            errorEmailDiv.textContent = '';
            emailInput.classList.remove('campo-error');
            return true;
        }
    }

    // --- NUEVA FUNCIÓN PARA VALIDAR EL TELÉFONO ---
    function validarTelefono() {
        // Esta expresión regular permite solo números y una longitud de 7 a 14 dígitos.
        const formatoTelefono = /^\d{7,14}$/;
        const valorTelefono = telefonoInput.value.trim();

        // El campo es opcional, así que solo validamos si el usuario ha escrito algo.
        if (valorTelefono !== '' && !formatoTelefono.test(valorTelefono)) {
            errorTelefonoDiv.textContent = 'Introduce un número de teléfono válido (solo números).';
            telefonoInput.classList.add('campo-error');
            return false;
        } else {
            errorTelefonoDiv.textContent = '';
            telefonoInput.classList.remove('campo-error');
            return true;
        }
    }


    // --- AÑADIR "ESCUCHADORES" DE EVENTOS ---
    if(nombreInput) nombreInput.addEventListener('blur', validarNombre);
    if(emailInput) emailInput.addEventListener('blur', validarEmail);
    if(telefonoInput) telefonoInput.addEventListener('blur', validarTelefono); // NUEVO


    // --- LÓGICA PARA EL ENVÍO DEL FORMULARIO ---
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();

            // Validamos todos los campos una última vez
            const esNombreValido = validarNombre();
            const esEmailValido = validarEmail();
            const esTelefonoValido = validarTelefono(); // NUEVO

            if (esNombreValido && esEmailValido && esTelefonoValido) { // ACTUALIZADO
                alert('¡Formulario listo para enviar!');
                formulario.reset(); 
                
                // Limpiamos todos los posibles errores visuales
                nombreInput.classList.remove('campo-error');
                emailInput.classList.remove('campo-error');
                telefonoInput.classList.remove('campo-error'); // NUEVO
                errorNombreDiv.textContent = '';
                errorEmailDiv.textContent = '';
                errorTelefonoDiv.textContent = ''; // NUEVO
            } else {
                alert('Por favor, corrige los errores antes de enviar.');
            }
        });
    }
});