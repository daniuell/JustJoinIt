### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/daniuell/PW
   ```
2. Download and install node 
   ```sh
   https://nodejs.org/en/download.
   ```
3. Install Playwright: Run the following command in your terminal
   ```sh
   npm install playwright
   ```
4. Install Browsers: Run the following command in your terminal
   ```sh
   npx playwright install
   ```
5. Run test: Run the following command in your terminal:
    ```sh
   npx playwright test
   ```
6. Configure test data: Find .env file and add your login credentials for the JustJoinIt portal
    ```sh
   USER_LOGIN_CORRECT="CORRECT LOGIN"
   USER_PASSWORD_CORRECT="CORRECT PASSWORD"
   USER_LOGIN_INCORRECT = "INCORRECT LOGIN"
   USER_PASSWORD_INCORRECT = "INCORRECT PASSWORD"
   ```****
    
### Test cases
Tests are created based on test cases, which can be found here : 
 ```sh
   https://docs.google.com/spreadsheets/d/1Z__giRzQ0Llr5zOLupV1AVBjPv4-cRDWdTm1DtP5WJU/edit?usp=sharing
 ```
