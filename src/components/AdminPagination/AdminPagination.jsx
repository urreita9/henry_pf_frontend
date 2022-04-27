import { Box, Pagination, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const AdminPagination = ({ items, page, setPage,  }) => {
    const handlePage = (e, value) => {
        setPage(value);
    };

    return (
        <Box width='100%' display='flex' alignItems={'center'} justifyContent={'space-around'}>
            <Stack spacing={2}>
                <Pagination count={items} page={page} onChange={handlePage} />
            </Stack>
        </Box>
    );
};

export default AdminPagination;
