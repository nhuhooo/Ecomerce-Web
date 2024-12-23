from flask import Flask, render_template, request, jsonify
import pickle
import csv
import os
from datetime import datetime
import pandas as pd
import numpy as np
import joblib
import xgboost as xgb
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})
# Load models and scalers
xgb_model = joblib.load('models/xgb_model.pkl')
scaler_time = joblib.load('models/scaler_time.pkl')
scaler_numeric = joblib.load('models/numeric_scaler.pkl')
encoder = joblib.load('models/onehot_encoder.pkl')

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            # Receive JSON data
            data = request.get_json()
            
            # Log the incoming request data
            logging.debug("Incoming JSON data: %s", data)

            # Extracting the values from the JSON data
            created_at = data['createdAt']
            shipping_distance = float(data['shippingDistance'])
            service_type = data['serviceType']

            # Prepare the data for the model
            new_data_df = pd.DataFrame({
                'createdAt': [created_at],
                'shippingDistance': [shipping_distance],
                'serviceType': [service_type],
            })

            # Preprocess the data
            new_data_df['createdAt'] = pd.to_datetime(new_data_df['createdAt'])
            new_data_df['created_year'] = new_data_df['createdAt'].dt.year
            new_data_df['created_month'] = new_data_df['createdAt'].dt.month
            new_data_df['created_day'] = new_data_df['createdAt'].dt.day
            new_data_df['created_hour'] = new_data_df['createdAt'].dt.hour
            new_data_df['created_minute'] = new_data_df['createdAt'].dt.minute

            # Extract features
            time_features_new = new_data_df[['created_year', 'created_month', 'created_day', 'created_hour', 'created_minute']]
            time_features_scaled_new = scaler_time.transform(time_features_new)

            numeric_features_new = new_data_df[['shippingDistance']]
            numeric_features_scaled_new = scaler_numeric.transform(numeric_features_new)

            service_type_encoded_new = encoder.transform(new_data_df[['serviceType']])

            # Combine all features
            x_new = np.concatenate([time_features_scaled_new, numeric_features_scaled_new, service_type_encoded_new], axis=1)

            # Make prediction
            y_pred_new = xgb_model.predict(x_new)

            # Return the prediction as JSON, converting float32 to float
            return jsonify({"prediction": float(y_pred_new[0])})  # Convert to standard float

        except Exception as e:
            logging.error("Error occurred: %s", e)
            return jsonify({"error": str(e)}), 500

    # If GET request, render form
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=3000, debug=True)
