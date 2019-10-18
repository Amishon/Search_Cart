import React from 'react';
import Cart from './Cart.jsx'
import axios from 'axios'
import SearchBar from './SearchBar.jsx';

class App extends React.Component {
    constructor () {
        super ()
        
        this.state = {
            data : [],
        }
        this.getData = this.getData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    componentDidMount() {
        document.productID = 2;
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
    

    submitSearch(searchString) {
        console.log("submitting search", searchString);
        axios.get('/search/' + searchString)
            .then((res) => {
                console.log("submitSearch returned ", res.data[0].id)
                document.productID = res.data[0].id
                this.getData();
            })
            .catch((err) => {
                console.log('submitSearch ERROR: ', err);
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
        return (
            <div>
                <SearchBar submitSearch = {this.submitSearch}/>
                <Cart info = {this.state.data[0]} addToCart = {this.addToCart}/>
            </div>
        )
    }
}

export default App;