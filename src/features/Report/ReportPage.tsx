import React from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reportService } from "./services/reportSrevice";
import Loading from "../../shared/Loading";
import Underline from "../../shared/Underline";
import { device } from "../../utils/device.sizes";
import { DateUtil } from "../../utils/DateUtil";
import {
  Order,
  orderStatus,
  OrderStatus,
  orderStatusSubmitted,
} from "../../model/order/order";
import Select from "react-select";
import { ordersService } from "../Order/services/ordersSrevice";
import CartItemDescription from "../Cart/components/CartItemDescription";

const Report: React.FC = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["report"],
    queryFn: () => reportService.getReport(),
  });

  const mutation = useMutation(
    (input: { orderNumber: string; status: OrderStatus }) => {
      return ordersService.changeOrderStatus(input.orderNumber, input.status);
    }
  );

  function orderFullName(order: Order) {
    return (
      order.checkoutDetails.firstName + " " + order.checkoutDetails.lastName
    );
  }

  return (
    <Wrapper>
      <h1 className="title">דוח הזמנות</h1>
      <div className="content">
        {isLoading && <Loading />}
        {isError && <h5>לא ניתן לטעון את הדוח</h5>}
        {!isLoading && data && (
          <>
            <h5>כמות הזמנות: {data.totalOrderCount}</h5>
            <h5>סכום הזמנות: {data.totalCost} ש"ח</h5>

            <table>
              <thead>
                <tr>
                  <th>
                    <div className="header">
                      <h5>נקודת חלוקה</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>סכום כולל</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>עמלה</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.pickupHistogram.length > 0 &&
                  data.pickupHistogram
                    .sort((a, b) =>
                      a.pickupDisplayName.localeCompare(b.pickupDisplayName)
                    )
                    .map((entry) => {
                      return (
                        <tr key={entry.pickupDisplayName}>
                          <td>
                            <h5 className="row-value">
                              {entry.pickupDisplayName}
                            </h5>
                          </td>
                          <td>
                            <h5 className="row-value">{entry.totalCost}</h5>
                          </td>
                          <td>
                            <h5 className="row-value">{entry.commision}</h5>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>

            {data.orders.length > 0 &&
              data.orders
                .sort((a, b) => {
                  const firstSort =
                    a.checkoutDetails.prefferedPickupLocation.localeCompare(
                      b.checkoutDetails.prefferedPickupLocation
                    );
                  if (firstSort !== 0) return firstSort;
                  const aName = orderFullName(a);
                  const bName = orderFullName(b);
                  return aName.localeCompare(bName);
                })
                .map((order) => {
                  return (
                    <div
                      className="order-card"
                      key={order.id}
                      // onClick={() =>
                      //   history.push(`/order/${order.orderNumber}`)
                      // }
                    >
                      <h6 className="order-card-item first-item">
                        <div className="name-and-order-number">
                          <a
                            href={`${window.location.origin}/order/${order.orderNumber}`}
                          >
                            {orderFullName(order)}
                            <h6>מספר הזמנה: {order.orderNumber}</h6>
                          </a>
                        </div>

                        <Select<OrderStatus>
                          className="select-order-status"
                          classNamePrefix="select_order_status"
                          defaultValue={order.status ?? orderStatusSubmitted}
                          isClearable={false}
                          isRtl={true}
                          isSearchable={false}
                          name="order-status"
                          options={orderStatus}
                          onChange={(value, actionMeta) => {
                            mutation.mutate({
                              orderNumber: order.orderNumber,
                              status: value!,
                            });
                          }}
                        />
                      </h6>

                      <h6 className="order-card-item">
                        {order.checkoutDetails.prefferedPickupLocation}
                      </h6>

                      <h6 className="order-card-item">
                        סכום לתשלום: {order.totalCostAfterDiscount} ש"ח
                      </h6>

                      <h6 className="order-card-item">
                        {DateUtil.format(DateUtil.fromString(order.date))}
                      </h6>
                      <h6 className="order-card-item">
                        הערות: {order.checkoutDetails.comments}
                      </h6>
                    </div>
                  );
                })}

            <table>
              <thead>
                <tr>
                  <th>
                    <div className="header">
                      <h5>שם הספק</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>מוצר</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>כמות</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.suppliersBom.length > 0 &&
                  data.suppliersBom
                    .sort((a, b) => {
                      return a.supplier.localeCompare(b.supplier);
                    })
                    .map((bom) => {
                      return (
                        <tr key={bom.supplier + bom.sku}>
                          <td>
                            <h5 className="row-value">{bom.supplier}</h5>
                          </td>
                          <td>
                            <h5 className="row-value">
                              <CartItemDescription sku={bom.sku} />
                            </h5>
                          </td>
                          <td>
                            <h5 className="row-value">{bom.amount}</h5>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Report;

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

    @media ${device.mobile} {
      font-size: 0.5rem;
    }
  }

  table {
    width: 100%;
    margin-bottom: 3rem;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h5 {
      margin-bottom: 0.5rem;
      text-align: center;
      @media ${device.mobile} {
        font-size: 0.75rem;
      }
    }
  }

  .row-value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .underline {
    width: 6rem;

    @media ${device.mobile} {
      width: 2rem;
    }
  }

  .order-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 80%;
    background-color: var(--clr-grey-9);
    margin-bottom: 1rem;
    border-radius: var(--radius);

    .first-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .select-order-status {
        width: 50%;
      }
    }
    .order-card-item {
      margin-right: 0.5rem;
    }
  }
`;
