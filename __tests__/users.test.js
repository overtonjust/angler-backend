// Dependencies
const request = require('supertest');
const app = require('../app');
const { close } = require('../db/dbconfig');
const users = '/users';

beforeAll(done => {
    server = app.listen(4000, () => done());
});

afterAll(async () => {
    server.close(async () => {
        await new Promise(resolve => server.close(resolve)); // Close the server connection
        await close(); // Close the database connection
        
    });
});

describe("GET /users", () => {
    it("Should return a 200 status", async () => {
       const response = await request(server)
            .get(users)
            .set("Accept", "application/json");
        // Grab the response of the request as an object to later extract what piece you want to test in your expect function
        
        expect(response.status).toBe(200);    
    });

    it("Should return an array", async () => {
        const response = await request(server)
            .get(users)
            .set("Accept", "application/json");
        
        expect(Array.isArray(response.body)).toBe(true);
    });

});

describe("POST /users", () => {
    it("Should return a 200 status", async () => {
        const testUser = {
            username: "test",
            password: "2456",
            email: "postroute@test.com"
        };
        const response = await request(server)
            .post(users)
            .set("Accept", "application/json")
            .send(testUser);
       
        expect(response.status).toBe(200);
    });

    it("Should return an error if the user already exists", async () => {
        const testUser = {
            username: "test",
            password: "2456",
            email: "postroute@test.com"
        };
        const response = await request(server)
            .post(users)
            .set("Accept", "application/json")
            .send(testUser);
        
        expect(response.status).toBe(404);
    });

    
});