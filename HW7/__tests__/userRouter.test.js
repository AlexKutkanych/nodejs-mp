const request = require('supertest');
const express = require('express');
 
const app = express();

const userId = 1;

describe('User router', () => {
  it('should return user', async () => {
    const res = await request(app).get(`/user/${userId}`).set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImxvZ2luIjoiYWxleDExMSIsImlhdCI6MTU4NDUyODQ4NywiZXhwIjoxNTg0NTMyMDg3fQ.2iYYXDRQQDH1MrmaCPPgh5YgwV51fAJjDxz6QZSxdug');

    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('post')
  });
});