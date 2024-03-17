from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import bcrypt  # For password hashing
# from threading import Thread
# import time

app = Flask(__name__)
CORS(app)

timeout = 10
connection = pymysql.connect(
    charset="utf8mb4",
    connect_timeout=timeout,
    cursorclass=pymysql.cursors.DictCursor,
    db="defaultdb",
    host="vaatika-zone-vaatikazone.a.aivencloud.com",
    password="AVNS_vzD7mTZI0JYhFn9sz5h",
    read_timeout=timeout,
    port=10776,
    user="avnadmin",
    write_timeout=timeout,
)

@app.route('/api/deleteFarmerProfile')
def delete_farmer_profile():
    try:
        farmerId = int(request.args.get('farmerId'))
        print(farmerId)
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM admin_farmer_details WHERE farmer_id = %s", (farmerId))
            print('query executed successfully')
            connection.commit()
            cursor.close()
        return jsonify({"message": "Profile deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/editFarmerProfile', methods=['PUT'])
def edit_farmer_profile():
    print('edit api called')
    try:
        data=request.json
        farmerId = int(request.args.get('farmerId'))
        print(farmerId)
        farmerName = data.get('username')
        farmerEmail = data.get('email')
        farmerPhone = data.get('phone')
        farmerAddress = data.get('address')
        farmerPassword = data.get('password')
        cursor = connection.cursor()
        cursor.execute("UPDATE admin_farmer_details SET farmer_name = %s, email = %s, phone_number = %s, address = %s, password = %s WHERE farmer_id = %s",
        (farmerName, farmerEmail, farmerPhone, farmerAddress, farmerPassword, farmerId))
        connection.commit()
        cursor.close()
        return jsonify({"message": "Profile updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/editRetailerProfile', methods=['PUT'])
def edit_retailer_profile():
    print('edit api called')
    try:
        data=request.json
        retailerId = int(request.args.get('retailerId'))
        print(retailerId)
        retailerName = data.get('username')
        retailerEmail = data.get('email')
        retailerPhone = data.get('phone')
        retailerAddress = data.get('address')
        retailerPassword = data.get('password')
        cursor = connection.cursor()
        cursor.execute("UPDATE admin_retailer_details SET retailer_name = %s, email = %s, phone_number = %s, address = %s, password = %s WHERE retailer_id = %s",
        (retailerName, retailerEmail, retailerPhone, retailerAddress, retailerPassword, retailerId))
        connection.commit()
        cursor.close()
        return jsonify({"message": "Profile updated successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/editAdminProfile', methods=['PUT'])
def edit_admin_profile():
    print('edit api called')
    try:
        data=request.json
        adminId = int(request.args.get('adminId'))
        print(adminId)
        adminName = data.get('username')
        adminEmail = data.get('email')
        adminPhone = data.get('phone')
        adminAddress = data.get('address')
        adminPassword = data.get('password')
        cursor = connection.cursor()
        cursor.execute("UPDATE admin_details SET username = %s, email = %s, phone_number = %s, address = %s, password = %s WHERE id = %s",
        (adminName, adminEmail, adminPhone, adminAddress, adminPassword, adminId))
        connection.commit()
        cursor.close()
        return jsonify({"message": "Profile updated successfully"}), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    username = data.get('username')
    mobilenumber = data.get('mobilenumber')
    password = data.get('password')
    confirmpassword = data.get('confirmpassword')
    userType = data.get('userType')

    if password != confirmpassword:
        response = jsonify({"message": "Passwords do not match"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    if userType == 'farmer':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM admin_farmer_details WHERE email = %s", (email,))
            user = cursor.fetchone()
            if user is not None:
                return jsonify({"message": "Farmer already exists"}), 404

            cursor.execute('INSERT INTO `admin_farmer_details` (`farmer_name`, `email`, `phone_number`, `password`) VALUES (%s, %s, %s, %s)',
                           (username, email, mobilenumber, password))
            connection.commit()

            # Fetch the inserted user details
            cursor.execute("SELECT * FROM admin_farmer_details WHERE email = %s", (email,))
            user = cursor.fetchone()

            response = jsonify({
                "farmerId": user['farmer_id'],
                "farmerName": user['farmer_name'],
                "farmerEmail": user['email'],
                "farmerPhone": user['phone_number'],
                "farmerAddress": user['address'],
                "farmerPassword": user['password']
            })
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response

    elif userType == 'retailer':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM admin_retailer_details WHERE email = %s", (email,))
            user = cursor.fetchone()
            if user is not None:
                return jsonify({"message": "Retailer already exists"}), 404

            cursor.execute('INSERT INTO `admin_retailer_details` (`retailer_name`, `email`, `phone_number`, `password`) VALUES (%s, %s, %s, %s)',
                           (username, email, mobilenumber, password))
            connection.commit()

            # Fetch the inserted user details
            cursor.execute("SELECT * FROM admin_retailer_details WHERE email = %s", (email,))
            user = cursor.fetchone()

            response = jsonify({
                "retailerId": user['retailer_id'],
                "retailerName": user['retailer_name'],
                "retailerEmail": user['email'],
                "retailerPhone": user['phone_number'],
                "retailerAddress": user['address'],
                "retailerPassword": user['password']
            })
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response

    response = jsonify({"message": "Invalid user type"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    userType=data.get('userType')

    # Query the database to fetch user details based on email
    if userType=='farmer':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM admin_farmer_details WHERE email = %s", (email,))
            user = cursor.fetchone()

        if user:
            # If user found, check if the entered password matches the password in the database
            if user['password'] == password:
                print('New farmer', user['farmer_name'], 'is added successfully')
                # Passwords match, return success response
                return jsonify({
                    "farmerId": user['farmer_id'], 
                    "farmerName": user['farmer_name'], 
                    "farmerEmail": user['email'], 
                    "farmerPhone": user['phone_number'], 
                    "farmerAddress": user['address'],
                    "farmerPassword": user['password'],}), 200
            else:
                # Passwords do not match, return error response
                return jsonify({"message": "Invalid password"}), 401
        else:
            # User not found, return error response
            return jsonify({"message": "User not found"}), 404
    
    else:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM admin_retailer_details WHERE email = %s", (email,))
            user = cursor.fetchone()

        if user:
            # If user found, check if the entered password matches the password in the database
            if user['password'] == password:
                # Passwords match, return success response
                return jsonify({
                    "retailerId": user['retailer_id'], 
                    "retailerName": user['retailer_name'], 
                    "retailerEmail": user['email'], 
                    "retailerPhone": user['phone_number'], 
                    "retailerAddress": user['address'],
                    "retailerPassword": user['password'],
                }), 200
            else:
                # Passwords do not match, return error response
                return jsonify({"message": "Invalid password"}), 401
        else:
            # User not found, return error response
            return jsonify({"message": "User not found"}), 404
        
@app.route('/api/adminLogin', methods=['POST'])
def admin_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    with connection.cursor() as cursor:
        cursor.execute("SELECT COUNT(product_id) FROM admin_product_details")
        product_count = cursor.fetchone()['COUNT(product_id)']  # Fetch the count from the result

        cursor.execute("SELECT COUNT(retailer_id) FROM admin_retailer_details")
        retailer_count = cursor.fetchone()['COUNT(retailer_id)']  # Fetch the count from the result

        cursor.execute("SELECT COUNT(farmer_id) FROM admin_farmer_details")
        farmer_count = cursor.fetchone()['COUNT(farmer_id)']  # Fetch the count from the result

    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM admin_details WHERE email = %s", (email,))
        user = cursor.fetchone()

    if user:
        # If user found, check if the entered password matches the password in the database
        if user['password'] == password:
            # Passwords match, return success response
            return jsonify({
                "adminId": user['id'], 
                "adminName": user['username'], 
                "adminEmail": user['email'], 
                "adminPhone": user['phone_number'], 
                "adminAddress": user['address'],
                "adminPassword": user['password'],
                "retailerCount": retailer_count,
                "farmerCount": farmer_count,
                "productCount": product_count }), 200
        else:
            # Passwords do not match, return error response
            return jsonify({"message": "Invalid password"}), 401
    else:
        # User not found, return error response
        return jsonify({"message": "User not found"}), 404

@app.route('/api/getFarmerProducts')
def get_farmer_products():
    farmerId = request.args.get('farmerId')
    print("Products for farmer id:", farmerId)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM admin_product_details where farmer_id = %s", (farmerId,))
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

@app.route('/api/getAllProducts')
def get_All_products():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM admin_product_details")
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

@app.route('/api/getDashboardProducts')
def get_dashboard_products():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM admin_dashboard")
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

@app.route('/api/getAllFarmers')
def get_All_farmers():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM admin_farmer_details")
    farmers = cursor.fetchall()
    cursor.close()
    return jsonify(farmers)

@app.route('/api/getAllRetailers')
def get_All_retailers():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM admin_retailer_details")
    retailers = cursor.fetchall()
    cursor.close()
    return jsonify(retailers)

@app.route('/api/addFarmerProduct', methods=['POST'])
def add_farmer_product():
    farmerId = request.args.get('farmerId')
    print("Adding Product for farmer id:", farmerId)
    data = request.json
    price = int(data['productPrice'])
    in_stock = int(data['productQuantity'])
    print('Farmer name is:',data['farmerName'])
    print('Product name is:',data['productName'])
    cursor = connection.cursor()
    cursor.execute("INSERT INTO admin_product_details (product_name, description, category, farmer_id, farmer_name, price, in_stock, date_of_listing) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                   (data['productName'], data['productDescription'], data['productCategory'], farmerId, data['farmerName'], price, in_stock, data['date']))
    connection.commit()
    cursor.close()
    response = jsonify({"message": "Product added successfully"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/addAdminProduct', methods=['POST'])
def add_admin_product():
    data = request.json
    farmer_id = int(data['farmerID'])
    price = int(data['productPrice'])
    in_stock = int(data['productQuantity'])
    print('Farmer name is:',data['farmerName'])
    print('Product name is:',data['productName'])
    cursor = connection.cursor()
    cursor.execute("INSERT INTO admin_dashboard (product_name, description, category, farmer_id, farmer_name, price, in_stock, date_of_listing) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                   (data['productName'], data['productDescription'], data['productCategory'], farmer_id, data['farmerName'], price, in_stock, data['date']))
    connection.commit()
    cursor.close()
    response = jsonify({"message": "Product added successfully"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/", methods=['GET'])
def home():
    data={
        "message": "Hello this is home",
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)


# def run_server():
#     app.run(host='0.0.0.0', port=5000)  # Run Flask server

# def check_server():
#     while True:
#         try:
#             # Check the health of the server periodically
#             time.sleep(6)
#             # Perform a dummy database query to check the connection
#             db = pymysql.connect(host='your_host', user='your_user', password='your_password', database='your_database')
#             db.close()
#         except pymysql.err.InterfaceError as e:
#             print("InterfaceError occurred. Restarting server...")
#             # Restart the server by stopping the current thread and starting a new one
#             thread = Thread(target=run_server)
#             thread.start()

# if __name__ == "__main__":
#     server_thread = Thread(target=run_server)
#     server_thread.start()
    
#     # Start a separate thread to periodically check the server health
#     check_thread = Thread(target=check_server)
#     check_thread.start()