
const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {

    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", () => {

    window.location.href = "transctions.html"
});

//ADICIONAR LANÇAMENTOS
document.getElementById("transctions-form").addEventListener("submit", (e) => {

    e.preventDefault();

     // Obtém os valores dos campos do formulário
    const value = parseFloat(document.getElementById('value-input').value);
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    })

    saveData(data);
    e.target.reset();
    myModal.hide();

    getCashIn();
    getCashOut();
    getTotal();

    alert("Lançamento adicionado com sucesso.")
});

checkLogged();

function checkLogged() {

    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session
    }

    if(!logged) {

        window.location.href = "index.html";
        return
    }

    const dataUser = localStorage.getItem(logged);
    
    if(dataUser) {

        data = JSON.parse( dataUser );
    }

    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {

    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html"; ///NIKIEL/public/index.html
    return
}

function getCashIn () {

    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === "1");

    console.log(cashIn)

    if(cashIn.length)
    {
        let cashInHtml = ``;
        let limite = 0

        if(cashIn.length > 5)
        {
            limite = 5;
    
        }else{
            
            limite = cashIn.length
        }

        for (let index = 0; index < limite; index++) {

            console.log(index);
            console.log(cashIn[index]);

            cashInHtml += `
            
                <div class="row mb-4">

                    <div class="col-12"> 
                
                        <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)} </h3>

                        <div class="container p-0">

                            <div class="row">

                                <div class="col-12 col-md-8">

                                    <p> ${cashIn[index].description} </p>

                                </div>

                                <div class="col-12 col-md-3 d-flex justify-content-end">

                                <span> ${cashIn[index].date} </span>

                                </div>

                            </div>

                        </div>
            
                    </div>

                </div>
            `
        }

        document.getElementById("cash-in-list").innerHTML = cashInHtml;
    }
}

function getCashOut () {

    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type === "2");

    console.log(cashOut)

    if(cashOut.length)
    {
        let cashOutHtml = ``;
        let limite = 0

        if(cashOut.length > 5)
        {
            limite = 5;
    
        }else{
            
            limite = cashOut.length
        }


        for (let index = 0; index < limite; index++) {

            console.log(index);
            console.log(cashOut[index]);

            cashOutHtml += `
            
                <div class="row mb-4">

                    <div class="col-12"> 
                
                        <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)} </h3>

                        <div class="container p-0">

                            <div class="row">

                                <div class="col-12 col-md-8">

                                    <p> ${cashOut[index].description} </p>

                                </div>

                                <div class="col-12 col-md-3 d-flex justify-content-end">

                                <span> ${cashOut[index].date} </span>

                                </div>

                            </div>

                        </div>
            
                    </div>

                </div>
            `
        }

        document.getElementById("cash-out-list").innerHTML = cashOutHtml;
    }
}

function getTotal(){

    const transactions = data.transactions;
    let total = 0;
    let totalEntrada = 0;
    let totalSaida = 0;

    transactions.forEach((item) => {

        if(item.type === "1"){

            totalEntrada += item.value;

            total += item.value;

        }else {

            totalSaida += item.value;
            total -= item.value;
        }
    })

    document.getElementById("total").innerText = ` R$: ${parseFloat(total).toFixed(2)} `;
    document.getElementById("total-entrda").innerText = ` R$: ${parseFloat(totalEntrada).toFixed(2)} `;
    document.getElementById("total-saida").innerText = ` R$: ${parseFloat(totalSaida).toFixed(2)} `;
    
}

function saveData(data) {
    
    localStorage.setItem(data.login, JSON.stringify(data))
}