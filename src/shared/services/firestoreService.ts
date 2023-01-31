import {
  CollectionReference,
  Firestore,
  collection,
  getDocs,
  query,
  DocumentData,
  QuerySnapshot,
  QueryFieldFilterConstraint,
  addDoc,
  WithFieldValue,
} from "firebase/firestore";
import { firestoreDatabase } from "./firestoreDatabase";

export class FirestoreService<T extends WithFieldValue<DocumentData>> {
  private db: Firestore;
  private collectionRef: CollectionReference<DocumentData>;

  constructor(private collectionName: string) {
    this.db = firestoreDatabase;
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public async getAll(): Promise<T[]> {
    const docs = await getDocs(this.collectionRef);
    return this.querySnapshotToObject(docs);
  }

  public async getByQuery(
    queryWhere: QueryFieldFilterConstraint
  ): Promise<T[]> {
    const q = query(this.collectionRef, queryWhere);
    const querySnapshot = await getDocs(q);
    const data = this.querySnapshotToObject(querySnapshot);
    return data;
  }

  public async writeDoc(document: T) {
    try {
      const doc = await addDoc(this.collectionRef, document);
      return doc.id;
    } catch (error) {
      debugger;
    }
  }

  private querySnapshotToObject(querySnapshot: QuerySnapshot<DocumentData>) {
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as T[];
  }
}
