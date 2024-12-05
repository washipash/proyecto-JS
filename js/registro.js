 // Lista de iconos
 const iconNames = ['ally', 'horda', 'mago', 'healer', 'druida', 'cazador', 'paladin'];

 const iconList = document.getElementById('iconList');
 let iconoSeleccionado = '';

 // Añadir los íconos a la lista
 iconNames.forEach(iconName => {
     const listItem = document.createElement('li');
     listItem.classList.add('icon-item');
     
     const iconImage = document.createElement('img');
     iconImage.src = `./img/iconos/${iconName}.png`;  // Ajusta la ruta de los iconos según sea necesario
     iconImage.alt = iconName;
     
     const iconText = document.createElement('span');
     iconText.textContent = iconName.charAt(0).toUpperCase() + iconName.slice(1);  // Capitaliza el nombre
     
     listItem.appendChild(iconImage);
     listItem.appendChild(iconText);
     iconList.appendChild(listItem);

     // Añadir evento de selección del icono
     listItem.addEventListener('click', function() {
         // Eliminar la selección actual
         const selectedIcon = document.querySelector('.icon-item.selected');
         if (selectedIcon) {
             selectedIcon.classList.remove('selected');
         }

         // Marcar el icono como seleccionado
         listItem.classList.add('selected');
         iconoSeleccionado = iconName;
     });
 });

 function validar() {
     // Obtener valores de los inputs
     const nombre = document.getElementById("nombre").value.trim();
     const correo = document.getElementById("mail").value.trim();
     const pass = document.getElementById("pass").value.trim();
     const rpass = document.getElementById("rpass").value.trim();

     // Validaciones
     if (!nombre || !correo || !pass || !rpass) {
         alert("Por favor, completa todos los campos.");
         return;
     }

     if (!correo.includes("@") || !correo.includes(".")) {
         alert("Ingresa un correo válido.");
         return;
     }

     if (pass !== rpass) {
         alert("Las contraseñas no coinciden.");
         return;
     }

     if (pass.length < 6) {
         alert("La contraseña debe tener al menos 6 caracteres.");
         return;
     }

     // Verificar si el correo ya existe en localStorage
     const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
     const correoExistente = usuarios.some(user => user.correo === correo);

     if (correoExistente) {
         alert("Este correo ya está registrado.");
         return;
     }

     // Verificar si se ha seleccionado un icono
     if (!iconoSeleccionado) {
         alert("Por favor, selecciona un icono de perfil.");
         return;
     }

     // Guardar usuario en localStorage
     const nuevoUsuario = {
         nombre,
         correo,
         contrasena: pass,
         role: "user", // Por defecto, rol de usuario
         icono: iconoSeleccionado // Guardamos el icono seleccionado
     };

     usuarios.push(nuevoUsuario);
     localStorage.setItem("usuarios", JSON.stringify(usuarios));
     alert("Usuario registrado exitosamente.");

     // Redirigir a login.html
     window.location.href = "index.html";
 }