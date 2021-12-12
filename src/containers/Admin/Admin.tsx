import { RouteComponentProps } from '@reach/router';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import MovieQueueItemDetails from '../../components/MovieQueue/MovieQueueItemDetails/MovieQueueItemDetails';
import { IMovieQueueItem } from '../../interfaces/MovieQueue';
import { getMovieQueue } from '../../services/firestore';

const Admin = (props: RouteComponentProps) => {
  const [movieQueue, setMovieQueue] = useState<IMovieQueueItem[]>([]);

  useEffect(() => {
    getMovieQueue().then((queue) => setMovieQueue(queue));
  }, []);

  const deleteHandler = (id: string) => console.log('Delete not handled - wip');

  const rows = movieQueue.map((el) => (
    <MovieQueueItemDetails key={el.id} item={el} delete={deleteHandler} />
  ));
  return (
    <>
      <Header />
      <div className="admin">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Created</th>
              <th>Url</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
};

export default Admin;
