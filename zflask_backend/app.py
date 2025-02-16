from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score

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
          # program
        param7 = data.get("param7")  # totalIntake

        # Validate input
        if None in [param1, param2, param3, param4, param5, param7]:
            return jsonify({"error": "Missing input parameters"}), 400

        # Load and prepare data
        df = pd.read_csv(r'error.csv')

        # Preprocess the data
        df['Placement Rate'] = df['Placement Rate'].str.replace('%', '').astype(float)
        encoder = LabelEncoder()
        df['Program'] = encoder.fit_transform(df['Program'])

        # Prepare features and target
        X = df.iloc[:, :-1].values
        y = df.iloc[:, -1].values

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

        # Train the RandomForestRegressor
        regressor = RandomForestRegressor(n_estimators=100, random_state=42)
        regressor.fit(X_train, y_train)

        # Make predictions on the test set
        y_pred = regressor.predict(X_test)

        # Calculate R2 score
        r2 = r2_score(y_test, y_pred)
        print(f"R2 Score: {r2:.2f}")

        # Create a mapping of encoded values to program names
        program_map = dict(zip(encoder.classes_, encoder.transform(encoder.classes_)))

        # Iterate over unique programs and make predictions
        predictions = []
        for program_name in encoder.classes_:
            # Get the encoded value for the program
            encoded_value = program_map.get(program_name)

            # Make a prediction for the current program
            prediction = regressor.predict([[param1, param2, param3, param4, param5, encoded_value, param7]])

            # Store the result in a dictionary
            predictions.append({
                "program": program_name,
                "prediction": prediction[0]
            })

        # Return the predictions as a JSON response
        return jsonify({"predictions": predictions})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)