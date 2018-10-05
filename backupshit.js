// Stringy PostCodeObj
const postData = querystring.stringify(postcodeObj)

// Post options
const options  = {
    hostname: 'api.postcodes.io',
    port: 443,
    path: '/postcodes',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length,
    }
}

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('postData', (d) => {
        process.stdout.write(d)
    })
})

req.on('error', (error) => {
    next(error)
})

req.write(postData)
console.log(postData);

req.end()