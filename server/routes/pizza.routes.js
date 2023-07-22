const PizzaController = require("../controllers/pizza.controller");

module.exports = app => {
    app.get('/api/pizzas', PizzaController.getAllPizzas);
    app.post('/api/pizzas', PizzaController.createPizza);
    app.patch('/api/pizzas/:id', PizzaController.updatePizza);
    app.delete('/api/pizzas/:id', PizzaController.deletePizza);
}