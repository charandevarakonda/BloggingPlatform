Blogging Platform

This is a simple Full Stack Application on Blogging Platform, where the users can get signed in and make,edit and delete the blogs 

Libraries and Frameworks: React.js, Node.js, Express.js
Databases: MongoDB


Install dependencies

cd/Client 
npm install
npm start
run (http://localhost:3000)

cd/Server
npm install
nodemon server 
runs at (http://localhost:3100)

user Routes 

get users (http://localhost:3100/api/user)
signup (http://localhost:3100/api/user/signup)
Login (http://localhost:3100/api/user/login)

Blog Routes
get Blogs (http://localhost:3100/api/blog)
Add Blog (http://localhost:3100/api/blog/insertblog)
Update Blog (http://localhost:3100/api/blog/updateblog/:id)
Delete Blog (http://localhost:3100/api/blog/:id)



