const url = "https://default264c851fa4e743cf86bcd7b10dca85.78.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/9ea7436d9de2427c963539c85af82e62/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3WPtT7ezmvxEFgLBN37FvBJV92ac3tcMh0txYhzB0sg"

const quantidade = document.getElementById("quantidade")
const container = document.getElementById("nomesIngressos")
const valor = document.getElementById("valor")

quantidade.addEventListener("change", atualizar)

function atualizar(){

container.innerHTML=""

let qtd = quantidade.value
let total = qtd * 5

valor.innerText = "R$" + total + ",00"

for(let i=1;i<=qtd;i++){

let campo = document.createElement("input")

campo.placeholder = "Nome do ingresso " + i
campo.className = "ingresso"

container.appendChild(campo)

}

}

async function enviar(){

let comprador = document.getElementById("comprador").value
let telefone = document.getElementById("telefone").value

let campos = document.querySelectorAll(".ingresso")

let lista=[]

campos.forEach(c=>{
lista.push(c.value)
})

const dados={
comprador:comprador,
telefone:telefone,
ingressos:lista
}

try{

await fetch(url,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(dados)
})

alert("Reserva enviada com sucesso!")

}catch(e){

alert("Erro ao enviar")

}

}

atualizar()
