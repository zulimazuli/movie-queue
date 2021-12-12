import React, { useContext, useEffect, useState } from 'react';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
import MovieQueue from '../../components/MovieQueue/MovieQueue';
import * as Validators from '../../validators/validators';
import { UserContext } from '../../providers/UserProvider';
import { RouteComponentProps } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemToQueue,
  fetchQueueData,
  removeItemFromQueue,
} from '../../store/queue-actions';
import { RootState } from '../../store';
import { addError } from '../../helpers/Notifications';
import { queueActions } from '../../store/queue-slice';
import { AddedItem } from '../../interfaces/Dtos';

const Dashboard = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.queue.queue);

  const linkPlaceholder = 'https://www.filmweb.pl/film/...';

  const user = useContext(UserContext);
  const userId = user.uid!;

  const [linkInput, setLinkInput] = useState('');

  const onAdd = () => {
    const linkItem: AddedItem = { url: linkInput, userId: userId };
    dispatch(queueActions.addLinkToQueue(linkItem));
    dispatch(addItemToQueue(linkItem));
  };

  const onRemove = (itemId: string) => {
    dispatch(queueActions.removeItemFromQueue(itemId));
    dispatch(removeItemFromQueue({ itemId, userId }));
  };

  const handleInputChange = (e: any) => {
    setLinkInput(e.target.value);
  };

  const handleAddButtonClick = () => {
    if (!Validators.validateUrl(linkInput)) {
      addError('Nieprawidłowy link.');
      return;
    }

    if (
      Validators.validateExists(movies, 'url', linkInput) ||
      Validators.validateIncludes(movies, 'url', linkInput)
    ) {
      addError('Ten link już był dodany.');
      return;
    }

    onAdd();
    setLinkInput('');
  };

  const deleteButtonHandler = (itemId: string) => {
    onRemove(itemId);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleAddButtonClick();
    }
  };

  useEffect(() => {
    dispatch(fetchQueueData(userId));
  }, [userId, dispatch]);

  return (
    <div className="dashboard">
      <div className="addLinkPanel">
        <div>Umieść link do filmu:</div>
        <TextInput
          id="link"
          changed={handleInputChange}
          value={linkInput}
          placeholder={linkPlaceholder}
          onKeyDown={handleKeyDown}
        />
        <Button clicked={handleAddButtonClick}>Dodaj</Button>
      </div>
      <MovieQueue movies={movies} deleted={deleteButtonHandler} />
    </div>
  );
};

export default Dashboard;
