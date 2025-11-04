export class BasicResponse {

  success?: boolean;

  detail?: any;

  message?: string;

  constructor(success?, detail?, message?) {
    this.success = success;
    this.detail = detail;
    this.message = message;
  }
}