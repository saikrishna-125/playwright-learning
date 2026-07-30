Feature: Shopping Validation
    @Regression
    @Setup
    Scenario: E2E Shopping Workflow Validation
        Given user logs into application using "testuserlast@gmail.com" and "T@st12345"
        When user adds "zara coat 3" product to cart
        Then cart should have "zara coat 3" product
        When user completes checkout with country as "india"
        Then the Order ID should be present in the Orders History page



    @Validation
    @Invalid
    @Setup
    Scenario Outline: Login Error Validation
        Given user logs into application using "<username>" and "<password>"
        Then verify if error message "Incorrect email or password" is displayed


    Examples:
    | username                  | password    |
    | testuserlast1@gmail.com   | T@st123456  |
    | testuserlast12@gmail.com  | T@st1234567 |
    | testuserlast123@gmail.com | T@st1234568 |