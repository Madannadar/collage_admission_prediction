import os
import requests

# URL of the CSV file
csv_url = "http://res.cloudinary.com/diwcd954n/raw/upload/v1739620742/e0zjdeb1evmodsxdhyjr.csv"

# Define the folder where the CSV file will be saved
SAVE_FOLDER = "zflask_backend"
os.makedirs(SAVE_FOLDER, exist_ok=True)  # Ensure the folder exists

# Get the filename from the URL
filename = os.path.join(SAVE_FOLDER, csv_url.split("/")[-1])

try:
    # Download the CSV file
    response = requests.get(csv_url)
    
    # Check if the download was successful
    if response.status_code == 200:
        # Save the file to the backend folder
        with open(filename, "wb") as file:
            file.write(response.content)
        
        print(f"CSV file downloaded successfully: {filename}")
    else:
        print(f"Failed to download CSV. Status code: {response.status_code}")

except Exception as e:
    print(f"Error: {str(e)}")
