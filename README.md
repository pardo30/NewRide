# GRUPO RIDE - E-COMMERCE API

## Table of Contents
1. [Description](#Description)
2. [Stack of technologies](#Stack-of-technologies)
3. [Usage](#Usage)
4. [Database Schemas](#Database-schemas)
5. [EndPoints](#Endpoints)
5. [Collaboration](#Collaboration)
6. [License](#License)


## Description
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

### User Schema
|Name|Type|Unique|Required|Default|
|username|String|true|true|-|
|email|String|true|true|-|
|password|String|-|true|-|
|name|String|-|-|-|
|address|String|-|-|-|
|isAdmin|Boolean|-|-|false|
|date|Date|-|-|`Date.now`|

### Product Schema
### Order Schema and Cart Schema

## EndPoints

### User Endpoints
### Product Endpoints
### Order Endpoints and Cart Endpoints

## Collaboration
***
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
***
This app is released as open source under the terms of the [MIT License](https://choosealicense.com/licenses/mit/)
~~~
Copyright 2021 Pardo30

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
~~~