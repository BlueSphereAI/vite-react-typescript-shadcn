# Frontend Pages Details

Here’s the detailed requirements documentation for each frontend page of the MediGlobal Connect platform:

## Home Page (`index.tsx`)

### Elements
- **Header**
  - **Logo**: Image element displaying the company logo (`https://mediglobal-connect.greensphere.one/images/logo.jpg`) aligned to the left.
  - **Company Name**: Text element displaying "MediGlobal Connect" next to the logo.
  - **Navigation Menu**: A horizontal list of links to pages like Home, About Us, Services, Contact, etc.
  
- **Hero Section**
  - **Title**: Large heading "Affordable Medical Procedures Worldwide".
  - **Subtitle**: Text element "Compare prices & plan your medical journey."
  - **Call to Action Button**: "Get Started" button leading to the comparison page.

- **Introduction**
  - **Text**: Brief description of the platform and how it benefits users.

- **Benefits Section**
  - **Icons with Text**: A series of 3-5 icons with descriptions showcasing unique platform benefits.

- **Facility Spotlight**
  - **Carousel/Slider**: Display a selection of featured international medical facilities with short descriptions and credentials.
  
- **Footer**
  - **Quick Links**: Links to relevant pages and resources.
  - **Social Media Icons**: Links to social media profiles.
  - **Contact Information**: Email and phone number.

### Actions
- Clicking "Get Started" redirects to the Price Comparison Page.
- Facilities in the Spotlight section, when clicked, expand or redirect to the Facility Viewer page.

## Price Comparison Page

### Elements
- **Search Bar**
  - **Input Field**: Text input for the medical procedure name or category.
  - **Filter Options**: Dropdowns for location, procedure type, etc.
  - **Search Button**: Button to execute the search.

- **Price Comparison Table**
  - **Table**: Displays procedure name, US price, international price, travel cost, total estimated cost.
  - **Sort Options**: Sort by price, location, etc.
  - **Expand Row/Modal**: View more details including travel itinerary mock-ups.

- **Procedure Details Pop-Up**
  - **Modal Window**: Shows expanded details of selected procedure and facility.
  - **Credentials**: List of certifications and reviews.
  - **Action Buttons**: Options to bookmark or simulate booking.

### Actions
- Conduct searches and refine results using filters.
- Sort and organize table data dynamically.
- Open detailed modals by clicking rows.

## Facility Credential Viewer Page

### Elements
- **Breadcrumb Navigation**: Displays navigational path for easy backtracking.

- **Facility Overview**
  - **Banner Image**: Facility-specific image header.
  - **Facility Name and Location**: Prominent display at top.

- **Credentials Section**
  - **Certifications List**: Bullet list or grid of certifications.
  - **Doctor Profiles**: Profiles detailing doctor qualifications and experience.
  - **Patient Reviews**: Section with capability to expand/collapse individual reviews.

- **Contact and Inquiry**
  - **Contact Form**: Form to send inquiries directly to facilities.
  
### Actions
- Expanding or collapsing reviews.
- Submitting inquiries via form.

## Travel and Expense Estimation Page

### Elements
- **Overview Section**
  - **Text**: Explanation of how costs are estimated.

- **Travel Expense Table**
  - **Table**: Itemized list of travel expenses including flights, accommodation, and local transportation.
  - **Options for Custom Inputs**: Adjust parameters for more personalized estimates.

- **Graphical Representation**
  - **Charts/Graphs**: Visual representation of expense breakdowns.

### Actions
- Interactive sliders or inputs to adjust cost parameters.
- Download or print report options.

## Booking Management and Support Simulation Page

### Elements
- **Booking Simulation Section**
  - **List of Procedures**: Display of selected/bookmarked procedures.
  - **Simulation Button**: Initiate booking request simulation.

- **Chat Support**
  - **Chat Window**: Simulated chat interface with scripted advisor interactions.
  - **FAQ Integration**: Links to frequently asked questions or popular queries.

### Actions
- Simulate booking interactions.
- Engage with pre-scripted chat advisors.

## User Dashboard

### Elements
- **Dashboard Navigation**
  - **Menu**: Sidebar or top navigation for accessing different sections like Profile, History, Booked Procedures.

- **Recently Viewed & Booked Procedures**
  - **List View**: Display of recently viewed items with quick access.

- **Booking Status Overview**
  - **Cards or Tables**: Display ongoing or past booking simulations.

- **Notifications**
  - **Alerts/Badges**: Indicate messages or updates on interactions.

### Actions
- Navigation between dashboard sections.
- Review history and current procedures.

These detailed elements and functionalities are designed to create a cohesive and user-friendly experience on the MediGlobal Connect platform. The layout emphasizes ease of use, accessibility, and transparent information at every stage.