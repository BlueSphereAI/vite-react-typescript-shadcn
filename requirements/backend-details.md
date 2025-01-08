# Backend Detailed Requirements Documentation

## API Endpoints

This section provides detailed documentation for the REST API endpoints required for each database model excluding user authentication.

### Procedures API

1. **Get All Procedures**
   - **Endpoint**: `/api/procedures`
   - **Method**: `GET`
   - **Description**: Retrieves a list of all medical procedures available for comparison.
   - **Response**:
     ```json
     [
       {
         "procedure_id": 1,
         "name": "Knee Replacement",
         "description": "Procedure details..."
       },
       ...
     ]
     ```

2. **Get Procedure by ID**
   - **Endpoint**: `/api/procedures/{procedure_id}`
   - **Method**: `GET`
   - **Parameters**: `procedure_id` (path) - ID of the procedure
   - **Description**: Retrieves details of a specific procedure by its ID.
   - **Response**:
     ```json
     {
       "procedure_id": 1,
       "name": "Knee Replacement",
       "description": "Procedure details..."
     }
     ```

3. **Add New Procedure**
   - **Endpoint**: `/api/procedures`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "Hip Replacement",
       "description": "Procedure details..."
     }
     ```
   - **Description**: Adds a new medical procedure to the database.
   - **Response**:
     ```json
     {
       "procedure_id": 2,
       "name": "Hip Replacement",
       "description": "Procedure details..."
     }
     ```

4. **Update Procedure**
   - **Endpoint**: `/api/procedures/{procedure_id}`
   - **Method**: `PUT`
   - **Parameters**: `procedure_id` (path) - ID of the procedure
   - **Request Body**:
     ```json
     {
       "name": "Updated Procedure Name",
       "description": "Updated description..."
     }
     ```
   - **Description**: Updates the details of an existing medical procedure.
   - **Response**:
     ```json
     {
       "procedure_id": 2,
       "name": "Updated Procedure Name",
       "description": "Updated description..."
     }
     ```

5. **Delete Procedure**
   - **Endpoint**: `/api/procedures/{procedure_id}`
   - **Method**: `DELETE`
   - **Parameters**: `procedure_id` (path) - ID of the procedure
   - **Description**: Deletes a medical procedure from the database.
   - **Response**: `204 No Content`

### Facilities API

1. **Get All Facilities**
   - **Endpoint**: `/api/facilities`
   - **Method**: `GET`
   - **Description**: Retrieves a list of all medical facilities.
   - **Response**:
     ```json
     [
       {
         "facility_id": 1,
         "name": "Global Health Center",
         "location": "Mexico",
         "certifications": "Certified details...",
         "doctor_info": "Doctor details...",
         "patient_reviews": "Review details..."
       },
       ...
     ]
     ```

2. **Get Facility by ID**
   - **Endpoint**: `/api/facilities/{facility_id}`
   - **Method**: `GET`
   - **Parameters**: `facility_id` (path) - ID of the facility
   - **Description**: Retrieves details of a specific medical facility by its ID.
   - **Response**:
     ```json
     {
       "facility_id": 1,
       "name": "Global Health Center",
       "location": "Mexico",
       "certifications": "Certified details...",
       "doctor_info": "Doctor details...",
       "patient_reviews": "Review details..."
     }
     ```

3. **Add New Facility**
   - **Endpoint**: `/api/facilities`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "New Health Facility",
       "location": "India",
       "certifications": "Certified details...",
       "doctor_info": "Doctor details...",
       "patient_reviews": "Review details..."
     }
     ```
   - **Description**: Adds a new medical facility to the database.
   - **Response**:
     ```json
     {
       "facility_id": 2,
       "name": "New Health Facility",
       "location": "India",
       "certifications": "Certified details...",
       "doctor_info": "Doctor details...",
       "patient_reviews": "Review details..."
     }
     ```

4. **Update Facility**
   - **Endpoint**: `/api/facilities/{facility_id}`
   - **Method**: `PUT`
   - **Parameters**: `facility_id` (path) - ID of the facility
   - **Request Body**:
     ```json
     {
       "name": "Updated Health Facility",
       "location": "Updated location",
       "certifications": "Updated certified details...",
       "doctor_info": "Updated doctor details...",
       "patient_reviews": "Updated review details..."
     }
     ```
   - **Description**: Updates the details of an existing medical facility.
   - **Response**:
     ```json
     {
       "facility_id": 2,
       "name": "Updated Health Facility",
       "location": "Updated location",
       "certifications": "Updated certified details...",
       "doctor_info": "Updated doctor details...",
       "patient_reviews": "Updated review details..."
     }
     ```

5. **Delete Facility**
   - **Endpoint**: `/api/facilities/{facility_id}`
   - **Method**: `DELETE`
   - **Parameters**: `facility_id` (path) - ID of the facility
   - **Description**: Deletes a medical facility from the database.
   - **Response**: `204 No Content`

### PriceComparisons API

1. **Get All Price Comparisons**
   - **Endpoint**: `/api/price_comparisons`
   - **Method**: `GET`
   - **Description**: Retrieves all price comparisons between facilities.
   - **Response**:
     ```json
     [
       {
         "comparison_id": 1,
         "procedure_id": 1,
         "facility_id": 1,
         "country_id": 2,
         "us_price": 20000,
         "international_price": 8000,
         "travel_cost": 1500
       },
       ...
     ]
     ```

