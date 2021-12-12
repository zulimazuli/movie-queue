import { RouteComponentProps } from '@reach/router';
import { table } from 'console';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import MovieQueueItemDetails from '../../components/MovieQueue/MovieQueueItemDetails/MovieQueueItemDetails';
import { IMovieQueueItem } from '../../interfaces/MovieQueue';
import { RootState } from '../../store';
import { fetchUsersData } from '../../store/admin-actions';
import { fetchAllQueuesData } from '../../store/queue-actions';

const Admin = (props: RouteComponentProps) => {
  const [movieQueue, setMovieQueue] = useState<IMovieQueueItem[]>([]);

  const dispatch = useDispatch();
  const queues = useSelector((state: RootState) => state.admin.allQueues);
  const users = useSelector((state: RootState) => state.admin.users);

  useEffect(() => {
    dispatch(fetchAllQueuesData());
    dispatch(fetchUsersData());
  }, [dispatch]);

  const deleteHandler = (id: string) => console.log('Delete not handled - wip');

  const sorted = queues.slice().sort((a: any, b: any) => {
    return b.created - a.created;
  });

  const rows = sorted.map((el) => (
    <MovieQueueItemDetails
      key={el.id}
      item={el}
      user={users.find((u) => u.id == el.userId)}
      delete={deleteHandler}
    />
  ));
  return (
    <>
      <Header />
      <div className="admin">
        <table>
          <thead>
            <tr>
              <th>User UID</th>
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
