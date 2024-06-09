import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score
import sys

# Load the dataset
food_items = [
    "burger", "butternaan", "chai", "chapati", "cholebhature",
    "dalmakhani", "dhokla", "friedrice", "idli", "jalebi",
    "kaathirolls", "kadaipaneer", "kulfi", "masaladosa",
    "momos", "paani_puri", "pakode", "pavbhaji", "pizza"
]

foodCategory = [
    "junkfood", "junkfood", "dairy", "bakeryandSteam", "other",
    "other", "bakeryandSteam", "other", "bakeryandSteam", "junkfood",
    "junkfood", "healthy", "dairy", "healthy", "junkfood", "other",
    "junkfood", "junkfood", "junkfood"
]

data = {
    "foodname": sum([[food] * 4 for food in food_items], []),
    "storage": ["no", "no", "yes", "yes"] * len(food_items),
    "weather": ["summer", "winter"] * (len(food_items) * 2),
    "foodCategories": sum([[category] * 4 for category in foodCategory], []),
    "noofdays": [0.5, 1, 2, 3,  # burger
                 1, 2, 2, 3,  # butternaan
                 1, 2, 3, 5,  # chai
                 1, 2, 3, 5,  # chapati
                 0.5, 1, 2, 3,  # cholebhature
                 2, 3, 4, 6,  # dalmakhani
                 1, 2, 3, 5,  # dhokla
                 1, 2, 2, 4,  # friedrice
                 1, 2, 3, 5,  # idli
                 1, 2, 3, 5,  # jalebi
                 0.5, 1, 2, 3,  # kaathirolls
                 1, 2, 3, 5,  # kadaipaneer
                 3, 5, 6, 8,  # kulfi
                 1, 2, 3, 5,  # masaladosa
                 1, 2, 2, 4,  # momos
                 1, 2, 2, 4,  # paani_puri
                 1, 2, 3, 5,  # pakode
                 0.5, 1, 2, 3,  # pavbhaji
                 1, 2, 3, 5  # pizza
                 ],
    "min_temp": [20, 20, 20, 20,  # burger
                 25, 25, 25, 25,  # butternaan
                 -5, -5, -5, -5,  # chai
                 15, 15, 15, 15,  # chapati
                 18, 18, 18, 18,  # cholebhature
                 -2, -2, -2, -2,  # dalmakhani
                 10, 10, 10, 10,  # dhokla
                 0, 0, 0, 0,  # friedrice
                 20, 20, 20, 20,  # idli
                 25, 25, 25, 25,  # jalebi
                 -5, -5, -5, -5,  # kaathirolls
                 15, 15, 15, 15,  # kadaipaneer
                 18, 18, 18, 18,  # kulfi
                 -2, -2, -2, -2,  # masaladosa
                 10, 10, 10, 10,  # momos
                 0, 0, 0, 0,  # paani_puri
                 20, 20, 20, 20,  # pakode
                 25, 25, 25, 25,  # pavbhaji
                 -5, -5, -5, -5  # pizza
                 ],
    "max_temp": [35, 35, 35, 35,  # burger
                 40, 40, 40, 40,  # butternaan
                 10, 10, 10, 10,  # chai
                 25, 25, 25, 25,  # chapati
                 30, 30, 30, 30,  # cholebhature
                 5, 5, 5, 5,  # dalmakhani
                 22, 22, 22, 22,  # dhokla
                 15, 15, 15, 15,  # friedrice
                 35, 35, 35, 35,  # idli
                 40, 40, 40, 40,  # jalebi
                 10, 10, 10, 10,  # kaathirolls
                 25, 25, 25, 25,  # kadaipaneer
                 30, 30, 30, 30,  # kulfi
                 5, 5, 5, 5,  # masaladosa
                 22, 22, 22, 22,  # momos
                 15, 15, 15, 15,  # paani_puri
                 35, 35, 35, 35,  # pakode
                 40, 40, 40, 40,  # pavbhaji
                 10, 10, 10, 10  # pizza
                 ]
}


df = pd.DataFrame(data)

