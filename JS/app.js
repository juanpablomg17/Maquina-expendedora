// variable que sirve para manipular los atributos del producto
let producto = {
  id: "",
  nombre: "",
  precio: "",
  img: "",
};
// puntero que controla los movimientos del autómata
let puntero = 0;

// array para controlar los estados permitidos
let estados = [];

// controlar conexiones permitidas
let conexiones = [];

let nodes;

// transiciones permitidas, para pintar la tablita de transiciones
// teniendo en cuenta que se va de 500 en 500 barras
let transiciones = {};

// alfabeto permitido
let alfabeto = [500, 1000, 2000, 5000];

$(".pago").prop("disabled", true);
$("#retirar").prop("disabled", true);
$("#btn_comprar").prop("disabled", true);
$("#btn_cancelar").prop("disabled", true);

const generarTablaTransiciones = (
  idProducto,
  valorProducto,
  nombreProducto,
  imgProducto
) => {
  producto.id = idProducto;
  producto.nombre = nombreProducto;
  producto.precio = valorProducto;
  producto.img = imgProducto;

  console.log(producto);
  puntero = 0;
  $("#tabla_transiciones > tbody").empty();
  $("#container-data__price").text(valorProducto);
  $("#container-data__productName").text(nombreProducto);
  $("#btn_cancelar").prop("disabled", false);
  $(".code_products").prop("disabled", true);
  $(".pago").prop("disabled", false);
  $("#data-message__show").text("");

  let filasTabla = [];

  //Para mostrar las filas de la tabla se tienen en cuenta dos cosas. La primera es que las transiciones de la tabla son $500 en $500, puesto es que es el valor más pequeño y la segunda es el valor del producto, dicho valor marcaría el fin del ciclo en este caso y sería el estado final.
  for (i = 0; i <= valorProducto; i += 500) {
    let valoresCelda = [];
    valoresCelda.push(i);
    for (j = 0; j < alfabeto.length; j++) {
      if (i + alfabeto[j] <= valorProducto) {
        valoresCelda.push(i + alfabeto[j]);
      } else {
        valoresCelda.push("-");
      }
    }
    filasTabla.push({
      estado_0: valoresCelda[0],
      estado_500: valoresCelda[1],
      estado_1000: valoresCelda[2],
      estado_2000: valoresCelda[3],
      estado_5000: valoresCelda[4],
    });
  }
  //#ASIGNO LAS FILAS AL ARREGLO DE TRANSICIONES
  transiciones = filasTabla;

  //#LLENO LA TABLA CON LOS DATOS DE LAS TRANSCIONES
  llenarTabla(transiciones);
  mostrarAutomata(transiciones);
};

