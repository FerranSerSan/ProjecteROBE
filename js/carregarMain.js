let yaRegistrat = false;

// objecte usuari
class Usuari {
  constructor(
    idUsuari = 9999,
    nomUsuari = "per defecte",
    correuUsuari = "per defecte",
    rol = "usuari"
  ) {
    this.idUsuari = idUsuari;
    this.nomUsuari = nomUsuari;
    this.correuUsuari = correuUsuari;
    this.rol = rol;
  }
}

const usuariProvisional = new Usuari();

window.usuariActual = usuariProvisional;

window.onload = function () {
  // objecte publicacio, i publicacio manager
  class Publicacio {
    constructor(id = 0, t = "per defecte", estat = false, idUser = 0) {
      this.id = id;
      this.text = t;
      this.estat = estat;
      this.idUser = idUser;
    }

    ocultar() {
      this.estat = false;
      // actualizar en la base de datos
      ocultarPublicacions(this.id);
    }
  }

  class PublicacioManager {
    constructor() {
      this.publicacions = [];
    }

    addPublicacio(id, text, estat, idUser) {
      // per a que no es dupliquen
      var crear = true;
      for (var i = 0; i < this.publicacions.length; i++) {
        if (
          this.publicacions[i].text == text &&
          this.publicacions[i].idUser == idUser
        )
          crear = false;
      }
      if (crear) {
        const publicacioAux = new Publicacio(id, text, estat, idUser);
        this.publicacions.push(publicacioAux);
      }
      this.renderPublicacions();
    }

    togglePublicacio(id) {
      const publicacio = this.publicacions.find((p) => p.id === id);
      if (publicacio) publicacio.ocultar();
      this.renderPublicacions();
    }

    renderPublicacions() {
      const divPublicacions = document.getElementById("DivPublicacions");
      if (!divPublicacions) return;
      divPublicacions.innerHTML = "";

      if (yaRegistrat) {
        const DivCampText = document.getElementById("DivCampText");

        fetch("introduirPublicacio.html")
          .then((response) => response.text())
          .then((html) => {
            document.getElementById("carregarCampText").innerHTML = html;

            const formPublicar = document.querySelector(".formPublicar");
            if (formPublicar) {
              formPublicar.addEventListener("submit", function (e) {
                e.preventDefault();

                const contingutElement =
                  document.getElementById("enviarPublicacio");
                const contingut = contingutElement.value;

                enviarPublicacioBBDD(contingut);
              });
            }
          });
      }

      this.publicacions.forEach((publicacio) => {
        if (publicacio.estat == true) {
          // Crear els asides
          var pnom = document.createElement("p");
          var p = document.createElement("p");
          p.textContent = publicacio.text;

          let nomUsuari = " ";
          if (window.usuarisArray && Array.isArray(window.usuarisArray)) {
            const usuariTrobat = window.usuarisArray.find(
              (usuari) => usuari.idUsuari == publicacio.idUser
            );
            if (usuariTrobat) {
              nomUsuari = usuariTrobat.nomUsuari;
            }
          }
          pnom.textContent = "usuario: " + nomUsuari;
          var buttonGroup = document.createElement("div");

          var ocultar = document.createElement("button");
          ocultar.classList.add("btn-ocultar");
          ocultar.textContent = "ocultar";
          ocultar.onclick = () => this.togglePublicacio(publicacio.id);

          // soles si el usuari actual te el rol de admin
          if (usuariActual.rol == "admin") {
            buttonGroup.appendChild(ocultar);
          }
          p.appendChild(buttonGroup);

          if (divPublicacions) {
            var aside = document.createElement("aside");
            var h3 = document.createElement("h3");
            h3.textContent = "¿SABIAS QUE?...";
            aside.appendChild(h3);
            aside.appendChild(pnom);
            aside.appendChild(p);
            divPublicacions.appendChild(aside);
          }
        }
      });
    }
  }
  window.publicacionsManager = new PublicacioManager();

  // els botons del nav
  var BtnInici = document.getElementById("BtnInici");
  var BtnHorari = document.getElementById("BtnHorari");
  var BtnContacte = document.getElementById("BtnContacte");
  var BtnVideo = document.getElementById("BtnVideo");
  var BtnLogin = document.getElementById("BtnLogin");
  var BtnInSe = document.getElementById("BtnInSe");
  var formPublicar = document.querySelector(".formPublicar");

  BtnLogin.style.display = "none";

  // per a cambiar el contingut del main (INICI)
  if (BtnInici) {
    BtnInici.addEventListener("click", function (e) {
      BtnLogin.style.display = "none";
      e.preventDefault();
      fetch("inici.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
          extraurerUsuaris();
          updateDatatable();
        });
    });
  }
  // per a cambiar el contingut del main (HORARI)
  if (BtnHorari) {
    BtnHorari.addEventListener("click", function (e) {
      BtnLogin.style.display = "none";
      e.preventDefault();
      fetch("horari.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
        });
    });
  }
  // per a cambiar el contingut del main (CONTACTE)
  if (BtnContacte) {
    BtnContacte.addEventListener("click", function (e) {
      BtnLogin.style.display = "none";
      e.preventDefault();
      fetch("contacte.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
        });
    });
  }
  // per a cambiar el contingut del main (VIDEOS)
  if (BtnVideo) {
    BtnVideo.addEventListener("click", function (e) {
      BtnLogin.style.display = "none";
      e.preventDefault();
      fetch("videos.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
        });
    });
  }
  // per a cambiar el contingut del main (Registrarse)
  if (BtnLogin) {
    BtnLogin.addEventListener("click", function (e) {
      BtnLogin.style.display = "none";
      e.preventDefault();
      fetch("registre.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
          registre();
        });
    });
  }
  // per a cambiar el contingut del main (iniciar sessio, login)
  if (BtnInSe) {
    BtnInSe.addEventListener("click", function (e) {
      BtnLogin.style.display = "block";
      e.preventDefault();
      fetch("iniciSesio.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("cambiarContingut").innerHTML = html;
          login();
        });
    });
  }

  if (yaRegistrat) {
    BtnInSe.style.display = "none";
  }

  // detecta el sumbit del camp de text
  if (formPublicar) {
    formPublicar.addEventListener("submit", function (e) {
      e.preventDefault();

      var contingutElement = document.getElementById("enviarPublicacio");
      var contingut = contingutElement.value;

      enviarPublicacioBBDD(contingut);
    });
  }

  extraurerUsuaris(updateDatatable);
  updateDatatable();
};

