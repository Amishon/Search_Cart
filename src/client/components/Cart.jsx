import React from 'react';

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value : '1'
        };

        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({value : event.target.value});
    }
    
    render() {
        if (this.props.info) {
            return (
                <div className="container">
                    <div className="pull-right">
                        <div className="">
                            <div className="cartContainer">
                                Name: {this.props.info.name}<br></br>
                                Price: {this.props.info.price}
                                <br></br>
                                <form>
                                    <select value={this.state.value} onChange={this.handleChange}>
                                        <option value = "1">1</option>
                                        <option value = "2">2</option>
                                        <option value = "3">3</option>
                                    </select>
                                </form>
                                <button className="addToCartButton" onClick={this.props.addToCart.bind(this, Number(this.state.value))}>Add to Cart</button>
                                <br></br>
                                <button className="buyNowButton">Buy Now</button>
                                <br></br>
                                already in cart: {this.props.info.qty}
                            </div>
                        </div>
                    </div>
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