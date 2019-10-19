import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            searchString : ''
        }

        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        
        
    }

    handleSearchBarChange(event) {
        this.setState({searchString: event.target.value})
    }

    render() {
        return (
            <div className="searchBarContainer">
                <h2 className="searchBarHeader">Search Amishon</h2>
                    <div className="search-bar">
                        <label id="nav-search-label">Search</label>
                        <span className="nav-facade-active" id="nav-auto-width-search-in">
                            <span id="nav-fixed-width-search-in-content">
                                All Categories
                            </span>
                            <span className="nav-down-arrow nav-sprite"></span>
                            <select title="Search In" className="searchSelect" id="searchDropdownBox" name="books_category">
                                <option value="1" defaultValue="Something">Something</option>
                                <option value="2" title="Clothes">Clothes</option>
                                <option value="3" title="Books">Books</option>
                                <option value="4" title="Toys">Toys</option>
                            </select>
                        </span>
                    <div className="nav-searchfield-outer nav-sprite">
                        <input type="text" id = "twotabsearchtextbox" value = {this.state.searchString} onChange = {this.handleSearchBarChange} placeholder="Search your Amish desires..."></input>
                    </div>
                    <div className="nav-submit-button">
                        <button className="nav-submit-input" title="Go" value="Go" onClick={this.props.submitSearch.bind(this, this.state.searchString)}>GO</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;