import React from 'react';

class Cart extends React.Component {
    
    render() {
        if (this.props.info) {
            return (
                <div>
                    Name: {this.props.info.name}<br></br>
                    Price: {this.props.info.price}
                    <br></br>
                    <select>
                        <option value = "" disabled hidden>Qty</option>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                    </select>
                    <button onClick={this.props.addToCart(Number(this.value))}>ADD TO CART</button>
                    <br></br>
                    already in cart: {this.props.info.qty}
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