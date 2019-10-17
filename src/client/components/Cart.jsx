import React from 'react';

class Cart extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            
        }
    
    }

    render() {
        return (
        <div>
            Name: <br></br>
            Price:
            <br></br>
            <select>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "3">3</option>
            </select>
            <button >ADD TO CART</button>
        </div>
    )}
}

export default Cart;