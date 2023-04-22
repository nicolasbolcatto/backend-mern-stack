import { describe } from "node:test";
import { expect } from "chai";
import { responseGetLogin, responseGetFailLogin, responsePostLogin, responseGetRegister, responseGetFailRegister, responsePostRegister } from "./client.js";

describe("Testing user logging", () => {
    it("Testing GET for login", async() =>{
        expect(responseGetLogin.status).to.eql(200)
    });
    it("Testing GET for fail-login", async() =>{
        expect(responseGetFailLogin.status).to.eql(200)
    });
    it("Testing POST for login", async() =>{
        expect(responsePostLogin.status).to.eql(302)
    });
    it("Testing GET for register", async() =>{
        expect(responseGetRegister.status).to.eql(200)
    });
    it("Testing GET for fail-register", async() =>{
        expect(responseGetFailRegister.status).to.eql(200)
    });
    it("Testing POST for register", async() =>{
        expect(responsePostRegister.status).to.eql(302)
    });
})