export class UserModel {
    public userId: string;
    public userName: string;
    public userSurname: string;
    public userGender: string;
  
    private constructor(userId: string, userName: string, userSurname: string, userGender: string) {
      this.userId = userId;
      this.userName = userName;
      this.userSurname = userSurname;
      this.userGender = userGender;
      

      if (!this.userId || !this.userName || !this.userSurname || !this.userGender) {
        throw new Error('Missing required properties for UserModel');
      }
    }
  
    public static fromMap(userData: Map<string, unknown>): UserModel {
      const userId = userData.get('user_id') as string;
      const userName = userData.get('user_name') as string;
      const userSurname = userData.get('user_surname') as string;
      const userGender = userData.get('user_gender') as string;
  
      return new UserModel(userId, userName, userSurname, userGender);
    }
  }
  