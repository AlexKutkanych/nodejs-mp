const request = require('supertest');
const express = require('express');
 
const app = express();

const mockData = {
  groupId: 1,
  newGroup: {name: 'Guests', permission: ['READ', 'WRITE'], userId: ['1', '2']},
  updatedUserData: { permission: ['READ', 'WRITE', 'DELETE'] }
}

const { groupId, newGroup, updatedUserData } = mockData;

describe('Group router', () => {
  it('should return group by id', async () => {
    const res = await request(app).get(`/group/${groupId}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should create group', async () => {
    const res =
      await request(app)
              .post(`/group/create`)
              .send(newGroup);

    expect(res.statusCode).toEqual(201);
  });

  it('should update group', async () => {
    const res =
      await request(app)
              .put(`/group/${groupId}`)
              .send(updatedUserData);

    expect(res.statusCode).toEqual(200);
  });


  it('should delete group by id', async () => {
    const res = await request(app).delete(`/group/${groupId}`);

    expect(res.statusCode).toEqual(200);
  });
});