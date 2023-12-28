const armarCarrito = () => {
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">Carrito.</h1>
    `;
    modalContainer.append(modalHeader);

    const modalboton = document.createElement ("h1");
    modalboton.innerText = "X";
    modalboton.className = "modal-header-button"; 

    modalboton.addEventListener("click" , () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalboton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class="restar"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> + </span>
            <p>Total: ${product.cantidad * product.precio}</p>
            <span class="delete-product"> ❎ </span>

        `;
        modalContainer.append(carritoContent)

        let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => {
            if(product.cantidad !== 1) {
           
            product.cantidad--;
        }
            saveLocal();
            armarCarrito();
        })

        let sumar = carritoContent.querySelector(".sumar")

        sumar.addEventListener("click", () => {
            
            product.cantidad++;
            saveLocal();
            armarCarrito();
        })

        let eliminar = carritoContent.querySelector(".delete-product");

        eliminar.addEventListener("click", () =>{
            eliminarProducto(product.id);
        });
    });
    
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className ="total-content"
    totalCompra.innerHTML = `Total a pagar: ${total} $`; 
    modalContainer.append(totalCompra);
};

verCarrito.addEventListener("click", armarCarrito)

const eliminarProducto = (id) => {
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
    });
    
    carritoCounter();
    saveLocal();
    armarCarrito();
    };

const carritoCounter = () => {
    cantidadCarrito.style.display = "block";

    const carritoLenght = carrito.length;

    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));
};

carritoCounter();