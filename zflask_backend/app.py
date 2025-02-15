from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from flask import Blueprint, request, jsonify
import joblib  # Load ML model
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Route for the homepage
@app.route('/',methods =['GET'])
def home():
    return "prem"

# Sample API route
@app.route('/api/data')
def get_data():
    return jsonify({"<h1>message": "Hello from Flask!</h1>"})

# Create a Blueprint
ml_routes = Blueprint('ml_routes', __name__)

# Load your trained model (ensure model.pkl is in the same directory)

@ml_routes.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract input parameters from JSON
        param1 = data.get("param1")
        param2 = data.get("param2")
        param3 = data.get("param3")
        param4 = data.get("param4")
        param5 = data.get("param5")
        param6 = data.get("param6")
        param7 = data.get("param7")

        # Validate input
        if None in [param1, param2, param3, param4]:
            return jsonify({"error": "Missing input parameters"}), 400
        df=pd.read_csv(r'error.csv')
        df['Placement Rate'] = df['Placement Rate'].str.replace('%', '').astype(float)
        encoder= LabelEncoder()
        df['Program'] = encoder.fit_transform(df['Program'])
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)
        regressor = RandomForestRegressor(n_estimators = 100, random_state = 42)
        regressor.fit(X_train, y_train)
        y_pred = regressor.predict(X_test)
        np.set_printoptions(precision=2)
#print(np.concatenate((y_pred.reshape(len(y_pred),1), y_test.reshape(len(y_test),1)),1))
        from sklearn.metrics import r2_score
        r2_score(y_test, y_pred)
#(df.info())
        val=f'''{param6}'''
        map=dict(zip(encoder.classes_, encoder.transform(encoder.classes_)))
        value = map.get(f'''{val}''')  # Using .get() to avoid errors if "ECE" is not found

#print(f"Encoded value for ECE: {ece_value


        # Convert inputs to NumPy array
    
        prediction=regressor.predict([[param1, param2, param3, param4, param5, value, param7]])


        # Return the prediction result
        return jsonify({"prediction": prediction})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask server
