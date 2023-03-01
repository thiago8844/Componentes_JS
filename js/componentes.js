"use strict";

//Accordion
function accordion() {
  const accordion = document.querySelector(".accordion-container");

  accordion.addEventListener("click", function (e) {
    const clicado = e.target.closest(".accordion-title");

    //Guard Clause
    if (!clicado) return;

    clicado.classList.toggle("active");
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
    //Event listener para fechar o menu
    document.body.addEventListener("click", function (e) {
      if (e.target === btnFechar || e.target === blur) {
        
        pushMenu.style.transform = "translateX(-100%)";
        
        blur.style.opacity = 0;
        //Seta um timeout pra ele sair bonitinho
        setTimeout(() => {
          blur.remove();
        }, 200);
        
      };
    });
  }

  elAbre.addEventListener("click", function () {
    abreMenu(true);
  });
}

//Footer invertido
function footerInv() {

  const checkInv = document.querySelector(".switch input");
  const footer = document.querySelector(".footer-section footer");
  const embaixo = document.querySelector(".embaixo");


  checkInv.addEventListener("click", function(e) {
    
    
    if(this.checked) {
      console.log("ativou vdd")
      footer.style.position = "fixed";
      embaixo.style.marginBottom = "600px";
    }else {
      console.log("ativou fls")
      footer.style.position = "initial";
      embaixo.style.marginBottom = "0";
    }
  });

}
// Código principal
const hamburguer = document.querySelector(".hamburguer");


hamburguerMenu(hamburguer);
accordion();
footerInv()