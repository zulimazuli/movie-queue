import React from 'react';
import './MovieQueueItem.css';

interface MovieItem {
    id: string,
    created: any,
    url: string,
    delete: any
}

const MovieQueueItem = (props : MovieItem) => {
    return (
      <li className="Item">
        <a href={props.url} target="_blank" rel="noreferrer">
          {props.url}
        </a>
        <button
          onClick={() => props.delete(props.id)}
          className="DeleteButton"
          title="Usuń"
        >
          X
        </button>
      </li>
    );
 }

export default MovieQueueItem;