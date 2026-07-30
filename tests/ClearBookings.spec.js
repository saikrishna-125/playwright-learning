import { test, request, expect } from "@playwright/test";

test("@APP Clear all bookings", async () => {
  const apiContext = await request.newContext();

  const loginResponse = await apiContext.post(
    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {
      data: {
        email: "testmailsk1259@yopmail.com",
        password: "T@st12345",
      },
    },
  );

  await expect(await loginResponse.ok()).toBeTruthy();
  const token = (await loginResponse.json()).token;

  const deleteAllReponse = await apiContext.delete(
    "https://api.eventhub.rahulshettyacademy.com/api/bookings",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(await deleteAllReponse.status(), await deleteAllReponse.json());
});
