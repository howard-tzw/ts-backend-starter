import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { googleSpreadsheetCreds } from '@config';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const docId = '12-bJ9eUe9Q-EL71Rzai8KP1bgMurjpVpsuTQetNfQHQ';
    const sheetId = 0;
    const doc = new GoogleSpreadsheet(docId);
    await doc.useServiceAccountAuth(googleSpreadsheetCreds);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetId];
    const rows = await sheet.getRows();

    const users: User[] = [];

    for (const row of rows) {
      const data = row._rawData;
      users.push({
        id: parseInt(data[0], 10),
        email: data[1],
        password: data[2],
      });
    }
    return users;
  }

  public async findUserById(userId: number): Promise<User> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = this.users.find(user => user.email === userData.email);
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = { id: this.users.length + 1, ...userData, password: hashedPassword };
    this.users = [...this.users, createUserData];

    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    const updateUserData: User[] = this.users.map((user: User) => {
      if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
      return user;
    });

    return updateUserData;
  }

  public async deleteUser(userId: number): Promise<User[]> {
    const findUser: User = this.users.find(user => user.id === userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
    return deleteUserData;
  }
}

export default UserService;
