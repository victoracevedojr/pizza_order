const Pizza = require("../models/pizza.model");

module.exports = {
    createPizza: (req,res) => {
        Pizza.create(req.body)
        .then(newPizza=>{
            console.log(newPizza);
            res.json(newPizza);
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err)
        });
    },

    getAllPizzas: (req,res) => {
        Pizza.find()
        .then(allPizzas=>{
            console.log(allPizzas);
            res.json(allPizzas);
        })
        .catch(err=>res.json(err));
    },

    deletePizza: (req,res) => {
        Pizza.deleteOne({_id:req.params.id})
        .then(deletedPizza=>{
            console.log(deletedPizza);
            res.json(deletedPizza);
        })
        .catch(err=>res.json(err));
    },

    updatePizza: (req,res) => {
        Pizza.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators:true})
        .then(updatedPizza=>{
            console.log(updatedPizza);
            res.json(updatedPizza)
        })
        .catch(err=>res.status(400).json(err));
    }
}