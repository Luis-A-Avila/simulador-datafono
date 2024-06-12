let currentScreen = 'inicio';
let valorVenta = '';
let valorIVA = '';
let valorInc = '';
let tipoTarjeta = '';
let numCuotas = '';
let tipoCuenta = '';
let pin = '';

function pressButton(value) {
    if (currentScreen === 'inicio') return; // Inhabilitar todas las teclas excepto ENTER en el inicio

    const screen = document.getElementById('screen');
    if (['tipoTarjeta', 'numCuotas', 'tipoCuenta'].includes(currentScreen)) {
        screen.innerText = screen.innerText.split('\n')[0] + '\n' + value; // Cambiar el valor en la pantalla para las selecciones de menú
    } else if (currentScreen === 'pin') {
        if (screen.innerText.split('\n')[1].length < 4) {
            screen.innerText += value; // Agregar el valor a la pantalla para ingresar el PIN
        }
    } else {
        screen.innerText += value; // Agregar el valor a la pantalla para ingresar datos numéricos
    }
}

function cancel() {
    currentScreen = 'inicio';
    resetValues();
    document.getElementById('screen').innerText = 'Bienvenido';
}

function clearLast() {
    if (currentScreen === 'inicio') return; // Inhabilitar CLEAR en el inicio

    const screen = document.getElementById('screen');
    screen.innerText = screen.innerText.slice(0, -1);
}

function enter() {
    const screen = document.getElementById('screen');

    switch (currentScreen) {
        case 'inicio':
            currentScreen = 'valorVenta';
            screen.innerText = 'Valor Venta\n';
            break;
        case 'valorVenta':
            valorVenta = screen.innerText.split('\n')[1].trim();
            currentScreen = 'valorIVA';
            screen.innerText = 'Valor IVA\n';
            break;
        case 'valorIVA':
            valorIVA = screen.innerText.split('\n')[1].trim();
            currentScreen = 'valorInc';
            screen.innerText = 'Valor Inc\n';
            break;
        case 'valorInc':
            valorInc = screen.innerText.split('\n')[1].trim();
            currentScreen = 'resumen';
            screen.innerText = `Venta: ${valorVenta}\nIVA: ${valorIVA}\nInc: ${valorInc}`;
            break;
        case 'resumen':
            currentScreen = 'tipoTarjeta';
            screen.innerText = '¿Tipo de tarjeta?\n1. Crédito\n2. Débito';
            break;
        case 'tipoTarjeta':
            if (screen.innerText.split('\n')[1].includes('1')) {
                tipoTarjeta = 'crédito';
                currentScreen = 'numCuotas';
                screen.innerText = 'Ingrese número de cuotas\n';
            } else if (screen.innerText.split('\n')[1].includes('2')) {
                tipoTarjeta = 'débito';
                currentScreen = 'tipoCuenta';
                screen.innerText = 'Tipo de cuenta\n1. Ahorros\n2. Corriente';
            }
            break;
        case 'numCuotas':
            numCuotas = screen.innerText.split('\n')[1].trim();
            currentScreen = 'transaccionAprobada';
            screen.innerText = `Transacción Aprobada\n${generateRandomNumber(6)}`;
            break;
        case 'tipoCuenta':
            if (screen.innerText.split('\n')[1].includes('1') || screen.innerText.split('\n')[1].includes('2')) {
                tipoCuenta = screen.innerText.split('\n')[1].includes('1') ? 'ahorros' : 'corriente';
                currentScreen = 'pin';
                screen.innerText = 'Ingrese PIN\n';
            }
            break;
        case 'pin':
            if (screen.innerText.split('\n')[1].length === 4) {
                pin = screen.innerText.split('\n')[1].trim();
                currentScreen = 'transaccionAprobada';
                screen.innerText = `Transacción Aprobada\n${generateRandomNumber(6)}`;
            }
            break;
        case 'transaccionAprobada':
            cancel();
            break;
    }
}

function resetValues() {
    valorVenta = '';
    valorIVA = '';
    valorInc = '';
    tipoTarjeta = '';
    numCuotas = '';
    tipoCuenta = '';
    pin = '';
}

function generateRandomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10).toString();
    }
    return result;
}