function updateDatatable() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../servidor/extraurer_publicacions.php", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      if (window.publicacionsManager && Array.isArray(data.publicacions)) {
        data.publicacions.forEach(function (item) {
          // comprobar el estat de la publicacio
          let disponibilitat = false;
          if (item.estat_publicacio === "Disponible") {
            disponibilitat = true;
          }
          // per a saber quines estan disponibles
          console.log(item.id_publicacio + " - " + item.estat_publicacio);
          window.publicacionsManager.addPublicacio(
            item.id_publicacio,
            item.contingut_publicacio,
            disponibilitat,
            item.id_usuari
          );
        });
      }
    } else {
      alert("Error carregant!");
      console.error("Error carregant!");
    }
  };
  xhr.send();
}

function extraurerUsuaris(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../servidor/extraurer_Usuaris.php", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      if (Array.isArray(data.usuaris)) {
        window.usuarisArray = [];
        data.usuaris.forEach(function (item) {
          const usuari = new Usuari(
            item.id_usuari,
            item.nom_usuari,
            item.correu_usuari,
            item.rol
          );
          window.usuarisArray.push(usuari);
        });
        if (callback) callback();
      }
    } else {
      alert("Error carregant!");
      console.error("Error carregant!");
    }
  };
  xhr.send();
}

function ocultarPublicacions(idPublicacioOcultar) {
  let params = {
    id: idPublicacioOcultar,
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../servidor/actualizar_Estat_Publicacio.php", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      updateDatatable();
    } else {
      alert("Error carregant!");
      console.error("Error carregant!");
    }
  };
  xhr.send(JSON.stringify(params));
}

