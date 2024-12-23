interface Credentials{
    UserName: string,
    Password: string
}

export const validUser : Credentials =
 {
     "UserName": "preethiAutomation@gmail.com",
     "Password": "test1#123"
 }

export const invalidUser : Credentials= {
    "UserName": "auto@gmail.com",
     "Password": "test1#123"
}

 const invalidUser2 : Credentials= {
     "UserName": "preethiAutomation@gmail.com",
     "Password": "passssas23"
}

export const validUsers : Credentials[] = [validUser];
export const invalidUsers : Credentials[] = [invalidUser,invalidUser2];