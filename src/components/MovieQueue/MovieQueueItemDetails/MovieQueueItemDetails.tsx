import React from 'react';
import { IMovieQueueItem } from '../../../interfaces/MovieQueue';

interface MovieQueueItemDetailsProps {
  item: IMovieQueueItem;
  user: any;
  delete: any;
}

const MovieQueueItemDetails = (props: MovieQueueItemDetailsProps) => {
  const userFiendlyDate = new Date(props.item.created).toDateString();
  return (
    <tr className="">
      <td>
        <small>{props.item.userId}</small>
      </td>
      <td>{props.user?.name ?? '-'}</td>
      <td>{userFiendlyDate}</td>
      <td>
        <a href={props.item.url}>{props.item.url}</a>
      </td>
      <td>
        <button
          onClick={() => props.delete(props.item.id)}
          className="DeleteButton"
          title="Usuń"
          disabled
        >
          X
        </button>
      </td>
    </tr>
  );
};

export default MovieQueueItemDetails;
