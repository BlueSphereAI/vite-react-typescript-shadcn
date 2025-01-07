# Project Overview

MediGlobal Connect is a medical procedure price comparison platform tailored for individuals seeking cost-effective medical solutions. This application enables users to compare medical procedure costs between facilities in the US and internationally, factoring in travel expenses. The platform integrates medical cost data with credential reviews and travel logistics, establishing a unique solution that saves the consumer time and money.

# Frontend Pages Details

## Home Page

### Key Elements

- **Header**
  - **Company Logo**: Image element linking to [MediGlobal Connect Logo](https://mediglobal-connect.greensphere.one/images/logo.jpg).
    - **Position**: Top-left corner.
    - **Action**: Click redirects to Home Page.
  - **Company Name**: Text element "MediGlobal Connect" next to the logo.
    - **Style**: Bold, within a header banner.
  - **Navigation Links**: Text buttons for "Home", "Search Procedures", "Dashboard", "Contact Us".
    - **Position**: Top-right corner.
    - **Action**: Click navigates to respective pages.

- **Search Bar**
  - **Input Field**: Text input for procedure name.
    - **Actions**: User types procedure name.
    - **Use Case**: User searches for "knee replacement" and expects a list of matching procedures.
  - **Search Button**: Click triggers search.
    - **Style**: Prominent and adjacent to the input field.
    - **Actions**: Click performs search operation.

- **Featured Comparisons Section**
  - **Comparison Cards**: Display several highlighted comparisons with images and quick facts.
    - **Description**: Summary cards for popular procedures.
    - **Action**: Click a card to explore more details.
    - **Use Case**: Users view a card for hip replacement and clicks to see full comparison.

### Footer

- **Contact Information**: Text including address, email, and phone number.
- **Social Media Icons**: Icon buttons linking to social media pages.
- **Site Map Links**: Text links for key pages.

## Procedure Detail Page `[id].tsx`

### Key Elements

- **Header**
  - Repeats from Home Page: Uses the same header component for consistency.

- **Breadcrumb Navigation**
  - **Description**: Shows navigation path.
  - **Use Case**: User sees "Home > Procedures > Knee Replacement"

- **Procedure Information**
  - **Title**: Display procedure name.
  - **Description**: Detailed procedure explanation.
  - **Image**: Related visual graphics.

- **Price Comparison Table**
  - **Table Elements**: Rows with details such as Facility Name, Location, Procedure Cost, Estimated Travel Cost.
    - **Style**: Responsive and sortable columns.
    - **Use Case**: User sorts by price and finds the cheapest option.

- **Facility Credential Viewer**
  - **Expandable Sections**: For facility certifications, reviews, and doctor qualifications.
    - **Action**: Click to expand/collapse.
    - **Use Case**: User expands credentials to read patient reviews.

### Footer

- Mirrors the Home Page footer component.

## Travel Expense Estimation Page

### Key Elements

- **Header**
  - Reuse of standard company header.

- **Estimation Form**
  - **Input Elements**: For Flight, Accommodation, and Miscellaneous expenses.
    - **Action**: User inputs custom cost estimates.
    - **Use Case**: User inputs airfare cost and checks total estimation.
  - **Estimate Button**: Triggers calculation.
    - **Action**: Click generates estimated total expenses.

- **Results Display**
  - **Cost Breakdown**: Displays a breakdown of expenses.
  - **Use Case**: Users verify budget feasibility for medical travel.

### Footer

- Standard footer design for coherence.

## Booking Simulation Page

### Key Elements

- **Header**
  - Consistent company branding.

- **Booking Request Form**
  - **Inputs**: Patient's basic details, procedure, and date preference.
    - **Action**: User fills form.
    - **Use Case**: Users submit a booking request simulation.

- **Virtual Advisor Chat**
  - **Chat Window**: Interactive chat interface.
    - **Action**: Users ask questions, receive scripted advice.
    - **Use Case**: Users confirm appointment logistics with the advisor.

- **Booking Summary**
  - **Summary Box**: Displays simulated booking details.
  - **Action**: Review summary after completing steps.
  - **Use Case**: User checks accuracy of booking info and confirms.

### Footer

- Included as part of all pages.

## User Dashboard Page

### Key Elements

- **Header**
  - Unified header for user convenience.

- **Dashboard Overview**
  - **Welcome Message**: Personalized greeting for logged-in users.
  - **Notifications**: Alerts for new messages or updates.

- **Procedure List**
  - **List Items**: Summary of previously viewed/comparable procedures.
    - **Action**: Click list item for detailed view.
    - **Use Case**: Users quickly navigate to review previous comparisons.

- **Booking Status**
  - **Status Card**: Displays pending and confirmed procedure bookings.
    - **Action**: Filter by status.
    - **Use Case**: Users identify which procedures need action.

- **Advisor Interactions**
  - **Interaction History**: List of previous chat logs with the advisor.
    - **Description**: Organized by date for easy access.
    - **Use Case**: User reviews past advice before making decisions.

### Footer

- The overall site footer.

Each frontend page reflects the MediGlobal Connect branding through consistent use of logo and company name, whilst aligning design elements for intuitive user experiences. Each page is designed to smoothly transition between the core functionalities, empowering users with data and tools to navigate the complex process of international medical travel and procedures.