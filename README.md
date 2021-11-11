# GRUPO RIDE - E-COMMERCE API

## Table of Contents
1. [Description](#Description)
2. [Stack of technologies](#Stack-of-technologies)
3. [Usage](#Usage)
4. [Database Schemas](#Database-schemas)
5. [EndPoints](#Endpoints)
6. [Middelwares](#Middelwares)
7. [Collaboration](#Collaboration)
8. [License](#License)


## Description
***
This application has been designed for the future Ride Group's e-commerce, dedicated to the distribution of furniture and bathroom elements. It is an academic exercise within the Backend Express Bootcamp of [GeeksHubs Academy](#https://bootcamp.geekshubsacademy.com/online/backend-express/).

This API has been divided into 3 sections: users, products and orders. Within each of these sections there are different degrees of access, controlled through middelwares.

## Stack of technologies
***
A list of technologies used within the project:
- NodeJS
- Express
- Mongoose
- GIT

## Usage
***

- Clone this repository `git https://github.com/pardo30/NewRide.git`

- `npm install`

- Install packages
```
    #Dependencies:
    npm i express #
    npm i dotenv #
    npm i mongoose #
    npm i jsonwebtoken #
    npm i bcyptjs #
    npm i cors #
    #Developer Dependencies:
    npm i morgan --save-dev #
    npm i nodemon --save-dev #
```
- Create .env file with port (PORT), Token Private Key (PRIVATE_KEY) and mongourl for your database (DB_URI)

- `npm run dev #development script`

- `npm run #run API`

## Database Schemas
***
### User Schema
|Name    |Type   |Unique|Required|Default   |
|:-------|:-----:|:----:|:------:|:--------:|
|username|String |true  |true    |-         |
|email   |String |true  |true    |-         |
|password|String |-     |true    |-         |
|name    |String |-     |-       |-         |
|address |String |-     |-       |-         |
|isAdmin |Boolean|-     |-       |false     |
|date    |Date   |-     |-       |`Date.now`|

### Product Schema
|Name       |Type   |Unique|Required|Default   |Index|
|:----------|:-----:|:----:|:------:|:--------:|:---:|
|refCode    |String |true  |true    |-         |true |
|name       |String |-     |true    |-         |true |
|category   |String |-     |true    |-         |true |
|description|String |-     |-       |-         |true |
|image      |String |-     |true    |-         |-    |
|price      |Number |-     |true    |-         |-    |
|stock      |Number |-     |true    |-         |-    |
|date       |Date   |-     |-       |`Date.now`|-    |

### Cart Schema
|Name  |         |Type                   |Unique|Required|Default|
|:-----|:--------|:---------------------:|:----:|:------:|:-----:|
|userID|         |`Schema.Types.ObjectId`|-     |true    |-      |
|items |productID|`Schema.Types.ObjectId`|-     |true    |-      |
|      |quantity |Number                 |-     |true    |-      |
|      |subtotal |Number                 |-     |-       |-      |
|total |         |Number                 |-     |        |0      |

### Order Schema
|Name  |         |Type                   |Unique|Required|Default   |
|:-----|:--------|:---------------------:|:----:|:------:|:--------:|
|userID|         |`Schema.Types.ObjectId`|-     |true    |-         |
|items |productID|`Schema.Types.ObjectId`|-     |true    |-         |
|      |quantity |Number                 |-     |true    |-         |
|      |subtotal |Number                 |-     |-       |-         |
|total |         |Number                 |-     |        |0         |
|date  |         |Date                   |-     |-       |`Date.now`|

## EndPoints
***
### User Endpoints
|Endpoint |HTTP Method|Usage|Returns|Requires Auth|Requires Admin|
|:---|:-----:|:---------------------|:----|:------:|:--------:|
|`/user/register`|`POST`|Accepts the username, name, email, password and address of the user.|message: 'User created successfully.'| NO | NO |
|`/user/registerAdmin`|`POST`|Accepts the username, name, email, password and isAdmin of the admin.|message: 'Admin created successfully.'| NO | YES |
|`/user/login`|`POST`|Call the API with email and password.|JWT Token| NO | NO |
|`/user/userProfil`|`GET`|Call the API with usedID from required JWT token.|JSON data of the user details.| YES | NO |
|`/user/getAllUsers`|`GET`|Call the API with admin status from required JWT token.|JSON data of all users details.| NO | YES |
|`/user/orders`|`GET`|Call the API with usedID from required JWT token.|JSON data of all the user orders.| YES | NO |
|`/user/updateUserProfil`|`PUT`|Call the API with with usedID from required JWT token and the details that are to be changed from body.|message: 'User successfully updated.'| YES | NO |
|`/user/deleteUserProfil`|`DELETE`|Call the API with usedID from required JWT token.|message: 'User successfully deleted.'| YES | NO |


### Product Endpoints
### Order Endpoints and Cart Endpoints

## Middelwares
***

## Collaboration
***
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
***
This app is released as open source under the terms of the [MIT License](https://choosealicense.com/licenses/mit/)
Copyright 2021 Pardo30

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
~~~
