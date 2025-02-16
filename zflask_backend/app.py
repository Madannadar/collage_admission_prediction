from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for the app, allowing requests from http://localhost:5173
CORS(app, origins=["http://localhost:5173"])

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
        param6 = data.get("param6")  # totalIntake

        # Load and preprocess the data
        df = pd.read_csv(r'error.csv')
        df['Placement Rate'] = df['Placement Rate'].str.replace('%', '').astype(float)
        
        # Encode the 'Program' column
        encoder = LabelEncoder()
        df['Program'] = encoder.fit_transform(df['Program'])
        
        # Prepare features and target
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        
        # Train the model
        regressor = RandomForestRegressor(n_estimators=100, random_state=42)
        regressor.fit(X_train, y_train)
        
        # Evaluate the model
        y_pred = regressor.predict(X_test)
        r2 = r2_score(y_test, y_pred)
        print(f"R2 Score: {r2:.2f}")
        
        # Prepare the response
        predictions = {}
        for program_name in encoder.classes_:
            encoded_value = encoder.transform([program_name])[0]
            prediction = regressor.predict([[param1, param2, param3, param4, param5, encoded_value, param6]])
            predictions[program_name] = prediction[0]

        # Calculate an overall prediction (e.g., average of all program predictions)
        overall_prediction = sum(predictions.values()) / len(predictions)

        # Return the predictions as JSON
        return jsonify({
            "prediction": overall_prediction,  # Add this field
            "program_predictions": predictions  # Optional: Include detailed predictions
        }), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)