// registre ----------------------------------------------------------------------------------------------------------
function registre() {
  function initFormHandler() {
    const form = document.querySelector("form");
    if (!form) {
      setTimeout(initFormHandler, 100);
      return;
    }
    form.addEventListener("submit", function (e) {
      yaRegistrat = true;
      e.preventDefault();

      let nom = document.getElementById("nom").value;
      let correu = document.getElementById("email").value;
      let contrasenya = document.getElementById("password").value;
      let confirmContrasenya = document.getElementById("password2").value;

      if (contrasenya !== confirmContrasenya) {
        alert("Las contraseñas no son iguales!!!.");
        return;
      }

      let params = {
        nom: nom,
        email: correu,
        password: contrasenya,
      };

      registrarUsuari("../servidor/registrar_usuari.php", params);
    });
  }

  initFormHandler();

  function registrarUsuari(url, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onload = function () {
      try {
        let data = JSON.parse(xhr.responseText);
        if (data.status === "success") {
          alert("Usuario registrado correctamente");
          window.location.href = "index.html";
        } else {
          alert(data.message || "Error registrando usuario.");
        }
      } catch (e) {
        alert("Ya existe un usuario con el correo que has introducido.");
      }
    };

    xhr.onerror = function () {
      alert("No se pudo conectar con el servidor.");
      console.error("Error en la solicitud");
    };

    xhr.send(JSON.stringify(params));
  }
}

// login ----------------------------------------------------------------------------------------------------------------
function login() {
  function initLoginFormHandler() {
    const form = document.querySelector("form");
    if (!form) {
      setTimeout(initLoginFormHandler, 100);
      return;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let correu = document.getElementById("email").value;
      let contrasenya = document.getElementById("password").value;

      let params = {
        email: correu,
        password: contrasenya,
      };

      // fer una consulta de usuari amb email i password
      comprovarSiExistixUsuari("../servidor/consulta_Usuaris.php", params);
    });
  }

  initLoginFormHandler();

  function comprovarSiExistixUsuari(url, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onload = function () {
      try {
        let data = JSON.parse(xhr.responseText);
        if (data.status === "success") {
          // Crear objecte amb la classe Usuari
          const item = data.usuari;
          const usuari = new Usuari(
            item.id_usuari,
            item.nom_usuari,
            item.correu_usuari,
            item.rol_usuari
          );
          // ara el usuari actual es el que ha fet el login
          window.usuariActual = usuari;

          const BtnInSe = document.getElementById("BtnInSe");
          if (BtnInSe) BtnInSe.style.display = "none";
          const BtnLogin = document.getElementById("BtnLogin");
          if (BtnLogin) BtnLogin.style.display = "none";

          alert("Inici de sessió correcte.");
          yaRegistrat = true;

          // carregar inici
          fetch("inici.html")
            .then((response) => response.text())
            .then((html) => {
              document.getElementById("cambiarContingut").innerHTML = html;
              extraurerUsuaris();
              updateDatatable();
            });
        } else {
          alert(data.message || "Usuari o contrasenya incorrectes.");
        }
      } catch (e) {
        alert("Error inesperat al servidor.");
        console.error("Resposta inesperada:", xhr.responseText);
      }
    };

    xhr.onerror = function () {
      alert("No se pudo conectar con el servidor.");
      console.error("Error en la solicitud");
    };

    xhr.send(JSON.stringify(params));
  }
}

// enviar publicacions ----------------------------------------------------------------------------------------------------------------
function enviarPublicacioBBDD(contingut) {
  let params = {
    contingut_publicacio: contingut,
    id_usuari: window.usuariActual.idUsuari,
  };
  
  registrarPublicacio("../servidor/registrar_publicacio.php", params);

  function registrarPublicacio(url, params) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.onload = function () {
      try {
        let data = JSON.parse(xhr.responseText);
        if (data.status === "success") {
          
          // carregar inici
          fetch("inici.html")
            .then((response) => response.text())
            .then((html) => {
              document.getElementById("cambiarContingut").innerHTML = html;
              extraurerUsuaris();
              updateDatatable();
            });
        } else {
          alert(data.message);
        }
      } catch (e) {
        alert("Error inesperat al servidor.");
        console.error("Resposta inesperada:", xhr.responseText);
      }
    };

    xhr.onerror = function () {
      alert("No se pudo conectar con el servidor.");
      console.error("Error en la solicitud");
    };

    xhr.send(JSON.stringify(params));
  }
}
