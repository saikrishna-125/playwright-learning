import { type APIResponse } from "@playwright/test";

export default class APIUtils {
  apiContext: any;
  loginPayload: { userEmail: string; userPassword: string };
  constructor(
    apiContext: any,
    loginPayload: { userEmail: string; userPassword: string },
  ) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async loginAndGetToken() {
    const loginResponse: APIResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      },
    );

    const token: string = (await loginResponse.json()).token;
    return token;
  }

  async createOrder(orderPayload: {
    orders: { country: string; productOrderedId: string }[];
  }) {
    const response: { token: string; orderId: string } = {
      token: "",
      orderId: "",
    };

    response.token = await this.loginAndGetToken();

    const orderResponse: APIResponse = await this.apiContext.post(
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
