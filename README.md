#Ganymede
Hi there! This is Ganymede, a NodeJs service developed with Typescript that allows web crawling in certain providers such as [Easy] (Easy.com.ar) and [Meli] (Mercadolibre.com.ar)

## How can we do it?
Ganymede exposes a REST API with 4 endpoints so that you can communicate with the service. This same one has database persistence in MongoDB.

### Create a Job
A job is a search instance, Ganymede will delegate this practice to another service called [Themisto] (https://github.com/FeliIsra/Themisto-) that will be in charge of crawling and returning the products found.
For this you have to make a POST call to https://ganymede-sirena.herokuapp.com/api/product/search with a body as follows
`{
    "query": "product-to-search",
    "provider": "provider", ["meli", "easy"]
    "callbackUrl": "url-where-you-want-the-answer"
} `

### Find a search by id
The searches are persisted in the DB, so it is easy to obtain one by id.
For this you have to make a GET call to https://ganymede-sirena.herokuapp.com/api/product/search-order/:id

### Find all searches
For this you have to make a GET call to https://ganymede-sirena.herokuapp.com/api/product/search-orders

### Search products by category
The products that return from [Themisto] (https://github.com/FeliIsra/Themisto-) will also be stored in the Ganymede DB, this means that they are easily accessible through such an endpoint.
For this you have to make a GET call to https://ganymede-sirena.herokuapp.com/api/product/category/:categoryId

### Ping
Finally, it also has a testing endpoint to know if the service is up. It is the following
https://ganymede-sirena.herokuapp.com/api/ping 
