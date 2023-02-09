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
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  DocumentSnapshot,
  runTransaction,
  Transaction,
} from "firebase/firestore";
import { firestoreDatabase } from "./firestoreDatabase";

export interface FirebaseEntity extends Object {
  id: string;
}

export class FirestoreService<T extends WithFieldValue<DocumentData>> {
  protected db: Firestore;
  protected collectionRef: CollectionReference<DocumentData>;

  constructor(protected collectionName: string) {
    this.db = firestoreDatabase;
    this.collectionRef = collection(this.db, this.collectionName);
  }

  public async getAll(): Promise<T[]> {
    const docs = await getDocs(this.collectionRef);
    return this.querySnapshotToObject(docs);
  }

  public async getById(id: string) {
    const docRef = doc(this.db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return this.documentSnapshotToObject(docSnap);
  }

  public async getByQuery(
    queryWhere: QueryFieldFilterConstraint
  ): Promise<T[]> {
    const q = query(this.collectionRef, queryWhere);
    const querySnapshot = await getDocs(q);
    const data = this.querySnapshotToObject(querySnapshot);
    return data;
  }

  public async insert(document: Omit<T, "id">) {
    const doc = await addDoc(this.collectionRef, document);
    return doc.id;
  }

  public async update(id: string, document: T) {
    const docRef = doc(this.db, this.collectionName, id);
    await updateDoc(docRef, document);
  }

  public async liveQuery(cb: (arr: T[]) => void) {
    const q = query(this.collectionRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const res: T[] = this.querySnapshotToObject(querySnapshot);
      cb(res);
    });
    return unsubscribe;
  }

  public async transaction<T>(fn: (transaction: Transaction) => Promise<T>) {
    await runTransaction(this.db, fn);
  }

  private querySnapshotToObject(querySnapshot: QuerySnapshot<DocumentData>) {
    return querySnapshot.docs.map((doc) => this.documentSnapshotToObject(doc));
  }

  private documentSnapshotToObject(
    documentSnapshot: DocumentSnapshot<DocumentData>
  ) {
    return {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    } as unknown as T;
  }
}
