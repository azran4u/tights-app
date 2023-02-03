import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectCheckout } from "../Checkout/store/checkoutSlice";
import { isNil } from "lodash";
import { selectSuccessfulOrderId } from "./store/successfulOrderSlice";

const SuccessfulOrder: React.FC = () => {
  const checkoutDetails = useAppSelector(selectCheckout);
  const orderId = useAppSelector(selectSuccessfulOrderId);

  const history = useHistory();

  if (isNil(orderId)) {
    history.push("/products");
  }
  return (
    <Wrapper>
      <h1 className="title">הזמנה בוצעה בהצלחה</h1>
      <div className="content">
        <h5>תודה {checkoutDetails.firstName} על רכישתך!</h5>
        <h5>ההזמנה עוברת לטיפול ונעדכן כאשר תגיע לנקודת החלוקה שבחרת </h5>
        <h5 className="pickup-location">
          {checkoutDetails.prefferedPickupLocation}
        </h5>
        <h5>תשלום יועבר בביט / פייבוקס בעת קבלת ההזמנה</h5>
        <h5>ניתן לצפות בהזמנה בקישור הבא</h5>
        <a href={`${window.location.origin}/order/${orderId}`}>link</a>
      </div>
    </Wrapper>
  );
};

export default SuccessfulOrder;

const Wrapper = styled.div`
  width: 90vw;
  margin: 0 auto;

  .title {
    min-height: 10vh;
    text-align: center;
  }

  .content {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  h5 {
    margin-top: 1rem;
  }

  .pickup-location {
    border-radius: --var(radius);
    background-color: var(--clr-grey-8);
  }
`;
