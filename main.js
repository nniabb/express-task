const express = require('express')

const app = express();
const port = 3000;

const expenses = [{id:1, name: 'nia', cost: 500, createdAt: new Date()}];

app.use(express.json());

app.get('/expenses', (req, res) => {
    res.json(expenses)
})

app.get('/expenses/:id', (req, res) => {
    const id = req.params.id
    const expense = expenses.find(expense => expense.id === Number(id))
    if(!expense){
        res.status(404)
        res.json({success: false})
    } else{
        res.json(expense)
        res.send({success:true})
    }
})

app.post('/expenses', (req, res) => {
    const expense = req.body
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
    const newExpense = {id: newId, name, cost, createdAt:new Date()}
    expenses.push(newExpense)
    res.status(201).json({ success: true, newExpense });
})

app.put('/expenses/:id', (req, res) => {
    const id = req.params.id
    const { name, cost } = req.body
    const expense = expenses.find(expense => expense.id === id);
    expense ={
        ...expense,
        name: name,
        cost: cost
    }

})

app.delete('/expenses/:id', (req, res) => {
    const id = req.params.id;
    const index = expenses.findIndex(expense => expense.id === id)
    if(index !== -1){
        res.send({success: false})
    }
    res.send({})
})




app.listen(port, () => {
    console.log(`App Started At http://localhost:${port}`);
})


 

// C-create-post
// R-get-get
// U-update-put
// D-delete-delete