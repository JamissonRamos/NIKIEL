//Obtendo referência do modal do login
const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//#region Faze login
document.addEventListener('submit', (e) => {

    e.preventDefault();

     // Obtém os valores dos campos do formulário
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;


    const account = getAccount(email) 

    if (!account){

        alert("Opps! Verifique o seu usuário ou sua senha.")
        return;
    }

    if (account){

        if(account.password !== password){

            alert("Opps! Verifique o seu usuário ou sua senha.")
            return;
        }

        saveSession(email, checkSession)

        window.location.href = "home.html"
    }

})


function checkLogged() {

    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session
    }

    if(logged) {
        saveSession(logged, session)
        window.location.href = "home.html"
    }
}


const getAccount = (key) => {

    const account = localStorage.getItem(key)

    if (account) {
        
        return JSON.parse(account);
    }

    return "";
} 

function saveSession(data, saveSession) 
{

    if (saveSession) {

        localStorage.setItem("session", data)
    }

    sessionStorage.setItem("logged", data);
}

//#endregion



//#region Criando Conta 

    //******************************************************************************* 
    // Tratamentos para salvar dados do usuário no localStorage;
    // Pegando os valores dos inputs do frm modal da index;
    // Fazendo uma verificação dos inputs, com relação as regras de negocio;
    // Pegando referencia do modal do index, e fechando ao coletar os dados do frm;
    // Criando obj de usuário, para salvar no local Storage
    //*******************************************************************************

    // Obtém uma referência ao botão pelo seu ID
    const frmCreateUser = document.getElementById('create-form');

    // Adiciona um ouvinte de evento de clique ao botão
    frmCreateUser.addEventListener('submit', function(e) 
    {
        // Impede o envio do formulário
        e.preventDefault();

        // Obtém os valores dos campos do formulário
        const email = document.getElementById('email-create-input').value;
        const password = document.getElementById('password-create-input').value;

        if(email.length < 5 ){
            alert("Preencha o campo com um email válido.");
            return;
        }

        if(password.length < 4 ){
            alert("Preencha a senha no mínimo com 4 dígitos.");
            return;
        }

        //Fechando o modal do login assim que as regras de negócio estiver certo
        myModal.hide();

        alert("Conta criada com sucesso!")

        saveAccount
        (
            {
                login: email,
                password: password,
                transactions: []
            }
        )
    });

    const saveAccount = (data) => {

        console.log(data)

        //Incluindo o dados no localStorage
        localStorage.setItem(data.login, JSON.stringify(data))

    }

//#endregion