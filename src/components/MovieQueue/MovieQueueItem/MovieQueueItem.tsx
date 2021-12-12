import React from 'react';

interface MovieItem {
  id: string;
  created: any;
  url: string;
  delete: any;
}

const MovieQueueItem = (props: MovieItem) => {
  return (
    <li className="queue-item">
      <a href={props.url} target="_blank" rel="noreferrer">
        {props.url}
      </a>
      <button
        onClick={() => props.delete(props.id)}
        className="delete-button"
        title="Usuń"
      ></button>
    </li>
  );
};

export default MovieQueueItem;
