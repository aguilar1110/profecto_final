// Datos de ejemplo
const productos = [
    { id: 1, nombre: "Vestido de Baño Dos Piezas ALMA", precio: "95.000", imagen: "assets/img/im2.jpg" },
    { id: 2, nombre: "Vestido de Baño Dos Piezas Elena", precio: "110.000", imagen: "assets/img/im5.jpg" },
    { id: 3, nombre: "Vestido de Baño Dos Piezas Renata 3", precio: "95.000", imagen: "assets/img/im7.jpg" },
    { id: 4, nombre: "Vestido de Baño Dos Piezas Julieta", precio: "105.000", imagen: "assets/img/im8.jpg" },
    { id: 5, nombre: "Vestido de Baño una sola pieza Selene", precio: "85.000", imagen: "assets/img/im1.jpg" },
    { id: 6, nombre: "Vestido de Baño una pieza manga larga Leonor", precio: "90.000", imagen: "assets/img/im6.jpg" },
    { id: 7, nombre: "Vestido de Baño Dos Piezas Francesca", precio: "90.000", imagen: "assets/img/im4.jpg" },
    { id: 8, nombre: "Babydoll Nora", precio: "55.000", imagen: "assets/img/im3.jpg" },
    { id: 9, nombre: "Babydoll Valeria", precio: "55.000", imagen: "assets/img/im10.jpg" },
    { id: 10, nombre: "Babydoll Adriana", precio: "55.000", imagen: "assets/img/im9.jpg" },
    { id: 11, nombre: "Piajama En Encaje Rosa Margot", precio: "45.000", imagen: "assets/img/im14.jpg" },
    { id: 12, nombre: "Piajama En satin Rosa Marie", precio: "45.000", imagen: "assets/img/im15.jpg" },
    { id: 13, nombre: "Piajama En Satin Clara", precio: "45.000", imagen: "assets/img/im13.jpg" },
    { id: 13, nombre: "Conjunto de Ropa interior en Encaje Beatrice", precio: "45.000", imagen: "assets/img/im12.jpg" },
];

let carrito = [];

const cardsContainer = document.querySelector(".cards");
const carritoDOM = document.getElementById("carrito");
const totalDOM = document.getElementById("total");
const botonVaciar = document.getElementById("boton-vaciar");

function renderizarProductos() {
    productos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("card", "p-3");

        card.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" 
                style="width: 150px; height: 150px; object-fit: cover; margin: 0 auto;" />
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">Precio: $${producto.precio}</p>
                <button class="btn btn-primary" data-id="${producto.id}">Agregar</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    document.querySelectorAll(".btn-primary").forEach((boton) =>
        boton.addEventListener("click", agregarProducto)
    );
}

function agregarProducto(event) {
    const idProducto = parseInt(event.target.dataset.id);
    const producto = productos.find((prod) => prod.id === idProducto);
    const productoExistente = carrito.find((prod) => prod.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    carritoDOM.innerHTML = "";

    carrito.forEach((producto, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "align-items-center");

        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail" style="width: 50px; margin-right: 10px;" />
            <div>
                <div>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</div>
                <button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button>
            </div>
        `;
        carritoDOM.appendChild(li);

        li.querySelector(".btn-danger").addEventListener("click", eliminarProducto);
    });

    // Calcular total
    const total = carrito.reduce((sum, prod) => sum + parseInt(prod.precio.replace(/\./g, "")) * prod.cantidad, 0);

    // Formatear el total en miles
    const formatter = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    });

    totalDOM.textContent = formatter.format(total);
}

function eliminarProducto(event) {
    const index = parseInt(event.target.dataset.index);

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    actualizarCarrito();
}

botonVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

renderizarProductos();