How to start the back end server with nodemon -> npm start

How to start the front end server -> npm start

The user can view the current cars, to add/edit/delet the user should log in.

How to Test with Postman:

1. GET Request: Navigate to http://localhost:3001/api to get the list of cars.

2. POST Request: To add a car, make a POST request to http://localhost:3001/api with a JSON body
   containing the make, model, and seats of the new car.

3. DELETE Request: To delete a car, make a DELETE request to http://localhost:3001/api/{id},
   replacing {id} with the ID of the car to delete.

4. PUT Request: To update a car, make a PUT request to http://localhost:3001/api/{id} with a JSON body
   containing the new model and/or number of seats.
