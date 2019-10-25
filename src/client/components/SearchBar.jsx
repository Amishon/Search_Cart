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
        this.getCartCount = this.getCartCount.bind(this);
    }

    handleSearchBarChange(event) {
        this.setState({searchString: event.target.value})
    }

    handleCategoryChange(event) {
        this.setState({category: event.target.value})
        console.log(this.state.category);
    }

    submitSearch(searchString) {
        console.log("submitting search", searchString);
        axios.get('/search/' + searchString)
            .then((res) => {
                console.log("submitSearch returned ", res.data.id)
                document.productID = res.data.id;
                //event listener to update cart info here
                const event = new CustomEvent('productChange', {detail : res.data.id});
                window.dispatchEvent(event);
            })
            .catch((err) => {
                console.log('submitSearch ERROR: ', err);
            })
    }

    getCartCount() {
        console.log("SearchBar's getCartCount invoked")
        axios.get('/cartCount')
            .then((res) => {     
                this.setState({
                    cartCount : res.data.reduce((acc, cur) => acc + cur.qty, 0)
                })
                console.log("getCartCount response = ", res.data)
                console.log("cartCount = ", this.state.cartCount)
            })
            .catch((err) => {
                console.log('getCartCount ERROR: ', err)
            }) 
    }

    componentDidMount() {
        window.addEventListener('addToCart', (event) => {
            console.log("addToCart event heard");
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
                                    <option value='0'>All</option>
                                    <option value='1'>Clothing</option>
                                    <option value='2'>Cooking</option>
                                    <option value='3'>Books</option>
                                    <option value='4'>Toys</option>
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