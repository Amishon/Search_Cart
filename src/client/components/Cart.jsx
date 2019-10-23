import React from 'react';
import axios from 'axios'

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionValue : '1'
        };

        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getData() {
        console.log("getData invoked, productID = ", document.productID);
        axios.get('/getData/' + document.productID)
        .then((res) => {
            this.setState({
                data : res.data[0]
            })
            console.log(this.state);
        })
        .catch((err) => {
            console.log('GETDATA ERROR: ', err)
        })    
    }

    addToCart(qty) {
        const event = new CustomEvent('addToCart', {});
        window.dispatchEvent(event);

        axios.post('/addToCart', {
            qtyToAdd: qty,
            productNum : document.productID
        })
            .then((response) => {
                console.log("addToCart response = ", response)
                this.getData();
                
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

    handleChange(event) {
        this.setState({optionValue: event.target.value})
    }

    componentDidMount() {
        document.productID = 1;  
        window.addEventListener('productChange', (event) => {
            console.log("eventListener productId", window.productID)
            this.getData();
        })
        console.log("componentDidMount productId", window.productID)
        this.getData();
    }

    
    render() {
        if (this.state.data) {
            return (
                <div>
                    Name: {this.state.data.name}<br></br>
                    Price: {this.state.data.price}
                    <br></br>
                    <form>
                        <select value={this.state.optionValue} onChange={this.handleChange}>
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                        </select>
                    </form>
                    <button onClick={this.addToCart.bind(this, Number(this.state.optionValue))}>Add to Cart</button>
                    <br></br>
                    <button >Buy Now</button>
                    <br></br>
                    already in cart: {this.state.data.qty}
                </div>
            
        )} else {
            return (
                <div>
                </div>
            )
        }
    }
}

export default Cart;