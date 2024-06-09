# Plugin Responsibility

## Admin
- Admin Dashboard has section name Shipping Cost.
- There Admin can insert Shipping price depends on Postal code and Street.
- Admin can edit that Shipping price list.


## User
- User can select city, postal code, street for Shipping. Those options are passed from admin Shipping provided list.
- User can see the Shipping cost based on selected shipping address and product weight.


## hook
- Create a new page name Shipping and make it woocommerce checkout page.
- When user will order a product, then calculate the shipping cost based on user select area and product weight. After update the price of that wc order.
- Show custom shipping area on that order of admin dahsboard.

