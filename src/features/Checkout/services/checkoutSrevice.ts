import { store } from "../../../store/store";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../../shared/services/firestore";
import {
  selectCartProductInstancesWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../../Cart/store/cartSlice";
import { Order } from "../../../model/order/order";
import { selectCheckout } from "../store/checkoutSlice";

export class checkoutService {
  private static ordersRef = collection(db, "orders");

  public static async createOrder(): Promise<string | undefined> {
    const state = store.getState();
    const totalCostAfterDiscount = selectCartTotalCostAfterDiscount(state);
    const totalCost = selectCartTotalCost(state);
    const checkoutDetails = selectCheckout(state);
    const products = selectCartProductInstancesWithAmount(state);

    const order: Order = {
      totalCost,
      totalCostAfterDiscount,
      ...checkoutDetails,
      date: Date.now().toString(),
      products,
      saleId: "1",
    };

    try {
      const docRef = await addDoc(this.ordersRef, order);
      console.log(
        `order created with ID: ${docRef.id} ${JSON.stringify(order, null, 4)}`
      );
      return docRef.id;
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  }

  public static async getOrderByName(name: string) {
    const q = query(this.ordersRef, where("name", "==", "eyal"));
    const querySnapshot = await getDocs(q);
    const data = this.querySnapshotToObject(querySnapshot);
    console.log(data);
  }

  private static querySnapshotToObject(
    querySnapshot: QuerySnapshot<DocumentData>
  ) {
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
}
