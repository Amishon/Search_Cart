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
            <div>
                <input type="text" value = {this.state.searchString} onChange = {this.handleSearchBarChange} placeholder="Search your Amish desires..."></input>
                <button onClick={this.props.submitSearch.bind(this, this.state.searchString)}>search now</button>
            </div>
        )
    }
}

export default SearchBar;