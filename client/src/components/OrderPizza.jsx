import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPizza = (props) => {
    const [pizzaType, setPizzaType] = useState("");
    const [size, setSize] = useState("");
    const [notes, setNotes]= useState("");
    const [deliveryStatus] = useState(false);
    const [deliveryTime, setDeiliveryTime] = useState("");
    const [errors, setErrors] = useState({});
    const [pizzaList, setPizzaList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost:8000/api/pizzas")
        .then(res => {
            console.log(res.data);
            setPizzaList(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    const createPizza = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/pizzas', {pizzaType, size, deliveryStatus, deliveryTime, notes})
        .then(res => {
            console.log(res.data);
            navigate("/")
        })
        .catch(err=>{
            console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        })
    };

    return (
        <div className="container mt-4">
            <Link to="/" className="offset-9 btn btn-primary">Back to Dashboard</Link>
            <form onSubmit={(e) => createPizza(e)} className="col-12 border mt-3 p-3">
                <h1>{size} {pizzaType}</h1>
                <div className="d-flex justify-content-around mt-4">
                    <div className="form-group col-5" style={{textAlign:"left"}}>
                        <label>Pizza Types<sup className="text-danger">*</sup></label>
                        <select className="form-control" onChange={(e)=>setPizzaType(e.target.value)}>
                            <option >Select a Pizza</option>
                            <option value="Pepperoni">Pepperoni</option>
                            <option value="Cheese">Cheese</option>
                            <option value="Combination">Combination</option>
                            <option value="Philly Cheese Steak">Philly Cheese Steak</option>
                            <option value="Hawaiian">Hawaiian</option>
                            <option value="Veggie">Veggie</option>
                        </select>
                        {errors.pizzaType ? <><br/><p className="alert alert-danger">{errors.pizzaType.message}</p></> : null } 
                    </div>
                    <div className="form-group col-5" style={{textAlign:"left"}}>
                        <label>Sizes<sup className="text-danger">*</sup></label>
                        <select className="form-control" onChange={(e)=>setSize(e.target.value)}>
                            <option >Select a Size</option>
                            <option value="Single">Single</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>
                        {errors.size ? <><br/><p className="alert alert-danger">{errors.size.message}</p></> : null } 

                    </div>
                </div>
                <div className="d-flex justify-content-around mt-4">
                    <div className="form-group col-5" style={{textAlign:"left"}}>
                        <label>Notes (Optional)</label>
                        <textarea className="form-control" rows={3} value={notes} onChange={(e)=>setNotes(e.target.value)}/>
                        {errors.notes ? <><br/><p className="alert alert-danger">{errors.notes.message}</p></> : null } 
                    </div>
                    <div className="form-group col-5" style={{textAlign:"left"}}>
                        <label>Delivery Time<sup className="text-danger">*</sup></label>
                        <input required
                            type="datetime-local" 
                            className="form-control"
                            value={deliveryTime} 
                            onChange={(e)=>{
                                setDeiliveryTime(e.target.value)
                            }
                            } 
                        />
                        {errors.deliveryTime ? <><br/><p className="alert alert-danger">{errors.deliveryTime.message}</p></> : null } 
                    </div>
                </div>
                {
                    pizzaList.length>9 
                    ?
                    <div>
                        <p className="alert alert-danger col-4 offset-4 mt-4">Max 10 deliveries, try again later!</p>
                        <input type="submit" disabled className="btn btn-success mt-1" value="Order Now!"/>
                    </div>
                    :
                    <input type="submit" className="btn btn-success mt-4" value="Order Now!"/>
                }
            </form>
        </div>
    )
}

export default OrderPizza;