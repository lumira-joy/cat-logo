/* =========================================================
   CARRITO LUMIRA
========================================================= */


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const WHATSAPP =
    "5493644612639";


const INSTAGRAM_DM =
    "https://www.instagram.com/direct/t/17845489119540327/";



/* =========================================================
   OBTENER CARRITO
========================================================= */

function obtenerCarrito() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "lumiraCarrito"
            )
        ) || [];

    }

    catch (error) {

        return [];

    }

}



/* =========================================================
   GUARDAR CARRITO
========================================================= */

function guardarCarrito(
    carrito
) {

    localStorage.setItem(
        "lumiraCarrito",
        JSON.stringify(carrito)
    );

}



/* =========================================================
   PRECIO FINAL
========================================================= */

function obtenerPrecioFinal(
    producto
) {

    const precio =
        Number(
            producto.precio
        );


    const descuento =
        Number(
            producto.descuento || 0
        );


    return (
        precio *
        (
            1 -
            descuento / 100
        )
    );

}



/* =========================================================
   MOSTRAR CARRITO
========================================================= */

function mostrarCarrito() {


    const carrito =
        obtenerCarrito();


    const lista =
        document.getElementById(
            "lista-carrito"
        );


    const resumen =
        document.getElementById(
            "resumen-carrito"
        );



    lista.innerHTML = "";

    resumen.innerHTML = "";



    /* ========================================================
       CARRITO VACÍO
    ======================================================== */

    if (
        carrito.length === 0
    ) {


        lista.innerHTML = `

            <div class="carrito-vacio">

                <div
                    class="carrito-vacio-icono"
                >
                    🛍️
                </div>

                <h2>
                    Tu selección está vacía
                </h2>

                <p>
                    Todavía no agregaste
                    ningún producto.
                </p>

            </div>

        `;


        return;

    }



    /* ========================================================
       PRODUCTOS
    ======================================================== */

    let total = 0;



    carrito.forEach(
        producto => {


            const precioOriginal =
                Number(
                    producto.precio
                );


            const descuento =
                Number(
                    producto.descuento || 0
                );


            const precioFinal =
                obtenerPrecioFinal(
                    producto
                );


            const cantidad =
                Number(
                    producto.cantidad || 1
                );


            total +=
                precioFinal *
                cantidad;



            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "item-carrito"
            );



            /* =================================================
               IMAGEN
            ================================================= */

            const imagen =
                producto.imagen ||
                "images/sin-imagen.jpg";



            /* =================================================
               PRECIO HTML
            ================================================= */

            let precioHTML = "";



            if (
                descuento > 0
            ) {

                precioHTML = `

                    <span
                        class="item-precio-original"
                    >
                        $${precioOriginal.toLocaleString("es-AR")}
                    </span>

                    <br>

                    <span
                        class="item-precio"
                    >
                        $${precioFinal.toLocaleString("es-AR")}
                    </span>

                    <span
                        class="item-descuento"
                    >
                        ${descuento}% OFF
                    </span>

                `;

            }

            else {

                precioHTML = `

                    <span
                        class="item-precio"
                    >
                        $${precioFinal.toLocaleString("es-AR")}
                    </span>

                `;

            }



            /* =================================================
               ELEMENTO
            ================================================= */

            item.innerHTML = `

                <div class="item-imagen">

                    <img
                        src="${imagen}"
                        alt="${producto.nombre}"
                    >

                </div>


                <div class="item-info">

                    <h2>
                        ${producto.nombre}
                    </h2>

                    <div>

                        ${precioHTML}

                    </div>

                    <small>
                        Cantidad: ${cantidad}
                    </small>

                </div>


                <button
                    class="item-eliminar"
                    onclick="eliminarProducto(${producto.id})"
                    aria-label="Eliminar producto"
                >
                    ×
                </button>

            `;



            lista.appendChild(
                item
            );

        }
    );



    /* ========================================================
       RESUMEN
    ======================================================== */

    resumen.innerHTML = `

        <div class="resumen-linea">

            Productos:
            
            <strong>
                ${carrito.length}
            </strong>

        </div>


        <div
            class="resumen-total"
        >

            Total estimado:

            $${total.toLocaleString("es-AR")}

        </div>

    `;

}



/* =========================================================
   ELIMINAR PRODUCTO
========================================================= */

function eliminarProducto(
    id
) {


    let carrito =
        obtenerCarrito();


    carrito =
        carrito.filter(
            producto =>
                producto.id !== id
        );


    guardarCarrito(
        carrito
    );


    mostrarCarrito();

}



/* =========================================================
   CREAR MENSAJE
========================================================= */

function crearMensaje() {


    const carrito =
        obtenerCarrito();


    let mensaje =
        "Hola Lumira! \n\n";


    mensaje +=
        "Quisiera consultar por estos productos:\n\n";


    let total = 0;



    carrito.forEach(
        producto => {


            const precioOriginal =
                Number(
                    producto.precio
                );


            const descuento =
                Number(
                    producto.descuento || 0
                );


            const precioFinal =
                obtenerPrecioFinal(
                    producto
                );


            const cantidad =
                Number(
                    producto.cantidad || 1
                );


            total +=
                precioFinal *
                cantidad;



            mensaje +=
                `• ${producto.nombre}`;


            mensaje +=
                ` x${cantidad}`;


            mensaje +=
                ` — $${precioFinal.toLocaleString("es-AR")}`;



            if (
                descuento > 0
            ) {

                mensaje +=
                    ` (${descuento}% OFF)`;

            }


            mensaje +=
                "\n";

        }
    );



    mensaje +=
        `\nTotal estimado: $${total.toLocaleString("es-AR")}`;


    mensaje +=
        "\n\n¿Podrían decirme si están disponibles? ";


    return mensaje;

}



/* =========================================================
   WHATSAPP
========================================================= */

function enviarWhatsApp() {


    const carrito =
        obtenerCarrito();


    if (
        carrito.length === 0
    ) {

        alert(
            "Tu selección está vacía."
        );

        return;

    }



    const mensaje =
        crearMensaje();



    const url =
        "https://wa.me/" +
        WHATSAPP +
        "?text=" +
        encodeURIComponent(
            mensaje
        );



    window.open(
        url,
        "_blank"
    );

}



/* =========================================================
   INSTAGRAM
========================================================= */

async function copiarMensajeInstagram() {


    const carrito =
        obtenerCarrito();


    if (
        carrito.length === 0
    ) {

        alert(
            "Tu selección está vacía."
        );

        return;

    }



    const mensaje =
        crearMensaje();



    try {


        await navigator.clipboard.writeText(
            mensaje
        );


        alert(
            "¡Mensaje copiado! 💕\n\nAhora podés pegarlo en el chat de Instagram."
        );


        window.open(
            INSTAGRAM_DM,
            "_blank"
        );


    }

    catch (error) {


        alert(
            "No se pudo copiar automáticamente. Podés copiar el mensaje manualmente."
        );


        window.open(
            INSTAGRAM_DM,
            "_blank"
        );

    }

}



/* =========================================================
   INICIAR
========================================================= */

mostrarCarrito();