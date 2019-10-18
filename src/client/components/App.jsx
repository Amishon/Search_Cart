import React from 'react';
import Cart from './Cart.jsx'
import axios from 'axios'

class App extends React.Component {
    constructor () {
        super ()
        
        this.state = {
            data : [],
        }
        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        document.productID = 1;
        this.getData();
    }

    getData() {
        axios.get('/getData/' + document.productID)
            .then((res) => {
                this.setState({
                    data : res.data
                })
            })
        .catch((err) => {
            console.log('GETDATA ERROR: ', err)
        })    
    }

    addToCart(qty) {
        // event.preventDefault();
        axios.post('/addToCart', {
            qtyToAdd: qty,
            productNum : document.productID
        })
            .then((response) => {
                console.log("post success");
                this.getData();
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
    }

    render() {
        // {console.log(this.state.data[0])}
        return <Cart info = {this.state.data[0]} addToCart = {this.addToCart}/>
    }
}

export default App;