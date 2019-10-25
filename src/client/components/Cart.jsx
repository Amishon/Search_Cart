import React from 'react';
import axios from 'axios'

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionValue : 'Qty',
            currentProduct: 1
        };

        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // window.addEventListener('productChange', (event) => {
        //     console.log("eventListener productId", window.productID)
        //     this.getData();
        // })

        window.addEventListener('updateProduct', (event) => {
            this.setState({
                currentProduct: event.detail
            })
        })

        console.log("componentDidMount productId", window.productID)
        this.getData();
    }

    getData() {
        console.log("getData invoked, productID = ", document.productID);
        axios.get('/getData/' + this.state.productID)
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

    updateQty(qty) {
        const event = new CustomEvent('addToCart', {
            detail: qty
        });
        window.dispatchEvent(event);
    }

    addToCart() {
        let qty = Number(this.state.optionValue);

        this.updateQty(qty);

        axios.post('/addToCart', {
            qtyToAdd: qty,
            productNum : this.state.currentProduct
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

    render() {
        return (
            <div className="jj-cart-container">
                <div className="jj-cart">
                    <div className="jj-cart-inner">
                        <div className="jj-cart-price-text">${this.state.data ? this.state.data.price : null}</div>
                        <span className="jj-cart-prime-status-container">
                            <div className="jj-cart-prime-status"><span className="jj-cart-prime-shipping-text">FREE One-Day</span></div>
                            <div className="jj-cart-stock-status">In Stock.</div>
                        </span>
                        <form>
                                <select className="jj-cart-qty-select" value={this.state.optionValue} onChange={this.handleChange}>
                                <option defaultValue disabled>Qty: {this.state.option}</option>
                                <option value = "1">1</option>
                                <option value = "2">2</option>
                                <option value = "3">3</option>
                            </select>
                        </form>
                        <div className="jj-cart-buttons-container">
                            <div className="jj-add-to-cart-button-container">
                                <button className = "jj-add-to-cart-button" onClick={this.addToCart.bind(this)}><span className="jj-add-to-cart-button-text" >Add to Cart</span></button>
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
}


export default Cart;