# Create the target variable 'freshness' based on 'noofdays'
df['freshness'] = df.apply(lambda row: 'Fresh' if row['noofdays'] <= 2 else 'Spoiled', axis=1)

# Convert categorical variables into numerical format
df = pd.get_dummies(df, columns=["foodname", "storage", "weather"])

# Split the data into features and target variable
X = df.drop(columns=["noofdays", "foodCategories", "freshness"])
y = df["freshness"]

# Add a 'temp_within_range' feature
X['temp_within_range'] = 0

# Split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define the model
model = RandomForestClassifier(random_state=42)

# Define hyperparameters for grid search
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Perform Grid Search CV
grid_search = GridSearchCV(estimator=model, param_grid=param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train, y_train)

# Get the best model
best_model = grid_search.best_estimator_

# Evaluate on test set
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
# print("Test Accuracy:", accuracy)

# Example usage of the model
# def freshness(foodname, storage, weather, days, min_temp, max_temp):
#     input_data = {column: [0] for column in X.columns}
    
#     # Set the value to 1 for the specific food
#     input_data[f"foodname_{foodname}"] = [1]
    
#     # Add other features
#     input_data["storage_no"] = [1 if storage == "no" else 0]
#     input_data["storage_yes"] = [1 if storage == "yes" else 0]
#     input_data["weather_summer"] = [1 if weather == "summer" else 0]
#     input_data["weather_winter"] = [1 if weather == "winter" else 0]
    
#     # Determine if the temperature is within the min and max temperature range for this food
#     input_data["temp_within_range"] = [1 if min_temp <= max_temp else 0]
    
#     input_df = pd.DataFrame(input_data)
    
#     predicted_freshness = best_model.predict(input_df)[0]
    
#     # Determine freshness based on the model's prediction and the number of days
#     if input_data["temp_within_range"][0] == 1 and days <= 2:
#         return "Fresh"
#     else:
#         return "Spoiled"

# if len(sys.argv) != 7:
#     print("Usage: python script.py foodname storage weather days min_temp max_temp")
# else:
#     foodname = sys.argv[1]
#     storage = sys.argv[2]
#     weather = sys.argv[3]
#     days = int(sys.argv[4])
#     min_temp = float(sys.argv[5].replace(',', '.'))
#     max_temp = float(sys.argv[6])
    
#     # Validate foodname input
#     if f"foodname_{foodname}" not in X.columns:
#         print(f"Invalid foodname: {foodname}")
#         sys.exit(1)
    
#     result = freshness(foodname, storage, weather, days, min_temp, max_temp)
#     print(result)
    

import sys

def assess_food_quality(food_name, storage, weather, days_difference, min_temp, max_temp):
    input_data = {column: [0] for column in X.columns}
    
    # Set the value to 1 for the specific food
    input_data[f"foodname_{food_name}"] = [1]
    
    # Add other features
    input_data["storage_no"] = [1 if storage == "no" else 0]
    input_data["storage_yes"] = [1 if storage == "yes" else 0]
    input_data["weather_summer"] = [1 if weather == "summer" else 0]
    input_data["weather_winter"] = [1 if weather == "winter" else 0]
    
    # Determine if the temperature is within the min and max temperature range for this food
    input_data["temp_within_range"] = [1 if min_temp <= max_temp else 0]
    
    input_df = pd.DataFrame(input_data)
    # Some logic to assess food quality based on input parameters
    # For example:
    if input_data["temp_within_range"][0] == 1 and days_difference <= 2:
        return 'Fresh'
    else:
        return 'Not Fresh'

if __name__ == "__main__":
    if len(sys.argv) != 7:
        print("Usage: python food_quality.py <food_name> <storage> <weather> <days_difference> <min_temp> <max_temp>")
        sys.exit(1)
    
    food_name, storage, weather = sys.argv[1], sys.argv[2], sys.argv[3]
    days_difference, min_temp, max_temp = int(sys.argv[4]), float(sys.argv[5]), float(sys.argv[6])

    result = assess_food_quality(food_name, storage, weather, days_difference, min_temp, max_temp)
    print(result)


