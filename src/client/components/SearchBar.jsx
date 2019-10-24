import React from 'react';
import axios from 'axios'


class SearchBar extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            searchString : '',
            data : [],
            cartCount : 0
        }

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        
        
    }

    handleSearchBarChange(event) {
        this.setState({searchString: event.target.value})
    }

    submitSearch(searchString) {
        console.log("submitting search", searchString);
        axios.get('/search/' + searchString)
            .then((res) => {
                console.log("submitSearch returned ", res.data.id)
                document.productID = res.data.id;
                //event listener to update cart info here
                const event = new CustomEvent('productChange', {});
                window.dispatchEvent(event);
            })
            .catch((err) => {
                console.log('submitSearch ERROR: ', err);
            })
    }

    getCartCount() {
        console.log("SearchApp's getCartCount")
        axios.get('/cartCount')
            .then((res) => {     
                this.setState({
                    cartCount : res.data.reduce((acc, cur) => acc + cur.qty, 0)
                })
                console.log("cartCount = ", this.state.cartCount)
            })
            .catch((err) => {
                console.log('getCartCount ERROR: ', err)
            }) 
    }

    componentDidMount() {
        window.addEventListener('addToCart', (event) => {
            this.getCartCount();
        })
    }

    render() {
        return (
            <div className="nav-container">
                    <div className="search-bar-container">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <select className="categorySelect">
                                    <option>All</option>
                                    <option>Clothing</option>
                                    <option>Cooking</option>
                                    <option>Books</option>
                                    <option>Toys</option>
                                </select>
                            </span>
                            <input type="text" className="form-control" value = {this.state.searchString} onChange = {this.handleSearchBarChange} placeholder="Search for Clothing, Cooking, Books, and Toys..."></input>
                            <span className="input-group-addon">
                                <button className="buttonStyle" title="Go" value="Go" onClick={this.submitSearch.bind(this, this.state.searchString)}></button>
                            </span>
                        </div>
                    </div>
                <div className="nav-cart-img"><span className="nav-cart-text">{this.state.cartCount ? this.state.cartCount : null}</span></div>
            </div>
        ) 
    }
}

export default SearchBar;