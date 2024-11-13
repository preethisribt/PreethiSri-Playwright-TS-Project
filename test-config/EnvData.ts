export class EnvData {
  public static readonly UserName = process.env.USER_NAME as string;
  public static readonly Password = process.env.PASSWORD as string;
  public static readonly url = process.env.URL as string;
}