const mostrarAutomata = (transiciones) => {
  estados = [];
  conexiones = [];
  // llenar los estados del autómata, teniendo en cuenta la tabla
  for (let i = 0; i < transiciones.length; i++) {
    // estado inicial
    if (i == 0) {
      estados.push({
        id: transiciones[i].estado_0,
        label: "" + transiciones[i].estado_0,
        shape: "circle",
        color: {
          background: "#00aaff",
          border: "#00aaff",
          highlight: { background: "#00aaff", border: "#00aaff" },
        },
        size: 23,
        font: {
          size: 23,
          color: "#fff",
        },
      });

      // estado final
    } else if (i == transiciones.length - 1) {
      estados.push({
        id: transiciones[i].estado_0,
        label: "" + transiciones[i].estado_0,
        shape: "circle",
        color: {
          background: "#00244c",
          border: "#00244c",
          highlight: { background: "#00244c", border: "#00244c" },
        },
        size: 23,
        font: {
          size: 23,
          color: "#fff",
        },
      });

      // estados del primero al final - 1
    } else {
      estados.push({
        id: transiciones[i].estado_0,
        label: "" + transiciones[i].estado_0,
        shape: "circle",
        color: {
          background: "#7AC23A",
          border: "#7AC23A",
          highlight: { background: "#7AC23A", border: "#7AC23A" },
        },
        size: 13,
        font: {
          size: 13,
          color: "#fff",
        },
      });
    }
  }

  //relacionar las conexiones con los estados, y se validan que las transiciones sean válidas
  for (let i = 0; i < transiciones.length; i++) {
    if (transiciones[i].estado_500 != "-") {
      conexiones.push({
        from: transiciones[i].estado_0,
        to: transiciones[i].estado_500,
        label: "" + (transiciones[i].estado_500 - transiciones[i].estado_0),
      });
    }

    if (transiciones[i].estado_1000 != "-") {
      conexiones.push({
        from: transiciones[i].estado_0,
        to: transiciones[i].estado_1000,
        label: "" + (transiciones[i].estado_1000 - transiciones[i].estado_0),
      });
    }

    if (transiciones[i].estado_2000 != "-") {
      conexiones.push({
        from: transiciones[i].estado_0,
        to: transiciones[i].estado_2000,
        label: "" + (transiciones[i].estado_2000 - transiciones[i].estado_0),
      });
    }
    if (transiciones[i].estado_5000 != "-") {
      conexiones.push({
        from: transiciones[i].estado_0,
        to: transiciones[i].estado_5000,
        label: "" + (transiciones[i].estado_5000 - transiciones[i].estado_0),
      });
    }
  }

  let options = {
    physics: false,
    autoResize: true,
    height: "100%",
    width: "100%",
    nodes: {
      borderWidth: 2,
      scaling: {
        min: 700,
        max: 1000,
      },
    },
    edges: {
      smooth: false,
      width: 1,
      length: 100,
      color: {
        color: "black",
      },
      arrows: "to",
      font: { size: 15, color: "black", face: "sans" },
    },
    interaction: { hover: false },
  };

  // nodos creados para la librería graficadora
  nodes = new vis.DataSet(estados);

  let container_automata = document.getElementById(
    "container-automata__visual"
  );

  let data = {
    nodes: nodes,
    edges: conexiones,
  };

  let network = new vis.Network(container_automata, data, options);

  recorrerEstados(0);
};

const recorrerEstados = (estado) => {
  //VARIABLE DEL LENGUAJE INGRESADO
  //VARIABLE QUE ME CARGA LOS ESTADO PERMITIDOS POR CADA LENGUAJE
  let estadosValidos = [];

  if (estado == 0) {
    nodes.update([
      { id: estado, color: { background: "#009BFF", border: "#0061FF" } },
    ]);
  }

  if (estado == 500) {
    for (i = 0; i < transiciones.length; i++) {
      if (transiciones[i].estado_500 != "-")
        estadosValidos.push(transiciones[i].estado_500);
    }
    console.log(estadosValidos);
    validarRecorrido(estado, estadosValidos);
  }
  if (estado == 1000) {
    for (i = 0; i < transiciones.length; i++) {
      if (transiciones[i].estado_1000 != "-")
        estadosValidos.push(transiciones[i].estado_1000);
    }
    validarRecorrido(estado, estadosValidos);
  }
  if (estado == 2000) {
    for (i = 0; i < transiciones.length; i++) {
      if (transiciones[i].estado_2000 != "-")
        estadosValidos.push(transiciones[i].estado_2000);
    }
    validarRecorrido(estado, estadosValidos);
  }
  if (estado == 5000) {
    for (i = 0; i < transiciones.length; i++) {
      if (transiciones[i].estado_5000 != "-")
        estadosValidos.push(transiciones[i].estado_5000);
    }
    validarRecorrido(estado, estadosValidos);
  }
};

