import React, { useContext, useEffect, useState } from 'react';
import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import * as FirestoreService from '../../services/firestore';
import MovieQueue from '../MovieQueue/MovieQueue';
import * as Validators from '../../validators/validators';
import Toolbar from '../Toolbar/Toolbar';
import { UserContext } from '../../providers/UserProvider';
import useNotification from '../../hooks/useNotification';

function Dashboard() {
  const linkPlaceholder = 'https://www.filmweb.pl/film/...';

  const user = useContext(UserContext);

  const [link, setLink] = useState('');
  const [movies, setMovies] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const {addSuccess, addError} = useNotification();
  
  const handleInputChange = (e: any) => {
    setLink(e.target.value);
  }

  const handleButtonClick = () => {
    setLoading(true);
    let isError = false;
    if (!Validators.validateUrl(link)) {
      addError('Niepoprawny link.');
      isError = true;
    }

    if (Validators.validateExists(movies, 'url', link)) {
      addError( 'Ten link już był dodany.');
      isError = true;
    }

    if (!isError) {
      handleAddMovieLink(link);
      setLink('');
    } else {
      setLoading(false);
    }
  }

  const handleAddMovieLink = (link: string) => {

    const newElement = { url: link };
    setMovies([newElement, ...movies])

    FirestoreService
      .addMovieLink(link, user.uid!)
      .then(() => {
        addSuccess('Dodano link do listy.');
      })
      .catch(err => {
        addError('Coś poszło nie tak...');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  const fetchMovieQueue = () =>
    FirestoreService
      .getMovieQueue(user.uid!)
      .then(querySnapshot => {
        let list: any = []
        querySnapshot.docs.forEach(d => {
          list.unshift({ id: d.id, ...d.data() })
        });
        setMovies(list);
      });
  
  const deleteItemHandler = (id: string) => {
    setLoading(true)
    FirestoreService.removeMovieLink(id).then(() => {
      setLoading(false);
      fetchMovieQueue();
    });
  }

  useEffect(() => {
    setLoading(true);
    fetchMovieQueue()
      .then(() => setLoading(false))
  }, []);

  return (
    <>
      <Toolbar />
          <Loader show={loading}></Loader>
      <div className="addLinkPanel">
        <div>Umieść link do filmu:</div>
        <TextInput id="link" changed={handleInputChange} value={link} placeholder={linkPlaceholder} />
        <Button clicked={handleButtonClick} disabled={loading} >Dodaj</Button>
      </div>
      <MovieQueue movies={movies} deleted={deleteItemHandler} loader={setLoading} />
    </>
  );
}

export default Dashboard;
