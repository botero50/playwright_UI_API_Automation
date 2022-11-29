import { expect, test } from '@playwright/test';

test('Get user', async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}users/2`);
  console.log(await response.json());
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    data: {
      id: 2,
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg'
    },
    support: {
      url: 'https://reqres.in/#support-heading',
      text: 'To keep ReqRes free, contributions towards server costs are appreciated!'
    }
  });
});

test('Post user', async ({ request, baseURL }) => {
  const response = await request.post(`${baseURL}users`, {
    data: {
      "name": "morpheus",
      "job": "leader"
    }
  });
  expect(response.status()).toBe(201);
  expect(response.ok()).toBeTruthy();
  console.log(await response.json());
  
  expect(await response.json()).toMatchObject({
      "name": "morpheus",
      "job": "leader",
      "id": expect.any(String),
      "createdAt": expect.any(String)
  });
});
