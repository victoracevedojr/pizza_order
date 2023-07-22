import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormCheck from 'react-bootstrap/FormCheck';

const Dashboard = (props) => {
    const [pizzaList, setPizzaList] = useState([]);
    const [triggerGetAll, setTriggerGetAll] = useState(false);
    const [showDeliveriesIsActive, setShowDeliveriesIsActive] = useState(false);
    const [hideDeliveriesIsActive, setHideDeliveriesIsActive] = useState(false);
    const [showDeliveriesStyle, setShowDeliveriesStyle] = useState({});
    const [hideDeliveriesStyle, setHideDeliveriesStyle] = useState({});
    const styleBold = {fontWeight: "800"};

    useEffect(() => {
        if(showDeliveriesIsActive){
            setShowDeliveriesStyle(styleBold);
        } else {
            setShowDeliveriesStyle({});
        }
        if(hideDeliveriesIsActive){
            setHideDeliveriesStyle(styleBold);
        } else {
            setHideDeliveriesStyle({});
        }
    }, [showDeliveriesIsActive, hideDeliveriesIsActive]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pizzas")
        .then(res => {
            console.log(res.data);
            res.data.sort((a,b)=>new Date(a.deliveryTime).getTime() - new Date(b.deliveryTime).getTime()); //Orders will be sorted by soonest delivery time
            setPizzaList(res.data);
        })
        .catch(err => console.log(err));
    }, [triggerGetAll]);

    const deletePizza = idFromBelow => {
        axios.delete('http://localhost:8000/api/pizzas/' + idFromBelow)
        .then(res => {
            console.log(res.data);
            setPizzaList(pizzaList.filter((pizza,index) => pizza._id !== idFromBelow));
        })
        .catch(err => console.log(err));
    }

    const handleDeliveryStatus = (idFromBelow, deliveryStatus) => {
        let patchData = {}
        patchData.deliveryStatus = !deliveryStatus;
        axios
        .patch(`http://localhost:8000/api/pizzas/${idFromBelow}`, patchData)
        .then((res) => {
            console.log(res);
            setTriggerGetAll(!triggerGetAll);
        })
        .catch((err) => console.log(err.response));
    }

    const handleHideDelivered = () => {
        setShowDeliveriesIsActive(false);
        setHideDeliveriesIsActive(true);
        axios.get("http://localhost:8000/api/pizzas")
        .then(res => {
            console.log(res.data);
            res.data.sort((a,b)=>new Date(a.deliveryTime).getTime() - new Date(b.deliveryTime).getTime()); //Orders will be sorted by soonest delivery time
            setPizzaList(res.data.filter( pizza => pizza.deliveryStatus !== true));
        })
        .catch(err => console.log(err));
    }

    const handleShowDelivered = () => {
        setShowDeliveriesIsActive(true);
        setHideDeliveriesIsActive(false);
        axios.get("http://localhost:8000/api/pizzas")
        .then(res => {
            console.log(res.data);
            res.data.sort((a,b)=>new Date(a.deliveryTime).getTime() - new Date(b.deliveryTime).getTime()); //Orders will be sorted by soonest delivery time
            setPizzaList(res.data.filter( pizza => pizza.deliveryStatus !== false));
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="container mt-4" style={{textAlign:"left"}}>
            <div className="d-flex justify-content-between col-10 offset-1">
                <h1>Pizza Orders</h1>
                <Link to="/new" className=" btn btn-primary h-50">Order a Pizza</Link>
            </div>
            <div className="col-10 offset-1">
                <div className="d-flex justify-content-between">
                    <h2 className="col-6">Find stores in your area!</h2>
                    <div className="col-6 d-flex justify-content-around">
                        <button className="btn btn-secondary" style={hideDeliveriesStyle} onClick={()=>handleHideDelivered()}>Hide Delivered</button>
                        <button className="btn btn-secondary" style={showDeliveriesStyle} onClick={()=>handleShowDelivered()}>Show Delivered</button>
                        <button className="btn btn-info" onClick={() => window.location.reload(false)}>Show All</button>
                    </div>
                </div>
                <table className="table table-bordered table-hover table-striped mt-2 col-12">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Delivery Time</th>
                            <th scope="col">Pizza Type</th>
                            <th scope="col">Size</th>
                            <th scope="col">Delivered?</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pizzaList.map((pizza,index) => {
                            return(
                                <tr key={index}>
                                    <td>{new Date(pizza.deliveryTime).toLocaleString()}</td>
                                    <td>{pizza.pizzaType}</td>
                                    <td>{pizza.size}</td>
                                    <td><FormCheck type="checkbox"  onClick={(e)=>handleDeliveryStatus(pizza._id, pizza.deliveryStatus)} label={String(pizza.deliveryStatus)} className={`${pizza.deliveryStatus === true ? "text-success": "text-danger" }`}/></td>
                                    <td><button className="btn btn-danger col-10 offset-1" onClick={() => deletePizza(pizza._id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard;