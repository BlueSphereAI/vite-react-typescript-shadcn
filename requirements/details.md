# Project Overview
The Integrity Assurance Platform is designed to enhance transparency and combat corruption in government procurement processes. It uses blockchain technology to ensure a transparent and immutable record of contract processes, securely storing negotiation details, amendments, and approvals. The project's front-end will allow users to submit contracts, view immutable logs, engage in negotiations, approve contracts, and view an audit trail of the entire process.

# Frontend Pages Details

## 1. Landing Page (index.tsx)
This is the initial page users see upon visiting the platform.

### Elements:

- **Company Name and Logo**
  - **Type**: Image and Text
  - **Actions**: None (static display)
  - **Style/Position**: Top-left corner of the page.
  - **Description**: Showcases "ClearContract" along with the company logo from the URL `https://clearcontract.greensphere.one/images/logo.jpg`.
  - **Use Case**: User lands on the page and immediately sees the branding for recognition.

- **Introduction Section**
  - **Type**: Text/Paragraph
  - **Actions**: None
  - **Style/Position**: Centered below the header.
  - **Description**: Briefly describes the benefits of using blockchain for contract transparency.
  - **Use Case**: A user unfamiliar with the application can understand its purpose quickly.

## 2. Dashboard Page (dashboard.tsx)
This page serves as the main hub for users after logging in.

### Elements:

- **Company Name and Logo**
  - **Type**: Image and Text
  - **Actions**: None
  - **Style/Position**: Header section, persistent across sessions.
  - **Description**: Displays "ClearContract" and the company logo for consistent branding.
  - **Use Case**: Reinforces brand identity across the user journey.

- **Navigation Sidebar**
  - **Type**: Navigation
  - **Actions**: Switch between different features (Contract Submission, Record Logs, etc.)
  - **Style/Position**: Fixed-position on the left.
  - **Description**: Links for Contract Submission, Immutable Record Log, Negotiation Log, Approval Workflow, and Audit Trail.
  - **Use Case**: A user clicks to navigate between various sections effortlessly.

- **Featured Section**
  - **Type**: Dynamic Container
  - **Actions**: Displays the selected feature module.
  - **Style/Position**: Center-right occupying rest of the view.
  - **Description**: Displays dynamic content per selected sidebar option.
  - **Use Case**: A user views and interacts with selected feature without navigating out of the dashboard.

## 3. Contract Submission Page
Allows users to submit new contracts for review.

### Elements:

- **Contract Form (from ContractForm component)**
  - **Type**: Form
  - **Actions**: Submit
  - **Style/Position**: Center of the page.
  - **Description**: Fields for inputting contract title, description, and document upload.
  - **Use Case**: A government agency uploads a contract to start a review.

- **Submit Button**
  - **Type**: Button
  - **Actions**: Triggers form submission
  - **Style/Position**: Bottom-right corner of the form.
  - **Description**: Submits the entered contract data.
  - **Use Case**: A user clicks to submit their filled contract for processing.

## 4. Immutable Record Log Page
Displays an immutable log of all transactions.

### Elements:

- **Log Entries (from ImmutableRecordLog component)**
  - **Type**: Text List
  - **Actions**: Expand for detail
  - **Style/Position**: Centrally listed vertically.
  - **Description**: Each log entry includes an action and a timestamp.
  - **Use Case**: A user verifies their submitted contract is logged with the correct timestamp.

- **Verify on Blockchain Button**
  - **Type**: Button
  - **Actions**: Simulate blockchain verification
  - **Style/Position**: Next to each log entry.
  - **Description**: Shows a pop-up with a "blockchain verified" notice when clicked.
  - **Use Case**: A user ensures a record is confirmed on the blockchain.

## 5. Negotiation Log Page
Simulates a negotiation interface for contract discussions.

### Elements:

- **Chat Interface (from NegotiationLog component)**
  - **Type**: Chat Box
  - **Actions**: Send message
  - **Style/Position**: Center page
  - **Description**: Displays messages between contract stakeholders with timestamps.
  - **Use Case**: Participants use this to negotiate contract terms in real-time.

- **Input Field**
  - **Type**: Text Input
  - **Actions**: Accepts new message text
  - **Style/Position**: Fixed at the bottom of the chat interface.
  - **Description**: Allows users to type a message.
  - **Use Case**: A user types a negotiation message and sends it to others.

## 6. Approval Workflow Page
Provides tools for reviewing and approving contracts.

### Elements:

- **Approval Interface (from ApprovalWorkflow component)**
  - **Type**: Panel
  - **Actions**: Approve or request changes.
  - **Style/Position**: Center page interface.
  - **Description**: Lists contracts with options to approve or request changes.
  - **Use Case**: A government user approves a contract, updating its status in the system.

- **Approval/Request Changes Buttons**
  - **Type**: Buttons
  - **Actions**: Trigger respective actions on selection.
  - **Style/Position**: Adjacent to each contract listing.
  - **Description**: Reflects decision in the audit log.
  - **Use Case**: A user selects to either approve a contract or request further changes.

## 7. Audit Trail Visualization Page
Displays an interactive timeline of all contract-related actions.

### Elements:

- **Timeline View (from AuditTrailVisualization component)**
  - **Type**: Interactive Timeline
  - **Actions**: View detailed information
  - **Style/Position**: Horizontally across the page
  - **Description**: Visualizes lifecycle events like submissions, negotiations, and approvals.
  - **Use Case**: A user reviews the entire trail of actions concerning a given contract.

In conclusion, these pages form a transparent and immutable record platform for handling government contracts, built using a modern stack for efficiency and clarity. The described UI/UX elements ensure users can interact seamlessly with every component of the Integrity Assurance Platform.