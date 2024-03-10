//função calcular
function calculate() {
  //antes de executar setar para erro
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  //avalia o código - possivel de usar qualquer área - tomar cuidado ao usar eval
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}

//variáveis
const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const switchTheme = document.getElementById("themeSwitcher");
const copy = document.getElementById("copyToClipboard");
//botão para limpar o input
clear.addEventListener("click", () => {
  input.value = "";
  input.focus();
});

//capturar todos os botões
const buttons = document.querySelectorAll(".charKey");
//para cada botão
buttons.forEach((button) => {
  //quando o botão é pressionado
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    //acrescentando valores
    input.value += value;
  });
});

//teclhas permitidas salvas em um array
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];
//quando uma tecla for pressionada
input.addEventListener("keydown", (event) => {
  //não seja inserido o valor no input
  event.preventDefault();
  //a tecla associada ao evento
  //caso ela estiver no array
  if (allowedKeys.includes(event.key)) {
    //incrementa no input o valor digitado
    input.value += event.key;
    return;
  }
  //caso a tecla pressionada seja backspace
  if (event.key === "Backspace") {
    //vai pegar o penúltimo caracter
    input.value = input.value.slice(0, -1);
  }
  //caso a tecla pressionada seja enter
  if (event.key === "Enter") {
    calculate();
  }
});
//quando o igual é clicado
equal.addEventListener("click", calculate);

//trocar o tema
switchTheme.addEventListener("click", () => {
  //saber o tema atual
  //se for dark troca para light
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
    //se for light troca para dark
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

//copiando
copy.addEventListener("click", (event) => {
  const button = event.currentTarget;
  //se for igual a copy ainda não foi copiado
  if (button.innerText === "Copy") {
    //anunciando ao usuário que esta copiado
    button.innerText = "Copied";
    //classe css
    button.classList.add("success");
    //copiando o valor da área de transferência
    window.navigator.clipboard.writeText(resultInput.value);
  } else {
    //quando já tiver sido copiado
    if (button.innerText === "Copied") {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  }
});
