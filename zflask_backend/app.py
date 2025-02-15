from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract input parameters from JSON
        param1 = data.get("param1")  # year
        param2 = data.get("param2")  # totalApplications
        param3 = data.get("param3")  # averageGPA
        param4 = data.get("param4")  # marketingSpend
        param5 = data.get("param5")  # placementRate
        param6 = data.get("param6")  # program
        param7 = data.get("param7")  # totalIntake

        # Validate input
        if None in [param1, param2, param3, param4, param5, param6, param7]:
            return jsonify({"error": "Missing input parameters"}), 400

        # Load and prepare data
        df = pd.read_csv('error.csv')
        df['Placement Rate'] = df['Placement Rate'].str.replace('%', '').astype(float)
        
        # Encode programs
        encoder = LabelEncoder()
        df['Program'] = encoder.fit_transform(df['Program'])
        
        # Prepare features and target
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values
        
        # Split and train model
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        regressor = RandomForestRegressor(n_estimators=100, random_state=42)
        regressor.fit(X_train, y_train)

        # Encode the program input
        program_map = dict(zip(encoder.classes_, encoder.transform(encoder.classes_)))
        encoded_program = program_map.get(param6)
        
        if encoded_program is None:
            return jsonify({"error": f"Invalid program: {param6}"}), 400

        # Make prediction
        prediction = regressor.predict([[
            param1,  # year
            param2,  # totalApplications
            param3,  # averageGPA
            param4,  # marketingSpend
            param5,  # placementRate
            encoded_program,  # encoded program
            param7   # totalIntake
        ]])
        print(prediction)
        return jsonify({"prediction": prediction.tolist()})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)