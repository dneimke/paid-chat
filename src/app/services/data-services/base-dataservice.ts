import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseEntity } from 'src/app/models';
import { LoggerService } from '../application-services';

export interface IBaseService<T> {
  get(id: string): Observable<T>;
  list(): Observable<T[]>;
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: string): void;
}

export abstract class BaseService<T extends IBaseEntity> implements IBaseService<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected uri: string, protected afs: AngularFirestore, protected logger: LoggerService) {
    this.collection = this.afs.collection(this.uri);
  }

  get(identifier: string): Observable<T> {
    this.logger.logInfo(`[BaseService] get: ${identifier}`);

    return this.collection
      .doc<T>(identifier)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            /* workaround until spread works with generic types */
            const data = doc.payload.data() as any;
            const id = doc.payload.id;
            return { id, ...data };
          }
        })
      );
  }

  list(): Observable<T[]> {
    this.logger.logInfo(`[BaseService] list`);

    return this.collection
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  add(item: T): Promise<T> {
    this.logger.logVerbose('[BaseService] adding item', item);

    const promise = new Promise<T>((resolve, reject) => {
      this.collection.add(item).then(ref => {
          const newItem = {
            id: ref.id,
            /* workaround until spread works with generic types */
            ...(item as any)
          };
          // ref.set(newItem);
          resolve(newItem);
        });
    });

    return promise;
  }

  update(item: T): Promise<T> {
    this.logger.logVerbose(`[BaseService] updating item ${item.id}`);

    const promise = new Promise<T>((resolve, reject) => {
      const docRef = this.collection
        .doc<T>(item.id)
        .set(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });

    return promise;
  }

  delete(id: string): void {
    this.logger.logVerbose(`[BaseService] deleting item ${id}`);

    const docRef = this.collection.doc<T>(id);
    docRef.delete();
  }
}
