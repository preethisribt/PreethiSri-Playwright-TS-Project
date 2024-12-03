import { test, request, APIRequestContext, expect} from "@playwright/test"
let baseURLContext : APIRequestContext;

test.beforeAll("Base URL",async ()=>
{
    baseURLContext = await request.newContext({baseURL:"https://restful-booker.herokuapp.com/"});
})

test("Fetch Auth token",async ()=>
{
   const response = await baseURLContext.post("auth",{
    headers:{"Content-Type":"application/json"},
    data:{
        "username" : "admin",
        "password" : "password123"
       }
   });
   const responseJson  = JSON.parse(await response.text());

   await expect(responseJson.token).toBeTruthy();
   console.log(responseJson.token);
});