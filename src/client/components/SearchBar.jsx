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
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8>">
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
                            <input type="text" className="form-control" value = {this.state.searchString} onChange = {this.handleSearchBarChange} placeholder="Search your Amish desires..."></input>
                            <span className="input-group-addon">
                                <button className="buttonStyle" title="Go" value="Go" onClick={this.props.submitSearch.bind(this, this.state.searchString)}></button>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}

export default SearchBar;