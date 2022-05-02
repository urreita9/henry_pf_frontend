export const paginationFunc = (users, page, perPage) => {
    const initial = (page - 1) * perPage;
    const final = initial + perPage;

    const paginatedUsers = users.slice(initial, final);

    return paginatedUsers;
};

export const searchFunc = (operations, search) => {
    const searchLower = search.toLowerCase()
    const searchedOperation = operations.filter(op => {
        const {user, caretaker} = op

        if(user.name.includes(searchLower) || user.lastname.includes(searchLower) || caretaker.name.includes(searchLower) || caretaker.lastname.includes(searchLower)) return user
    })

    return searchedOperation;
};

export const filterFunc = (operations, { caretaker, status, banned, dispatch }) => {
    let filteredOperations = operations;
    
    if (status === 'CREATED') {
        filteredOperations = filteredOperations.filter(op => op.operation.status === 'CREATED')
    } else if (status === 'APPROVED') {
        filteredOperations = filteredOperations.filter(op => op.operation.status === 'APPROVED')
    } else if (status === 'COMPLETED') {
        filteredOperations = filteredOperations.filter(op => op.operation.status === 'COMPLETED')
    } else if (status === 'CANCELED') {
        filteredOperations = filteredOperations.filter(op => op.operation.status === 'CANCELED')
    }

    if (dispatch === 'OK') {
        filteredOperations = filteredOperations.filter(op => op.operation.dispatch === true)
    } else if (dispatch === 'UNDISPATCH') {
        filteredOperations = filteredOperations.filter(op => op.operation.dispatch === false)
    }

    return filteredOperations;
};

export const orderFunc = (operations, order) => {
    let ordenedOperations = [];

    if (order === 'byNameAsc') {
        ordenedOperations = operations.sort(SortArrayByNameAsc);
    } else if (order === 'byNameDesc') {
        ordenedOperations = operations.sort(SortArrayByNameDesc);
    } else if (order === 'byLastnameAsc') {
        ordenedOperations = operations.sort(SortArrayByLastnameAsc);
    } else if (order === 'byLastnameDesc') {
        ordenedOperations = operations.sort(SortArrayByLastnameDesc);
    } else if (order === 'byEmailAsc') {
        ordenedOperations = operations.sort(SortArrayByEmailAsc);
    } else if (order === 'byEmailDesc') {
        ordenedOperations = operations.sort(SortArrayByEmailDesc);
    } else if(order === 'byPriceDesc'){
        ordenedOperations = operations.sort(sortArrayByPriceDesc)
    } else if(order === 'byPriceAsc'){
        ordenedOperations = operations.sort(sortArrayByPriceAsc)
    } else {
        ordenedOperations = operations
    }

    return ordenedOperations;
};

const sortArrayByPriceDesc = (x, y) => {
    if(x.operation.price > y.operation.price){
        return -1;
    }
    if(x.operation.price < y.operation.price){
        return 1;
    }
    return 0;
}

const sortArrayByPriceAsc = (x, y) => {
    if(x.operation.price < y.operation.price){
        return -1;
    }
    if(x.operation.price > y.operation.price){
        return 1;
    }
    return 0;
}

const SortArrayByNameDesc = (x, y) => {
    if (x.name < y.name) {
        return -1;
    }
    if (x.name > y.name) {
        return 1;
    }
    return 0;
};

const SortArrayByNameAsc = (x, y) => {
    if (x.name > y.name) {
        return -1;
    }
    if (x.name < y.name) {
        return 1;
    }
    return 0;
};

const SortArrayByLastnameDesc = (x, y) => {
    if (x.lastname < y.lastname) {
        return -1;
    }
    if (x.lastname > y.lastname) {
        return 1;
    }
    return 0;
};

const SortArrayByLastnameAsc = (x, y) => {
    if (x.lastname > y.lastname) {
        return -1;
    }
    if (x.lastname < y.lastname) {
        return 1;
    }
    return 0;
};

const SortArrayByEmailDesc = (x, y) => {
    if (x.email < y.email) {
        return -1;
    }
    if (x.email > y.email) {
        return 1;
    }
    return 0;
};

const SortArrayByEmailAsc = (x, y) => {
    if (x.email > y.email) {
        return -1;
    }
    if (x.email < y.email) {
        return 1;
    }
    return 0;
};
