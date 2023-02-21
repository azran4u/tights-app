import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { reportService } from "./services/reportSrevice";
import Loading from "../../shared/Loading";
import Underline from "../../shared/Underline";
import { device } from "../../utils/device.sizes";
import { DateUtil } from "../../utils/DateUtil";
import { Order } from "../../model/order/order";

const Report: React.FC = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["report"],
    queryFn: () => reportService.getReport(),
  });

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
            <h5>עלות כוללת: {data.totalCost}</h5>

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
                      <h5>שם הלקוח/ה</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>תאריך</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                  <th>
                    <div className="header">
                      <h5>סכום</h5>
                      <Underline className="underline" />
                    </div>
                  </th>

                  <th>
                    <div className="header">
                      <h5>הערה</h5>
                      <Underline className="underline" />
                    </div>
                  </th>

                  <th>
                    <div className="header">
                      <h5>מספר הזמנה</h5>
                      <Underline className="underline" />
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
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
                        <tr key={order.id}>
                          <td>
                            <h5 className="row-value">
                              {order.checkoutDetails.prefferedPickupLocation}
                            </h5>
                          </td>
                          <td>
                            <h5 className="row-value">
                              {orderFullName(order)}
                            </h5>
                          </td>
                          <td>
                            <h5 className="row-value">
                              {DateUtil.format(DateUtil.fromString(order.date))}
                            </h5>
                          </td>

                          <td>
                            <h5 className="row-value">
                              {order.totalCostAfterDiscount}
                            </h5>
                          </td>

                          <td>
                            <h5 className="row-value">
                              {order.checkoutDetails.comments}
                            </h5>
                          </td>

                          <td>
                            <a
                              href={`${window.location.origin}/order/${order.orderNumber}`}
                            >
                              <h5 className="row-value">{order.orderNumber}</h5>
                            </a>
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
`;