2. **Get Price Comparison by ID**
   - **Endpoint**: `/api/price_comparisons/{comparison_id}`
   - **Method**: `GET`
   - **Parameters**: `comparison_id` (path) - ID of the price comparison
   - **Description**: Retrieves a specific price comparison by its ID.
   - **Response**:
     ```json
     {
       "comparison_id": 1,
       "procedure_id": 1,
       "facility_id": 1,
       "country_id": 2,
       "us_price": 20000,
       "international_price": 8000,
       "travel_cost": 1500
     }
     ```

3. **Add New Price Comparison**
   - **Endpoint**: `/api/price_comparisons`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "procedure_id": 1,
       "facility_id": 2,
       "country_id": 3,
       "us_price": 25000,
       "international_price": 10000,
       "travel_cost": 2000
     }
     ```
   - **Description**: Adds a new price comparison entry.
   - **Response**:
     ```json
     {
       "comparison_id": 3,
       "procedure_id": 1,
       "facility_id": 2,
       "country_id": 3,
       "us_price": 25000,
       "international_price": 10000,
       "travel_cost": 2000
     }
     ```

4. **Update Price Comparison**
   - **Endpoint**: `/api/price_comparisons/{comparison_id}`
   - **Method**: `PUT`
   - **Parameters**: `comparison_id` (path) - ID of the price comparison
   - **Request Body**:
     ```json
     {
       "us_price": 26000,
       "international_price": 10500,
       "travel_cost": 2100
     }
     ```
   - **Description**: Updates an existing price comparison's details.
   - **Response**:
     ```json
     {
       "comparison_id": 3,
       "procedure_id": 1,
       "facility_id": 2,
       "country_id": 3,
       "us_price": 26000,
       "international_price": 10500,
       "travel_cost": 2100
     }
     ```

5. **Delete Price Comparison**
   - **Endpoint**: `/api/price_comparisons/{comparison_id}`
   - **Method**: `DELETE`
   - **Parameters**: `comparison_id` (path) - ID of the price comparison
   - **Description**: Deletes a price comparison entry from the database.
   - **Response**: `204 No Content`

### Bookings API

1. **Get All Bookings**
   - **Endpoint**: `/api/bookings`
   - **Method**: `GET`
   - **Description**: Retrieves all bookings made by users.
   - **Response**:
     ```json
     [
       {
         "booking_id": 1,
         "user_id": 1,
         "facility_id": 2,
         "procedure_id": 1,
         "itinerary": "Details...",
         "status": "Pending"
       },
       ...
     ]
     ```

2. **Get Booking by ID**
   - **Endpoint**: `/api/bookings/{booking_id}`
   - **Method**: `GET`
   - **Parameters**: `booking_id` (path) - ID of the booking
   - **Description**: Retrieves details of a specific booking by its ID.
   - **Response**:
     ```json
     {
       "booking_id": 1,
       "user_id": 1,
       "facility_id": 2,
       "procedure_id": 1,
       "itinerary": "Details...",
       "status": "Pending"
     }
     ```

3. **Add New Booking**
   - **Endpoint**: `/api/bookings`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "user_id": 1,
       "facility_id": 2,
       "procedure_id": 1,
       "itinerary": "Itinerary details...",
       "status": "Pending"
     }
     ```
   - **Description**: Adds a new booking request to the database.
   - **Response**:
     ```json
     {
       "booking_id": 3,
       "user_id": 1,
       "facility_id": 2,
       "procedure_id": 1,
       "itinerary": "Itinerary details...",
       "status": "Pending"
     }
     ```

4. **Update Booking**
   - **Endpoint**: `/api/bookings/{booking_id}`
   - **Method**: `PUT`
   - **Parameters**: `booking_id` (path) - ID of the booking
   - **Request Body**:
     ```json
     {
       "status": "Confirmed",
       "itinerary": "Updated itinerary details..."
     }
     ```
   - **Description**: Updates the status and itinerary details of an existing booking.
   - **Response**:
     ```json
     {
       "booking_id": 3,
       "user_id": 1,
       "facility_id": 2,
       "procedure_id": 1,
       "itinerary": "Updated itinerary details...",
       "status": "Confirmed"
     }
     ```

5. **Delete Booking**
   - **Endpoint**: `/api/bookings/{booking_id}`
   - **Method**: `DELETE`
   - **Parameters**: `booking_id` (path) - ID of the booking
   - **Description**: Deletes a booking entry from the database.
   - **Response**: `204 No Content`

### Utility Components

#### Models

- **Procedures**: Maps to the `Procedures` table and manages CRUD operations for medical procedures.
- **Facilities**: Maps to `Facilities` and handles CRUD operations for facility information.
- **PriceComparisons**: Maps to `PriceComparisons` facilitating CRUD operations for financial data.
- **Bookings**: Maps to `Bookings`, handling CRUD operations related to user bookings.

#### Schemas

- **ProceduresSchema**: Validation schema for requests and responses concerning procedures.
- **FacilitiesSchema**: Schema for facility-related data exchanges.
- **PriceComparisonsSchema**: Validation layer for price comparison operations.
- **BookingsSchema**: Manages request and response validation for booking operations.

#### Services

- **PricingService**: Handles business logic related to performing price comparisons.
- **TravelEstimatorService**: Estimation logic for calculating additional travel costs.
- **TwilioChatService**: Manages chat interactions using Twilio, simulating a travel advisor.

#### Utilities

- **HelperUtils**: Contains helper functions common across different modules, ensuring DRY code practices.

With this comprehensive setup, the backend efficiently supports all functionalities of the MediGlobal Connect platform while ensuring data integrity, security, and performance.