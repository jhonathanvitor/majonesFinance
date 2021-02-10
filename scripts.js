const Modal = {
    open() {
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: 20000,
        date: '23/01/2021',
    },
]

const Transaction = {
    all: transactions,

    add(transaction) {
        Transaction.all.push(transaction)

        console.log(Transaction.all)
    },

    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {        
        return Transaction.incomes() + Transaction.expenses()
    }
}

var DOM = {
    /* Fora do escopo nao funciona! 
       Pois o objeto esta sendo criado antes da DOM carregar
    */
    transactionsContainer: document.querySelector('#tbody-table'),

    addTransaction: function (transaction) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        /* Dentro do escopo funciona!
        - Atribuindo com 'querySelector'
            var transContainer = document.querySelector('#tbody-table');
        - Atribuindo com 'getElementById'
            var transContainer = document.getElementById('tbody-table');
        - ou usando document direto das duas formas
            document.querySelector('#tbody-table').appendChild(tr)
            document.getElementById('tbody-table').appendChild(tr)
        */
        var transContainer = document.getElementById('tbody-table');
        transContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./imagens/minus.svg" alt="remover Transações">
        </td>
        `

        return html
    },

    updataBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}


function domLoaded() {
    if (document.readyState === "loading") {
        console.log("loading")
    }
    else {

        transactions.forEach(function (transaction) {
            DOM.addTransaction(transaction)
        })

        DOM.updataBalance()


        Transaction.add({
            id: 39,
            description: 'Alo',
            amount: 299,
            date: '23/01/20201'
        })
    }
}

window.onload = function() {
    domLoaded();
};

//window.addEventListener('DOMContentLoaded', domLoaded, false)