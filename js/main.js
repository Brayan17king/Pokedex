// Seleccionamos el elemento HTML con la ID "listaPokemon" y lo almacenamos en la variable `listaPokemon`.
const listaPokemon = document.querySelector("#listaPokemon");

// Seleccionamos todos los elementos HTML con la clase "btn-header" y los almacenamos en la variable `botonesHeader`.
const botonesHeader = document.querySelectorAll(".btn-header");

// Declaramos una variable `URL` y le asignamos la URL base para la PokéAPI.
let URL = "https://pokeapi.co/api/v2/pokemon/";


// Bucle que se repite 151 veces, una vez por cada uno de los 151 primeros Pokémon.
for (let i = 1; i <= 151; i++) {

    // Llamamos a la función `fetch` con la URL construida concatenando la URL base con el número de iteración actual del bucle.
    fetch(URL + i)

        // Convertimos la respuesta de la obtención de datos a formato JSON.
        .then((response) => response.json())

        // Pasamos los datos JSON analizados a la función `mostrarPokemon`.
        .then(data => mostrarPokemon(data));
}


// Función que toma un objeto Pokémon como entrada y muestra su información.
function mostrarPokemon(poke) {

    // Extraemos los tipos del Pokémon de los datos y creamos una matriz de fragmentos de código HTML que representan los tipos.
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);

    // Combinamos todos los fragmentos HTML de tipo individual en una sola cadena.
    tipos = tipos.join('');

    // Convertimos el ID del Pokémon a una cadena y anteponemos ceros a la izquierda si es necesario.
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Creamos un nuevo elemento HTML de tipo "div" y le asignamos la clase "pokemon".
    const div = document.createElement("div");
    div.classList.add("pokemon");

    // Establecemos el contenido HTML interno del elemento `div` con una plantilla literal que incluye varios marcadores de posición para los datos del Pokémon.
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
            ${tipos}
            </div>
            <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    // Agregamos el elemento `div` recién creado al elemento `listaPokemon`.
    listaPokemon.append(div);
}

// Función para agregar un detector de eventos "click" a cada botón
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    // Obtiene el ID del botón que se ha hecho clic
    const botonId = event.currentTarget.id;

     // Limpia el contenido del elemento donde se muestra la lista de Pokémon
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
         // Busca la información del Pokémon número i de la PokéAPI
        fetch(URL + i)
            .then((response) => response.json()) // Convierte la respuesta a formato JSON
            .then(data => {

                // Si el botón clicado es "ver-todos", muestra todos los Pokémon
                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    // Si el botón no es "ver-todos", comprueba si el Pokémon actual
                    // tiene alguno de los tipos indicados en el ID del botón
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }
            })
    }
}))