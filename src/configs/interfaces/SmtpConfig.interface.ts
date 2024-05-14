interface SmtpConfig {
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string
  }
}

export default SmtpConfig;
