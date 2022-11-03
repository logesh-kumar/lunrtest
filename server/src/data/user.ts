import { SexType, faker } from "@faker-js/faker";

enum UserType {
  Native = "NATIVE",
  External = "EXTERNAL",
}

const accountId = 5561;
const companyId = 49750;
const companyName = "Rocketlane";
const timeZone = "Asia/Calcutta";
enum userStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}
enum identityType {
  user = "USER",
}

class User {
  userName: string;
  emailId: string;
  userId: number;
  firstName: string;
  lastName: string;
  userType: UserType;
  accountId: number;
  company: {
    companyId: number;
    companyName: string;
  };
  timeZone: string;
  userStatus: userStatus;
  identityType: identityType;
  createdAt: number;
  loginType: identityType;
  fields: [];
  capacity: number;
  defaultCapacity: boolean;
  projectId: number;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomUser(): User {
  return {
    userName: faker.internet.userName(),
    emailId: faker.internet.email(),
    userId: faker.datatype.number({ min: 82000, max: 92000 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userType: UserType.Native,
    accountId: accountId,
    company: {
      companyId: companyId,
      companyName: companyName,
    },
    timeZone: timeZone,
    userStatus: userStatus.Active,
    identityType: identityType.user,
    createdAt: faker.date.past().getTime(),
    loginType: identityType.user,
    fields: [],
    capacity: 40,
    defaultCapacity: true,
    projectId: getRandomIntInclusive(1000, 3000),
  };
}

export const users = Array.from({ length: 5000 }).map(() => createRandomUser());
