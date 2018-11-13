import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBaseEntity } from 'src/app/models';
import { LoggerService } from '../application-services';

export interface IBaseService<T> {
  get(id: string): Observable<T>;
  list(): Observable<T[]>;
  add(item: T): Observable<T>;
  update(item: T): Observable<T>;
  delete(id: string): void;
}

export class BaseService<T extends IBaseEntity> implements IBaseService<T> {
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
        map(action => {
            if (action.payload.exists) {
              const data = action.payload.data() as any;
              const id = action.payload.id;
              return { id, ...data };
            }
          })
      );
  }

  list(): Observable<T[]> {
    this.logger.logInfo(`[BaseService] list`);
    return this.collection.snapshotChanges()
    .pipe(
        map(changes => {
            return changes.map(a => {
              const data = a.payload.doc.data() as any;
              data.id = a.payload.doc.id;
              return data;
            });
          })
    );
  }

  add(item: T): Observable<T> {
    const subject = new Subject<T>();

    this.logger.logInfo('[BaseService] adding item', item);
    this.collection.add(item).then(ref => {
      const newItem = {
        id: ref.id,
        ...(item as any) /* workaround until spreads work with generic types */
      };
      ref.set(newItem);
      subject.next(newItem);
    });

    return subject.asObservable();
  }

  update(item: T): Observable<T> {
    const subject = new Subject<T>();

    this.logger.logInfo('[BaseService] updating item', item);
    const docRef = this.collection
      .doc<T>(item.id)
      .set(item)
      .then(() => subject.next(item));

    return subject.asObservable();
  }

  delete(id: string): void {
    this.logger.logInfo(`[BaseService] adding item ${id}`);

    const docRef = this.collection.doc<T>(id);
    docRef.delete();
  }
}
