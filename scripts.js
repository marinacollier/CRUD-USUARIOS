function addUsuario(edit = "", element = undefined) {
  var nome = document.getElementById("nome" + edit);
  var genero = document.getElementById("genero" + edit);
  var profissao = document.getElementById("profissao" + edit);
  var empresa = document.getElementById("empresa" + edit);
  var validateForm = true;
  var tr;
  var td;

  if (
    !nome || nome.value.trim() == '' ||
    !genero || genero.value == '' ||
    !profissao || profissao.value.trim() == '' ||
    !empresa || empresa.value.trim() == ''
  ) {
    validateForm = false;
  }

  if (validateForm) {
    tr = createTr();
    td = tr.getElementsByTagName("td");

    if (td.length > 0) {
      td[0].innerText = nome.value.trim().toUpperCase();
      td[1].innerText = genero[genero.selectedIndex].innerText;
      td[2].innerText = profissao.value.trim().toUpperCase();
      td[3].innerText = empresa.value.trim().toUpperCase();
    }

    if (edit == "") {
      document.getElementById("tbody-usuarios").appendChild(tr);

      nome.value = "";
      genero.value = "";
      profissao.value = "";
      empresa.value = "";
    } else {
      document.getElementById("tbody-usuarios").insertBefore(tr, element.parentElement.parentElement);
      element.parentElement.parentElement.remove();
    }
  } else {
    alert("Favor verificar o preenchimento dos campos!");
  }
}

function editUsuario(element) {
  var infoUsuario = element.parentElement.parentElement.getElementsByTagName("td");
  var nome = document.getElementById("nome");
  var genero = document.getElementById("genero");
  var profissao = document.getElementById("profissao");
  var empresa = document.getElementById("empresa");
  var edit = "-edit";
  var icone;

  if (document.getElementById("nome" + edit)) {
    alert("Não é possível editar dois registros ao mesmo tempo!");
    
    return false;
  }

  if (infoUsuario.length > 0) {
    if (nome) {
      nome = nome.cloneNode(true);
      nome.id += edit;
      nome.name += edit;
      nome.value = infoUsuario[0].innerText;

      infoUsuario[0].innerText = "";
      infoUsuario[0].appendChild(nome);
    }

    if (genero) {
      genero = genero.cloneNode(true);
      genero.id += edit;
      genero.name += edit;

      for (var i = 0, total = genero.options.length; i < total; i++) {
        if (genero.options[i].innerText.toUpperCase() == infoUsuario[1].innerText.toUpperCase()) {
          genero.selectedIndex = i;
          
          break;
        }
      }

      infoUsuario[1].innerText = "";
      infoUsuario[1].appendChild(genero);
    }

    if (profissao) {
      profissao = profissao.cloneNode(true);
      profissao.id += edit;
      profissao.name += edit;
      profissao.value = infoUsuario[2].innerText;

      infoUsuario[2].innerText = "";
      infoUsuario[2].appendChild(profissao);
    }
    
    if (empresa) {
      empresa = empresa.cloneNode(true);
      empresa.id += edit;
      empresa.name += edit;
      empresa.value = infoUsuario[3].innerText;

      infoUsuario[3].innerText = "";
      infoUsuario[3].appendChild(empresa);
    }

    icone = document.createElement("img");
    icone.src = "img/ok.png";
    icone.className = "icones";
    icone.setAttribute("onclick", "addUsuario('-edit', this)");

    infoUsuario[4].innerHTML = "";
    infoUsuario[4].appendChild(icone);
  }
}

function exclUsuario(element) {
  element.parentElement.parentElement.remove();
}

function createTr() {
  var tr = document.createElement("tr");
  var td;
  var img;

  for (var i = 0; i < 5; i++) {
    td = document.createElement("td");
    
    if (i == 4) {
      img = document.createElement("img");
      img.src = "img/editar.png";
      img.className = "icones";
      img.setAttribute("onclick", "editUsuario(this)");

      td.appendChild(img);

      img = document.createElement("img");
      img.src = "img/excluir.png";
      img.className = "icones";
      img.setAttribute("onclick", "exclUsuario(this)");
      
      td.appendChild(img);
    }

    tr.appendChild(td);
  }

  return tr;
}
