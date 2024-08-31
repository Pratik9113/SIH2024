# # from flask import Flask, request, jsonify
# # import pandas as pd
# # from sklearn.model_selection import train_test_split
# # from sklearn.linear_model import Lasso
# # from sklearn.preprocessing import StandardScaler, OneHotEncoder
# # from sklearn.compose import ColumnTransformer
# # from sklearn.pipeline import Pipeline
# # import numpy as np

# # # Initialize Flask app
# # app = Flask(__name__)

# # # Load the dataset and train the model
# # df = pd.read_csv('synthetic_surety_bond_data.csv')

# # # Split the data
# # X = df.drop('Surety_Bond_Amount', axis=1)
# # y = df['Surety_Bond_Amount']

# # categorical_features = ['Offense_Type', 'Criminal_Record', 'Socio_Economic_Status', 'Previous_Bail_Decisions']
# # numerical_features = ['Severity_Level', 'Monthly_Income', 'Assets', 'Liabilities']

# # preprocessor = ColumnTransformer(
# #     transformers=[
# #         ('num', StandardScaler(), numerical_features),
# #         ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
# #     ]
# # )

# # # Create and train the model
# # lasso_model = Pipeline(steps=[
# #     ('preprocessor', preprocessor),
# #     ('regressor', Lasso())
# # ])

# # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# # lasso_model.fit(X_train, y_train)

# # # Define a route for predictions
# # @app.route('/predict-surety', methods=['POST'])
# # def predict_surety_bond():
# #     data = request.json
# #     input_data = pd.DataFrame([data])

# #     # Preprocess the input data and make a prediction
# #     preprocessed_data = lasso_model.named_steps['preprocessor'].transform(input_data)
# #     prediction = lasso_model.named_steps['regressor'].predict(preprocessed_data)

# #     # Return the prediction as a JSON response
# #     return jsonify({'suretyAmount': prediction[0]})

# # if __name__ == '__main__':
# #     app.run(host='0.0.0.0', port=5000)  # Run Flask on port 5000



# from flask import Flask, request, jsonify
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import Lasso
# from sklearn.preprocessing import StandardScaler, OneHotEncoder
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline

# # Initialize Flask app
# app = Flask(__name__)

# # Load the dataset and train the model
# df = pd.read_csv('synthetic_surety_bond_data.csv')

# # Split the data
# X = df.drop('Surety_Bond_Amount', axis=1)
# y = df['Surety_Bond_Amount']

# categorical_features = ['Offense_Type', 'Criminal_Record', 'Socio_Economic_Status', 'Previous_Bail_Decisions']
# numerical_features = ['Severity_Level', 'Monthly_Income', 'Assets', 'Liabilities']

# preprocessor = ColumnTransformer(
#     transformers=[
#         ('num', StandardScaler(), numerical_features),
#         ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
#     ]
# )

# # Create and train the model
# lasso_model = Pipeline(steps=[
#     ('preprocessor', preprocessor),
#     ('regressor', Lasso())
# ])

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# lasso_model.fit(X_train, y_train)

# # Define a route for predictions
# @app.route('/predict-surety', methods=['POST'])
# def predict_surety_bond():
#     data = request.json
#     input_data = pd.DataFrame([data])
    
#     # Debugging output
#     print("Received data:", input_data)
    
#     try:
#         # Preprocess the input data
#         preprocessed_data = lasso_model.named_steps['preprocessor'].transform(input_data)
#         prediction = lasso_model.named_steps['regressor'].predict(preprocessed_data)
        
#         # Return the prediction as a JSON response
#         return jsonify({'suretyAmount': prediction[0]})
#     except Exception as e:
#         # Debugging output
#         print(f"Error: {e}")
#         return jsonify({'error': 'Error in processing request'}), 500

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)  # Run Flask on port 5000



from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Lasso
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

app = Flask(__name__)


df = pd.read_csv('synthetic_surety_bond_data.csv')


X = df.drop('Surety_Bond_Amount', axis=1)
y = df['Surety_Bond_Amount']

categorical_features = ['Offense_Type', 'Criminal_Record', 'Socio_Economic_Status', 'Previous_Bail_Decisions']
numerical_features = ['Severity_Level', 'Monthly_Income', 'Assets', 'Liabilities']

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numerical_features),
        ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
    ]
)


lasso_model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', Lasso())
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
lasso_model.fit(X_train, y_train)


@app.route('/predict-surety', methods=['POST'])
def predict_surety_bond():
    data = request.json
    input_data = pd.DataFrame([data])
    
    print("Received data:", input_data)
    
    try:
        preprocessed_data = lasso_model.named_steps['preprocessor'].transform(input_data)
        prediction = lasso_model.named_steps['regressor'].predict(preprocessed_data)
        
        return jsonify({'suretyAmount': prediction[0]})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Error in processing request', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Run Flask on port 5000
