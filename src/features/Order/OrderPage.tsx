import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Loading from "../../shared/Loading";
import CartContent from "../Cart/components/CartContent";
import { ordersService } from "./services/ordersSrevice";

const OrderPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["order"],
    queryFn: () => ordersService.getById(orderId),
  });

  // function loadOrder() {}

  return (
    <main>
      <Wrapper className="page">
        <div className="title">
          <h1>הזמנה</h1>
        </div>
        <div className="content">
          {isLoading && <Loading />}
          {isError && <h5>לא ניתן לטעון את ההזמנה</h5>}
          {!isLoading && data && (
            <>
              <h5>תאריך הזמנה: {data.date}</h5>
              <h5 className="pickup-location">
                נקודת חלוקה: {data.checkoutDetails.prefferedPickupLocation}
              </h5>
              <CartContent
                allowEdit={false}
                cartProductsWithAmount={data.products}
                totalCost={data.totalCost}
                totalCostAfterDiscount={data.totalCostAfterDiscount}
                clearCart={() => {}}
                increaseAmount={(sku: string) => {}}
                decreaseAmount={(sku: string) => {}}
                removeItem={(sku: string) => {}}
                submitButtonClicked={() => {}}
              />
            </>
          )}
        </div>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  margin: 0 auto;

  .title {
    min-height: 10vh;
    text-align: center;
  }

  .content {
    min-height: 70vh;
  }

  .pickup-location {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
export default OrderPage;
