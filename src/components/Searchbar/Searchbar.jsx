import { useState } from 'react';
import {
  Search,
  SearchForm,
  FormButton,
  FormButtonLabel,
  FormInput,
} from 'components/Searchbar/Searchbar.styled';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
const [query, setQuery] = useState('');

const handleChange = e => {
  setQuery(e.target.value.toLowerCase());
};

const handleSubmit = e => {
  e.preventDefault();
  if (query.trim() === '') {
    alert('What picture do you need?');
    return;
  }
  onSubmit(query);
};

  return (
    <Search>
      <SearchForm onSubmit={handleSubmit}>
        <FormButton type="submit">
          <span>
            <FormButtonLabel />
          </span>
        </FormButton>
        <FormInput
          name="input"
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Search>
  );
  };
  
  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  
  export default Searchbar;