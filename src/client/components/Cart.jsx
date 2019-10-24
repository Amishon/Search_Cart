import React from 'react';
import axios from 'axios'

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionValue : 'Qty'
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
        return (
            <div className="jj-cart-container">
<<<<<<< HEAD
                <div className="jj-cart">
                    <div className="jj-cart-inner">
                        <div className="jj-cart-price-text">${this.state.data ? this.state.data.price : null}</div>
                        <span className="jj-cart-prime-status-container">
                            <div className="jj-cart-prime-status"><span className="jj-cart-prime-shipping-text">FREE One-Day</span></div>
                            <div className="jj-cart-stock-status">In Stock.</div>
                        </span>
                        <form>
                                <select className="jj-cart-qty-select" value={this.state.optionValue} onChange={this.handleChange}>
                                <option defaultValue disabled>Qty</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                            </select>
                        </form>
                        <div className="jj-cart-buttons-container">
                            <div className="jj-add-to-cart-button-container">
                                <button className = "jj-add-to-cart-button" onClick={this.addToCart.bind(this, Number(this.state.optionValue))}><span className="jj-add-to-cart-button-text" >Add to Cart</span></button>
                            </div>
                            <div className="jj-buy-now-button-container">
                                <button className = "jj-buy-now-button">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
=======
                <div className = 'jj-cart'>
                    <br></br>
                    <form>
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value = "1">1</option>
                            <option value = "2">2</option>
                            <option value = "3">3</option>
                        </select>
                    </form>
                    <button onClick={this.props.addToCart.bind(this, Number(this.state.value))}>Add to Cart</button>
                    <br></br>
                    <button onClick={this.props.getCartCount.bind(this)}>Cart Count</button>
                    <br></br>
                </div>
            </div>
        )}
>>>>>>> d262b09626919f3e36611c1250f79aca4deea972
}


export default Cart;