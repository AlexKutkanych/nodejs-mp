const request = require('supertest');
const express = require('express');
 
const app = express();

const mockData = {
  userId: 1,
  newUser: {login: 'john', password: 'john_john', age: 30},
  updatedUserData: { password: 'new_password', age: 31 }
}

const { userId, newUser, updatedUserData } = mockData;

describe('User router', () => {
  it('should return user by id', async () => {
    const res = await request(app).get(`/user/${userId}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should create user', async () => {
    const res =
      await request(app)
              .post(`/user/create`)
              .send(newUser);

    expect(res.statusCode).toEqual(201);
  });

  it('should update user', async () => {
    const res =
      await request(app)
              .put(`/user/${userId}`)
              .send(updatedUserData);

    expect(res.statusCode).toEqual(200);
  });


  it('should delete user by id', async () => {
    const res = await request(app).delete(`/user/${userId}`);

    expect(res.statusCode).toEqual(200);
  });
});