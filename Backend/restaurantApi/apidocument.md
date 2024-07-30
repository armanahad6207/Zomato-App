## page 1 (home page)

list of city/locations
http://localhost:3000/location

list of QuickSearch/mealtype
http://localhost:3000/mealtype

list of mealtype
http://localhost:3000/restaurant

restaurant wrt State_id
http://localhost:3000/restaurant?state_id=1

## page 2

restauran wrt mealid
http://localhost:3000/restaurant?mealId=6

restuarant wrt cuisine and meal
http://localhost:3000/filter/3?cuisineId=3

restaurant wrt cost and meal
http://localhost:3000/filter/3?lcost=400&&hcost=600

restaurant wrt sort
http://localhost:3000/filter/1?lcost=400&&hcost=1000&sort=1

## page 3

details of restaurant
http://localhost:3000/details/1

menu of reataurant
http://localhost:3000/menu/2

## page 4

menu items[POST]
http://localhost:3000/menuItem

placeorder[POST]
http://localhost:3000/placeorder

## page 5

list of order
http://localhost:3000/orders

list of order wrt mail
http://localhost:3000/orders?email=jack@gmail.com

update payment details
http://localhost:3000/updateOrder/2

delete orders

http://localhost:3000/deleteOrder/3

## C R U D ---------

C-CREATE => POST
R-READ => GET
U-UPDATE => PUT
D-DELETE => DELETE
