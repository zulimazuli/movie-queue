import React, { useContext, useEffect, useState } from 'react';
import TextInput from '../../components/UI/TextInput/TextInput';
import Button from '../../components/UI/Button/Button';
import Loader from '../../components/UI/Loader/Loader';
import MovieQueue from '../../components/MovieQueue/MovieQueue';
import * as Validators from '../../validators/validators';
import Header from '../../components/Header/Header';
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

const Dashboard = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.queue.queue);
  const loading = useSelector((state: RootState) => state.ui.loading);

  const linkPlaceholder = 'https://www.filmweb.pl/film/...';

  const user = useContext(UserContext);

  const [link, setLink] = useState('');

  const handleInputChange = (e: any) => {
    setLink(e.target.value);
  };

  const handleAddButtonClick = () => {
    let isError = false;

    if (!Validators.validateUrl(link)) {
      addError('Niepoprawny link.');
      isError = true;
    }

    if (
      Validators.validateExists(movies, 'url', link) ||
      Validators.validateIncludes(movies, 'url', link)
    ) {
      addError('Ten link już był dodany');
      isError = true;
    }

    if (!isError) {
      dispatch(addItemToQueue({ link, userId: user.uid! }));
      setLink('');
    } else {
    }
  };

  const deleteItemHandler = (itemId: string) => {
    dispatch(removeItemFromQueue(itemId));
  };

  useEffect(() => {
    dispatch(fetchQueueData(user.uid!));
  }, [user.uid, dispatch]);

  return (
    <>
      <Header />
      <Loader show={loading}></Loader>
      <div className="addLinkPanel">
        <div>Umieść link do filmu:</div>
        <TextInput
          id="link"
          changed={handleInputChange}
          value={link}
          placeholder={linkPlaceholder}
        />
        <Button clicked={handleAddButtonClick} disabled={loading}>
          Dodaj
        </Button>
      </div>
      <MovieQueue movies={movies} deleted={deleteItemHandler} />
    </>
  );
};

export default Dashboard;
