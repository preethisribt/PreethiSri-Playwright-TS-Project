interface Credentials {
    UserName: string;
    Password: string;
    dataID :string;
}

export const validUser: Credentials = {
    UserName: "preethiAutomation@gmail.com",
    Password: "test1#123",
    dataID: "VU1"
}

export const validUser2: Credentials = {
    UserName: "preethitest1@gmail.com",
    Password: "test1#123",
     dataID: "VU2"
}

export const invalidUser: Credentials = {
    UserName: "auto@gmail.com",
    Password: "test1#123",
     dataID: "IU1"
}

const invalidUser2: Credentials = {
    UserName: "preethiAutomation@gmail.com",
    Password: "passssas23",
     dataID: "IU2"
}

export const validUsers: Credentials[] = [validUser,validUser2];
export const invalidUsers: Credentials[] = [invalidUser, invalidUser2];
