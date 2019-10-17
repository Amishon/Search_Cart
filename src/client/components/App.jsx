import React from 'react';
import Cart from './Cart.jsx'
import axios from 'axios'

class App extends React.Component {
    constructor () {
        super ()
        
        this.state = {
            data : []
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
        document.currentProduct = 1;
    }

    getData() {
        axios.get('/getData')
            .then((res) => {
                this.setState({
                    data : res.data
                })
            console.log(res.data)    
            })
        .catch((err) => {
            console.log(err)
        })    
    }


    render() {
        return <Cart />
    }
}

export default App;