import { Email } from "../../../model/email/email";
import { FirestoreService } from "../../../shared/services/firestoreService";

export class EmailSenderService extends FirestoreService<Email> {
  constructor() {
    super("mail");
  }

  public createEmail(): Email {
    const mail: Email = {
      to: "azran4u@gmail.com",
      message: {
        subject: "subject",
        html: `<a href="https://www.google.com/">google</a>`,
      },
    };

    return mail;
  }

  public async sendEmail() {
    // const state = store.getState();
    // const activeSale = selectSaleActive(state);
    const email = this.createEmail();
    const id = await this.insert(email);
    return id;
  }
}

export const emailSenderService = new EmailSenderService();
