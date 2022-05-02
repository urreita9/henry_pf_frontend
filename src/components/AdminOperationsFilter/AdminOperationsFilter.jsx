import { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const perPageOptions = [];
for (let index = 1; index <= 10; index++) {
  perPageOptions.push(index);
}

const AdminOperationsFilter = ({ order, filter, search, perPage, setPage, setPerPage, setOrder, setFilter, setSearch }) => {
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleOrder = (e) => {
    setOrder(e.target.value);
    setPage(1);
  };

  const handleFilter = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
    setPage(1);
  };

  const handleClear = (e) => {
    setSearch('');
    setOrder('');
    setFilter({
      caretaker: '',
      status: '',
      banned: '',
      dispatch: '',
    });
    setPage(1);
    setPerPage(6);
  };

  const handlePerPage = (e) => {
    setPerPage(e.target.value);
    setPage(1);
  };

  return (
    <Box width='100%' display='flex' flexDirection={'row'} justifyContent={'space-around'}>
      <TextField id='search' label='Search' value={search} onChange={handleSearch} />
      <FormControl sx={{ width: '10%' }}>
        <InputLabel id='order'>Order by</InputLabel>
        <Select labelId='order' name='order' value={order} label='Order by' onChange={handleOrder}>
          <MenuItem value={'byPriceDesc'}>By Price Desc</MenuItem>
          <MenuItem value={'byPriceAsc'}>By Price Asc</MenuItem>
          <MenuItem value={'byNameDesc'}>By Name Desc</MenuItem>
          <MenuItem value={'byNameAsc'}>By Name Asc</MenuItem>
          <MenuItem value={'byLastnameDesc'}>By Lastname Desc</MenuItem>
          <MenuItem value={'byLastnameAsc'}>By Lastname Asc</MenuItem>
          <MenuItem value={'byEmailDesc'}>By Email Desc</MenuItem>
          <MenuItem value={'byEmailAsc'}>By Email Asc</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl sx={{ width: '10%' }}>
        <InputLabel id='caretaker'>Caretaker</InputLabel>
        <Select
          labelId='caretaker'
          name='caretaker'
          value={filter.caretaker}
          label='Caretaker'
          onChange={handleFilter}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'yes'}>Caretaker Users</MenuItem>
          <MenuItem value={'no'}>No Caretaker Users</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl sx={{ width: '10%' }}>
        <InputLabel id='status'>Status</InputLabel>
        <Select labelId='status' name='status' value={filter.status} label='status' onChange={handleFilter}>
          <MenuItem value={'CREATED'}>Created</MenuItem>
          <MenuItem value={'APPROVED'}>Approved</MenuItem>
          <MenuItem value={'COMPLETED'}>Completed</MenuItem>
          <MenuItem value={'CANCELED'}>Canceled</MenuItem>
        </Select>
      </FormControl>
      {/* <FormControl sx={{ width: '10%' }}>
        <InputLabel id='banned'>Banned</InputLabel>
        <Select labelId='banned' name='banned' value={filter.banned} label='Banned' onChange={handleFilter}>
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={'yes'}>Banned Users</MenuItem>
          <MenuItem value={'no'}>Free Users</MenuItem>
        </Select>
      </FormControl> */}
      <FormControl sx={{ width: '10%' }}>
        <InputLabel id='dispatch'>Dispatch</InputLabel>
        <Select labelId='dispatch' name='dispatch' value={filter.dispatch} label='dispatch' onChange={handleFilter}>
          <MenuItem value={'OK'}>Dispatched</MenuItem>
          <MenuItem value={'UNDISPATCH'}>Undispatched</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '5%' }}>
        <InputLabel id='perPage'>Per Page</InputLabel>
        <Select labelId='perPage' name='perPage' value={perPage} label='Per Page' onChange={handlePerPage}>
          {perPageOptions.map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant='contained' onClick={handleClear}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default AdminOperationsFilter;
