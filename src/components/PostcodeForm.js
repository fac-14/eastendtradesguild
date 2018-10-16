import React from 'react'

export default class Form extends React.Component {

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label htmlFor='postcode'>Postcode:</label>
                <input type='text' id='postcode' name='postcode' value={this.props.postcode} onChange={this.props.onChange} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}