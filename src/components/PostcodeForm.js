import React from 'react'

export default class Form extends React.Component {

    state = {
        postcode: '',
        geolocation: [] || ''
    }

    apiCallGeo = postcode => {
        fetch(`https://api.postcodes.io/postcodes/${postcode}`)
            .then(res => res.json())
            .then(json => this.createLatLongArr(json))
            .then(array => this.setState({ geolocation: array }))
            .then(console.log(this.state.geolocation))
    }

    createLatLongArr = object => {
        if (object.status === 404) {
            return object.error
        }
        return [Object.values(object.result)[6], Object.values(object.result)[7]]
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({ postcode: value })
    }

    handleSubmit = event => {
        event.preventDefault();
        const postcode = this.state.postcode;
        this.apiCallGeo(postcode)
        // .then(this.setState({ geolocation: }))

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='postcode'>Postcode:</label>
                <input type='text' id='postcode' name='postcode' value={this.state.postcode} onChange={this.handleChange} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}