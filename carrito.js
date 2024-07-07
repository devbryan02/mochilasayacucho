let carrito = [];
const carritoBtn = document.querySelector('.carrito-btn');
const modal = document.getElementById('carrito-modal');
const span = document.getElementsByClassName("cerrar")[0];
const carritoItems = document.getElementById('carrito-items');
const carritoTotal = document.getElementById('carrito-total');
const carritoContador = document.getElementById('carrito-contador');
const comprarCarritoBtn = document.getElementById('comprar-carrito');

// Mostrar modal
carritoBtn.onclick = function() {
    modal.style.display = "block";
    actualizarCarritoModal();
}

// Cerrar modal
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Agregar al carrito
document.querySelectorAll('.comprar-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        const nombre = e.target.getAttribute('data-nombre');
        const precio = parseFloat(e.target.getAttribute('data-precio'));
        
        agregarAlCarrito(id, nombre, precio);
    });
});

function agregarAlCarrito(id, nombre, precio) {
    const itemExistente = carrito.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({id, nombre, precio, cantidad: 1});
    }
    
    actualizarCarrito();
}

function actualizarCarrito() {
    carritoContador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
}

function actualizarCarritoModal() {
    carritoItems.innerHTML = '';
    let total = 0;
    
    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
        carritoItems.appendChild(itemElement);
        total += item.precio * item.cantidad;
    });
    
    carritoTotal.textContent = total.toFixed(2);
}

comprarCarritoBtn.onclick = function() {
    alert('¡Gracias por tu compra!');
    carrito = [];
    actualizarCarrito();
    actualizarCarritoModal();
    modal.style.display = "none";
}