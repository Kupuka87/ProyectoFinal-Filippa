const shopContenido = document.getElementById("shopContenido");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product)=> {
    let content = document.createElement("div");
    content.className ="card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="precio">${product.precio} $</p>
    `;

    shopContenido.append(content);

    let comprar = document.createElement ("boton")
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
        const repeat  = carrito.some((repeatProduct) => repeatProduct.id === product.id);

        if(repeat){
                carrito.map((prod) => {
                    if(prod.id === product.id){
                        prod.cantidad++;
            }
        });
        } else {
        carrito.push({
            id : product.id,
            img : product.img,
            nombre : product.nombre,
            precio : product.precio,
            cantidad: product.cantidad,
        });
    }
    carritoCounter();
    saveLocal();
    });
});


/** setear item **/
const saveLocal = () => {

    localStorage.setItem("carrito", JSON.stringify (carrito));

};

/**recuperar item**/

JSON.parse(localStorage.getItem("carrito"));

