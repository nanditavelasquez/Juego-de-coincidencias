var juego = (function() {

	var cantidad_vidas = 5,
	cartas = [1,2,3,4,5,6],
	baraja_uno, baraja_dos,

	crear_cartas = function() {
		try {
			var contenedor = document.querySelector(".contenedor");
			var item_html = '<div class="item" onclick="juego.accion_click(this)" data-baraja="{baraja}" data-indice="{indice}"></div>';		
			baraja_uno = distribuir_cartas(cartas);
			baraja_dos = distribuir_cartas(cartas);

			var cartas_html = "";
			for (var i = 0; i < cartas.length; i++) {
				cartas_html += item_html.replace("{baraja}", 1).replace("{indice}", baraja_uno[i]);
				cartas_html += item_html.replace("{baraja}", 2).replace("{indice}", baraja_dos[i]);
			}
			contenedor.innerHTML = cartas_html;

		}
		catch(error) {
			console.log(error);
		}
	}, 

	accion_click = function(element) {
		try {
			var cartas_activas = document.querySelectorAll(".sin-fondo-item");

			if(cartas_activas.length == 2) {
				for (var i = 0; i <  cartas_activas.length; i++) {
					cartas_activas[i].classList.remove("sin-fondo-item");
					cartas_activas[i].innerHTML = "";
				}
				quitar_vida();
			} 

			if (cartas_activas.length == 1) {
				if(cartas_activas[0].dataset.indice == element.dataset.indice 
					&& cartas_activas[0].dataset.baraja != element.dataset.baraja) {
					element.innerHTML = "<span class='numero-carta'>" + element.dataset.indice + "</span>";
					cartas_activas[0].classList.remove("sin-fondo-item");
					cartas_activas[0].classList.add("checked-item"); 
					element.classList.add("checked-item"); 
				} else {
					element.classList.add("sin-fondo-item");
					element.innerHTML = "<span class='numero-carta'>" + element.dataset.indice + "</span>";
				}
			} else {
				element.classList.add("sin-fondo-item");
				element.innerHTML = "<span class='numero-carta'>" +  element.dataset.indice + "</span>";
			}
			if(document.querySelectorAll(".checked-item").length == (cartas.length * 2)) {
				var mensaje = document.querySelector("#contenedor-mensaje-victoria");
				if (mensaje.classList.contains("ocultar-mensaje")) {
					mensaje.classList.remove("ocultar-mensaje");
				}
			}
		}
		catch(error) {
			console.log(error);
		}
	},

	quitar_vida = function() {
		try {
			if (cantidad_vidas == 1 ) {
				var mensaje = document.querySelector("#contenedor-mensaje-derrota");
				if (mensaje.classList.contains("ocultar-mensaje")) {
					mensaje.classList.remove("ocultar-mensaje");
				}
			} 
			document.querySelector(".contenedor-vidas").querySelectorAll("img")[0].remove();
			--cantidad_vidas;
		}
		catch(error) {
			console.log(error);
		}
	}, 

	distribuir_cartas = function(arr) {
		try {
			var i, j, temp;
			for (i = arr.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
			
			return new Array().concat(arr); 
		}
		catch(error) {
			console.log(error);
		}
	}

	inicializar_hora = function() {
		try {
			hora_actual = new Date();
			hora = hora_actual.getHours();
			minuto = hora_actual.getMinutes();
			segundo = hora_actual.getSeconds();
			var spans = document.querySelector(".contenedor-hora")
			.querySelectorAll("span");
			spans[0].innerHTML = hora;
			spans[1].innerHTML = minuto;
			spans[2].innerHTML = segundo;
			setTimeout(inicializar_hora, 1000);
		}
		catch(error) {
			console.log(error);
		}
	},

	init = function() {
		try {
			inicializar_hora();
			crear_cartas();
			var botones = document.querySelectorAll(".btn");
			for (var i = 0; i < botones.length; i++) {
				botones[i].addEventListener('click', function() { 
					location.reload(true);
				}, false);
			}
		}
		catch(error) {
			console.log(error);
		}
	};

	return {
		init: init,
		accion_click: accion_click
	}
})();


window.onload = juego.init();