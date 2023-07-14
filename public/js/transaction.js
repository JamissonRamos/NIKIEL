
const myModal = new bootstrap.Modal("#transctions-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {

    transactions: []
}

document.getElementById("button-logout").addEventListener("click", logout);


checkLogged();

getTransaction();

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

        console.log(data)
    }

    
    getTransaction();
}

function logout() {

    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
    return
}


//ADICIONAR LANÇAMENTOS
document.getElementById("transctions-form").addEventListener("submit", (e) => {

    e.preventDefault();

     // Obtém os valores dos campos do formulário
    const value = parseFloat(document.getElementById('value-input').value);
    const description = document.getElementById('description-input').value;
    const date = document.getElementById('date-input').value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    console.log(value)
    console.log(description)
    console.log(date)
    console.log(type)


    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    })

    saveData(data);
    e.target.reset();
    myModal.hide();

    getTransaction();

    alert("Lançamento adicionado com sucesso.")
});

function getTransaction () {

    const transactions = data.transactions;
    let transactionsHtml = ``;

    if(transactions.length) {

        transactions.forEach((item) => {

            let type = "Entrada";

            if(item.type === "2") {

                type = "Saída";
            }


            transactionsHtml += `

            <tr>
                <th scope="row"> ${item.date} </th>
                <td>${item.value.toFixed(2)} </td>
                <td> ${type} </td>
                <td> ${item.description} </td>
            </tr>

            `
        })

        document.getElementById("transaction-list").innerHTML = transactionsHtml; 
    }
}

function saveData(data) {
    
    localStorage.setItem(data.login, JSON.stringify(data))
}