class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async loginAndGetToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );

    const token = (await loginResponse.json()).token;
    return token;
  }

  async createOrder(orderPayload) {
    const response = {};

    response.token = await this.loginAndGetToken();

    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          authorization: response.token,
        },
      },
    );
    response.orderId = (await orderResponse.json()).orders[0];

    return response;
  }
}

export default APIUtils;
