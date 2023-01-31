import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../shared/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { OptionalClassName } from "../../utils/classNameInterface";
import { device } from "../../utils/device.sizes";
import { selectPickupLocations } from "../Pickup/store/pickupSlice";
import { checkoutActions, selectCheckout } from "./store/checkoutSlice";
import Joi from "joi";
import { isNil } from "lodash";
import { useHistory } from "react-router";
import { cartActions } from "../Cart/store/cartSlice";
import { successfulOrderActions } from "../SuccessfulOrder/store/successfulOrderSlice";
import { checkoutService } from "./services/checkoutSrevice";

export const CheckoutForm: React.FC<OptionalClassName> = (props) => {
  const dispatch = useAppDispatch();
  const checkoutData = useAppSelector(selectCheckout);
  const pickupLocations = useAppSelector(selectPickupLocations);

  const [
    shouldDisplayFormValidationError,
    setShouldDisplayFormValidationError,
  ] = useState(false);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const history = useHistory();

  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phoneNumber: Joi.string().required(),
    prefferedPickupLocation: Joi.string().required(),
    comments: Joi.optional(),
    orderId: Joi.optional(),
  });

  useEffect(() => {
    const validationResult = schema.validate(checkoutData);
    setIsFormValid(validationResult?.error ? false : true);
  }, [checkoutData, schema]);

  return (
    <Wrapper className={props.className}>
      <h5 className="form-field">שם פרטי:</h5>
      <input
        type="text"
        name="firstName"
        value={checkoutData.firstName}
        onChange={(e) =>
          dispatch(
            checkoutActions.upsert({
              firstName: e.target.value,
            })
          )
        }
      />

      <h5 className="form-field">שם משפחה:</h5>
      <input
        type="text"
        name="lastName"
        value={checkoutData.lastName}
        onChange={(e) =>
          dispatch(
            checkoutActions.upsert({
              lastName: e.target.value,
            })
          )
        }
      />

      <h5 className="form-field">כתובת מייל</h5>
      <input
        type="email"
        name="email"
        value={checkoutData.email}
        onChange={(e) =>
          dispatch(
            checkoutActions.upsert({
              email: e.target.value.toLowerCase(),
            })
          )
        }
      />

      <h5 className="form-field">טלפון נייד:</h5>
      <input
        type="tel"
        name="phoneNumber"
        value={checkoutData.phoneNumber}
        onChange={(e) =>
          dispatch(
            checkoutActions.upsert({
              phoneNumber: e.target.value,
            })
          )
        }
      />

      <h5 className="form-field">נקודת חלוקה:</h5>
      <select
        name="prefferedPickupLocation"
        value={checkoutData.prefferedPickupLocation}
        onChange={(e) => {
          const prefferedPickupLocation = e.target.value;
          if (prefferedPickupLocation === "") return;
          dispatch(
            checkoutActions.upsert({
              prefferedPickupLocation,
            })
          );
        }}
      >
        <option value="" label="בחר/י נקודת חלוקה" />
        {pickupLocations &&
          pickupLocations.map((location) => (
            <option
              value={location.dispalyNmae}
              label={location.dispalyNmae}
              key={location.dispalyNmae}
            />
          ))}
      </select>

      <h5 className="form-field">הערות:</h5>
      <textarea
        name="comments"
        cols={40}
        rows={5}
        value={checkoutData.comments}
        onChange={(e) =>
          dispatch(
            checkoutActions.upsert({
              comments: e.target.value,
            })
          )
        }
      ></textarea>

      <Button
        text="אישור הזמנה"
        onClick={async () => {
          setShouldDisplayFormValidationError(true);
          if (isFormValid) {
            const orderId = await checkoutService.placeOrder();
            if (isNil(orderId)) {
              history.push("/error");
            } else {
              dispatch(cartActions.clear());
              dispatch(successfulOrderActions.upsert({ orderId }));
              history.push("/successful-order");
            }
          }
        }}
        className={`submit-button ${
          !isFormValid ? "disable-submit-button" : ""
        }`}
      />

      {!isFormValid && shouldDisplayFormValidationError && (
        <h5 className="validation-error-message">כל השדות חובה פרט להערות</h5>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 0;
  margin: 0 30%;

  @media ${device.mobile} {
    margin: 0 10%;
  }

  .submit-button {
    margin-top: 1rem;
  }

  .form-field {
    margin-top: 1rem;
  }

  .comments-text-box {
    height: 5rem;
  }

  textarea {
    font-family: inherit;
    font-size: inherit;
  }

  .disable-submit-button {
    background-color: var(--clr-grey-8);
  }

  .validation-error-message {
    color: var(--clr-red-dark);
  }
`;

export default CheckoutForm;
