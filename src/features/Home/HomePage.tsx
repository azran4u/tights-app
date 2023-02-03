import Page from "../../shared/Page";
import { emailSenderService } from "../EmailSender/services/emailSenderSrevice";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Title from "./Title";

const HomePage = () => {
  return (
    <Page>
      <button
        onClick={async () => {
          const id = await emailSenderService.sendEmail();
          console.log(`email send with id ${id}`);
        }}
      >
        send email
      </button>
      <Title />
      <FeaturedProducts />
    </Page>
  );
};

export default HomePage;
