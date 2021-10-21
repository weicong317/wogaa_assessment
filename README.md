# WOGAA Assessment

## Project 1:
### nodejs-express-mysql
This is a node.js + express + MySQL application. The purpose of this application is to act as an API server to provide so that Project 2 can be use.
#### Prerequisite
MySql need to be installed as this application is using MySQL as database.
#### Setup
- .env needed to be created in the root of this project with below value
```sh
DB_HOST=_your_MySQL_host
DB_DATABASE=_your_MySQL_database
DB_USER=_your_MySQL_user
DB_PASSWORD=_your_MySQL_admin
```
> if the database is not existing, the application will create it
> if the tables needed are not existing, the application will create it
#### the default domain and port of this application if run locally would be localhost:3000 and it is not suggested to change it since same changes will need to apply in Project 2

## Project 2:
### rating-widget
This is a ReactJS widget application. The purpose of this application is to create a widget that can be later applied in any website by anyone.
#### Prerequisite
Project 1 need to be started before this widget is used.
> if the domain and port remain as default in Project 1, this widget can directly plug and use
> if the domain and port in Project 1 changed, changes need to be made in \src\App.js and rebuild the widget
```
line 10: const apiDomain = '_changed_domain_and_port';
```
#### Build Widget
run
```
yarn build:widget
or
npm run build:widget
```
and the newly compiled file will be in /docs
#### To use the widget
- Download index.js and index.css in /rating-widget/docs into a chosen path
- Insert the index.js and index.css into you html file
- Lastly, in your html file, declare a div dom with class "rating_widget" in any part of the html body but before the index.js will do
```
Example:
<head>
    <link href="_your_path_to_index.css" rel="stylesheet" />
</head
<body>
    <div class="rating_widget"></div>
    <script src="_your_path_to_index.js"></script>
</body>
```