//validar transiciones dependiendo el lenguaje ingresado
async function validarRecorrido(estado, estadosValidos) {
  puntero += estado;

  //VALIDO QUE EL DINERO INGRESADO POR EL USUARIO ES UN VALIDO DENTRO DE LA COLUMNA DE UN LENGUAJE

  // code para validar que el estado sea válido

  if (estadosValidos.includes(puntero)) {
    nodes.update([
      { id: puntero, color: { background: "#0088CC", border: "#0061FF" } },
    ]);
    if (puntero - estado == 0) {
      nodes.update([
        {
          id: puntero - estado,
          color: { background: "#7AC23A", border: "#7AC23A" },
        },
      ]);
    } else {
      nodes.update([
        {
          id: puntero - estado,
          color: { background: "#7AC23A", border: "#7AC23A" },
        },
      ]);
    }
    $("#container-data__counter").text(puntero);

    // validar si el puntero está en el útimo estado
    if (estadosValidos.length - 1 == estadosValidos.indexOf(puntero)) {
      await listaParaComprar();
    }
  } else {
    puntero = puntero - estado;
    await noListaParaComprar(producto.id, producto.nombre);
  }
}
async function listaParaComprar() {
  $("#btn_comprar").prop("disabled", false);
  $("#data-message__show").text("Bebida lista, presiona en 'Comprar'");
  $(".pago").prop("disabled", true);
}

async function noListaParaComprar(id, productName) {
  $("#data-message__show").css("color", "#FF0000");
  $("#data-message__show").text(
    `¡Dinero rechazado!,supera el precio del producto (` +
      id +
      ` ` +
      productName +
      `)`
  );
  setTimeout(() => {
    $("#data-message__show").css("color", "#fff");
    $("#data-message__show").text("");
  }, 5000);
}

const llenarTabla = (transiciones) => {
  for (i = 0; i < transiciones.length; i++) {
    let tr =
      `<tr>
              <td class="text-center">` +
      transiciones[i].estado_0 +
      `</td>
              <td class="text-center">` +
      transiciones[i].estado_500 +
      `</td>
              <td class="text-center">` +
      transiciones[i].estado_1000 +
      `</td>
              <td class="text-center">` +
      transiciones[i].estado_2000 +
      `</td>
              <td class="text-center">` +
      transiciones[i].estado_5000 +
      `</td>
            </tr>`;
    $("#tabla-transiciones__body").append(tr);
  }
};

const limpiarTabla = () => {
  $("#tabla_transiciones > tbody").empty();
  for (i = 0; i < 5; i++) {
    let tr = `<tr>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
          <td class="text-center">...</td>
        </tr>`;
    $("#tabla-transiciones__body").append(tr);
  }
};

const limpiarAutomata = () => {
  $("#container-automata__visual").empty();
};

const cancelarBebida = () => {
  let cashIngresado = parseInt($("#container-data__counter").text());
  $("#btn_comprar").prop("disabled", true);
  if (cashIngresado > 0) {
    $("#data-message__show").text(
      "$" + $("#container-data__counter").text() + " fueron devueltos"
    );
    setTimeout(() => {
      $("#data-message__show").text("Elige un producto e introduce dinero");
    }, 3000);
  } else {
    $("#data-message__show").text("Transacción cancelada...");
    setTimeout(() => {
      $("#data-message__show").text("Elige un producto e introduce dinero");
    }, 3000);
  }

  $("#container-data__productName").text("Producto");

  $(".code_products").prop("disabled", false);
  $("#container-data__price").text("0");
  $("#container-data__counter").text("0");
  $("#message-show__img").empty();
  $(".pago").prop("disabled", true);
  limpiarTabla();
  limpiarAutomata();

  producto.id = "";
  producto.nombre = "";
  producto.precio = "";
  producto.img = "";
};

const comprarBebida = () => {
  let img =
    `<img src="` +
    producto.img +
    `" alt="product-image" style="width: 50px; height: 50px;"/>`;
  $("#container-data__productName").text("Producto");
  $(".code_products").prop("disabled", false);
  $("#container-data__price").text("0");
  $("#container-data__counter").text("0");
  limpiarTabla();
  limpiarAutomata();

  $("#data-message__show").text("Cargando " + producto.nombre + "...");

  setTimeout(() => {
    $("#data-message__show").text("Listo para retirar");
    $("#message-show__img").append(img);
  }, 3000);

  setTimeout(() => {
    $("#data-message__show").text("");
    $("#message-show__img").empty();
  }, 10000);

  $("#btn_comprar").prop("disabled", true);
  $("#btn_cancelar").prop("disabled", true);
};

// seleccionar bebida
$(".pago").on("click", (e) => {
  let productoVal = parseInt($(e.currentTarget).attr("val"));
  recorrerEstados(productoVal);
});
