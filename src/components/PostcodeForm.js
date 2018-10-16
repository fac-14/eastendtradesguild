import React from 'react'
import styled from 'styled-components'




export default ({ handleSubmit, value }) => {

    const handle = (event) => {
        event.preventDefault()
        const data = JSON.stringify(value)
        console.log('Fake submitting...', data)
    }

    return (
        <form onSubmit={handle}>
            <label htmlFor='postcode'>Postcode:</label>
            <input type='text' id='postcode' name='postcode' value={value} onChange={handle} />
            <button type="submit">Submit</button>
        </form>
    )
}