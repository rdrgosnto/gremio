const quantidade = document.getElementById("quantidade")
const valor = document.getElementById("valor")
const botao = document.getElementById("comprar")
const resultado = document.getElementById("resultado")

function atualizarValor(){

let qtd = quantidade.value
let total = qtd * 5

valor.innerText = "R$" + total + ",00"

}

quantidade.addEventListener("change", atualizarValor)

botao.addEventListener("click", () => {

let nome = document.getElementById("nome").value
let telefone = document.getElementById("telefone").value
let qtd = quantidade.value

if(nome === "" || telefone === ""){
alert("Preencha nome e telefone")
return
}

resultado.classList.remove("oculto")

})
