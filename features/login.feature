Feature: Login Validation

    @Validation
    @Invalid
    @Setup
    Scenario Outline: Login Error Validation
        Given user logs into application using "<username>" and "<password>"
        Then verify if error message "Incorrect email or password" is displayed


    Examples:
    | username                   | password     |
    | testuserlast1@gmail.com    | T@st123451   |
    | testuserlast12@gmail.com   | T@st1234567  |
    | testuserlast123@gmail.com  | T@st1234568  |
