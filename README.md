Grocery Booking API

Documentation
groceries APIS

login: POST
http://localhost:3000/auth/login
Body

email
password

Register: POST
http://localhost:3000/auth/register

Body

name
email
password
confirmpassword

Admin -productadd: POST

http://localhost:3000/admin/productadd
﻿

Authorization
Bearer Token Token

Body
name
details
unit
price
inventory


Admin -product update: PUT

http://localhost:3000/admin/updateProduct
﻿

Authorization
Bearer Token

Body
name
details
unit
price
product_id
inventory
status

Admin -get Products: GET

http://localhost:3000/admin/getProducts


Authorization
Bearer Token

Admin -get Products LIST: GET
http://localhost:3000/admin/getProductsList
http://localhost:3000/admin/getProductsList
﻿

Authorization
Bearer Token

Admin -get remove product: GET
DELETE
http://localhost:3000/admin/deleteProduct


Authorization
Bearer Token

Query Params
id

Admin -get Products details: GET
GET
http://localhost:3000/admin/getProductsdetails


Authorization
Bearer Token

Query Params
id

User -get Products List: GET 

http://localhost:3000/products/getProductsList


User - add to cart: POST
http://localhost:3000/cart/addtocart


Body
product_id
qunatity
user_id
device_token


user -get Products details: GET
http://localhost:3000/products/getProductsdeatils?product_id=16


Query Params
product_id

user -get cart details: GET
GET
http://localhost:3000/cart/getCartDetails?user_id=1&token=

Query Params
user_id
token

user -update cart details: POST
http://localhost:3000/cart/updateCartQuantity

Body
product_id
cart_id
qunatity

user -add user address: POST
http://localhost:3000/user/addUserAddress

Body
user_id
name
phone
address
city
state
type_name
postal_code
is_default

user Update cart user:POST
http://localhost:3000/cart/updateCartuser

Body
cart_id
user_id
device_token

USER place order: POST
http://localhost:3000/order/placeOrder

Body
cart_id
user_id
address_id
payment_status

User get address:GET
http://localhost:3000/user/getUserAddress?user_id=1

Query Params
user_id

User get order deatils: GET
http://localhost:3000/order/getOrderDeatils?id=12

Query Params
id