"use strict";

/* 
NOTAS:

TOGGLE DE CLASSLIST E NÚMERO É MIL VEZES MELHOR QUE STYLE
*/

function accordion() {
  const accordion_container = document.querySelector(".accordion-container");

  accordion_container.addEventListener("click", function (e) {
    //Pega quem foi clicado
    const clicado = e.target.closest(".accordion-header");

    //Retorna se o clicado não for o header
    if (!clicado) return;

    //Seleciona o conteudo do accordion clicado
    const conteudo = clicado
      .closest(".accordion-item")
      .querySelector(".accordion-content");
    //Seleciona a seta do accordion clicado
    const seta = clicado
      .closest(".accordion-item")
      .querySelector(".icon-accordion");

    if (getComputedStyle(conteudo).maxHeight === "0px") {
      conteudo.style.maxHeight = conteudo.scrollHeight + "px";
      clicado.style.borderBottomLeftRadius = "0";
      clicado.style.borderBottomRightRadius = "0";

      if (seta.classList.contains("rotate-back"))
        seta.classList.remove("rotate-back");

      seta.classList.add("rotate");
    } else {
      conteudo.style.maxHeight = "0";
      clicado.style.borderBottomLeftRadius = "5px";
      clicado.style.borderBottomRightRadius = "5px";

      if (seta.classList.contains("rotate")) seta.classList.remove("rotate");
      seta.classList.add("rotate-back");
    }
  });
}

//Hamburguer
function hamburguerMenu(elAbre) {
  //Variáveis
  const pushMenu = document.querySelector(".navigation");
  const btnFechar = document.querySelector(".fecha-push-menu");

  //Função abre menu
  function abreMenu(bl) {
    //Quando cr
    pushMenu.style.transform = "translateX(0)";
    document.body.insertAdjacentHTML("afterbegin", `<div class="blur"> </div>`);
    const blur = document.querySelector(".blur");

    // Seta um timeout pra entrar bonitinho
    setTimeout(() => {
      blur.style.opacity = 1;
    }, 1);

    //Seta os eventos de fechamento
    //Event listener for closing the menu
    document.body.addEventListener("click", function (e) {
      if (e.target === btnFechar || e.target === blur) {
        pushMenu.style.transform = "translateX(-100%)";

        blur.style.opacity = 0;
        //Seta um timeout pra ele sair bonitinho
        setTimeout(() => {
          blur.remove();
        }, 200);
      }
    });
  }

  elAbre.addEventListener("click", function () {
    abreMenu(true);
  });
}

//Hamburguer2
function hamburguerMenuOficial() {
  //Abre e fecha o menu
  function menuContainer() {
    const menuHamburguer = document.querySelector(".push-menu-container");

    const elAbre = document.querySelector(".hamburguer");
    const fechaMenu = document.querySelector("#fecha-menu");

    let c = 0;
    function mudaMenu() {
      // Usa impar par pra abrir o menu mesmo foda-se
      if (!c) {
        menuHamburguer.style.transform = "translateX(0)";
        document.body.insertAdjacentHTML(
          "afterbegin",
          `<div id="blur"> </div>`
        );
        c = 1;
      } else {
        menuHamburguer.style.transform = "translateX(-100%)";
        document.querySelector("#blur").remove();
        c = 0;
      }
    }

    elAbre.addEventListener("click", mudaMenu);
    fechaMenu.addEventListener("click", mudaMenu);
    document.body.addEventListener("click", function (e) {
      if (e.target === document.querySelector("#blur")) mudaMenu();
    });
  }

  function dropdownHanburguer() {
    const dropdownContainer = document.querySelector(".dropdown-hamburguer");

    dropdownContainer.addEventListener("click", function (e) {
      const clicado = e.target.closest("li");

      const subMenu = clicado.nextElementSibling;
      //Retorna caso não haja um sub menu
      if (!subMenu.classList.contains("sub_m")) return;

      if (!subMenu.classList.contains("active")) {
        subMenu.classList.add("active");
        subMenu.style.height = subMenu.scrollHeight +  "px";
      } else {
        subMenu.classList.remove("active");
        subMenu.style.height = "0px";

      }

    });
  }

  //Principal
  menuContainer();
  dropdownHanburguer();
}

function footerInv() {
  /* 
    Decidi não delegar os eventos nos radios para manter o código mais organizado. Já que cada radio vai ter um comportamento específico é melhor criar um event listener para cada um do que delegar.
  */

  const radioNormal = document.querySelector("#footer-normal");
  const radioFooterInv1 = document.querySelector("#footer-inv1");
  const radioFooterInv2 = document.querySelector("#footer-inv2");

  const footer = document.querySelector(".footer-section footer");
  const secaoFooter = document.querySelector(".footer-section");
  const topoFooter = document.querySelector(".topo-footer");
  const madeirinha = document.querySelector(".madeirinha");

  // Footer normal
  radioNormal.addEventListener("change", function () {
    if (madeirinha.classList.contains("madeirinha-active"))
      madeirinha.classList.remove("madeirinha-active");

    footer.style.position = "static";
    secaoFooter.style.marginBottom = "0";
  });

  // Footer Invertido 1 (madeirinha em cima)
  radioFooterInv1.addEventListener("change", function () {
    if (madeirinha.classList.contains("madeirinha-active"))
      madeirinha.classList.remove("madeirinha-active");
    //Seta as opções desse footer
    footer.style.position = "fixed";
    footer.style.bottom = "0px";
    secaoFooter.style.marginBottom = "600px";
  });

  // Footer Invertido 2 (Madeirinha embaixo)
  radioFooterInv2.addEventListener("change", function () {
    //Seta as opções desse footer
    footer.style.position = "fixed";
    footer.style.bottom = "150px";
    secaoFooter.style.marginBottom = "750px";

    //Callback OBserver
    const callBackObs = (entries, observer) => {
      //Guard Clause *Para caso a opção footer 2 não esteja checada
      if (!radioFooterInv2.checked) return;

      const [entry] = entries;

      // Ativa a madeirinha
      if (entry.target === madeirinha && entry.isIntersecting) {
        madeirinha.classList.add("madeirinha-active");
      }

      // Desativa a madeirinha
      if (
        entry.target === topoFooter &&
        entry.boundingClientRect.top > 100 &&
        !entry.isIntersecting
      ) {
        madeirinha.classList.remove("madeirinha-active");
      }
    };

    //Observer da madeirinha
    const obsMadeirinha = new IntersectionObserver(callBackObs, {
      root: null,
      threshold: 1,
      // rootMargin: "-20px",
    });

    //Observer do topo-footer
    const obsTopoFooter = new IntersectionObserver(callBackObs, {
      root: null,
      threshold: 1,
      rootMargin: "0px 0px -150px 0px",
    });

    // Faz as duas instâncias do observer verificar a interseção desses elementos
    obsMadeirinha.observe(madeirinha);
    obsTopoFooter.observe(topoFooter);
  });
}

//MenuBar

// Código principal
const hamburguer = document.querySelector(".hamburguer");

accordion();
footerInv();
hamburguerMenuOficial();
