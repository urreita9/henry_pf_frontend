export const paginationFunc = (users, page, perPage) => {
    const initial = (page - 1) * perPage;
    const final = initial + perPage;

    const paginatedUsers = users.slice(initial, final);

    return paginatedUsers;
};

export const searchFunc = (users, search) => {
    // const searchedUsers = []
    const searchedUsers = users.filter(
        (el) => el.name.includes(search) || el.lastname.includes(search) || el.email.includes(search)
    );
    return searchedUsers;
};

export const filterFunc = (users, { caretaker, state, banned, role }) => {
    var filteredUsers = users;
    if (caretaker === 'yes') {
        filteredUsers = filteredUsers.filter((el) => el.caretaker !== null);
    } else if (caretaker === 'no') {
        filteredUsers = filteredUsers.filter((el) => el.caretaker === null);
    }
    if (state === 'yes') {
        filteredUsers = filteredUsers.filter((el) => el.state === true);
    } else if (state === 'no') {
        filteredUsers = filteredUsers.filter((el) => el.state === false);
    }
    if (banned === 'yes') {
        filteredUsers = filteredUsers.filter((el) => el.banned === true);
    } else if (banned === 'no') {
        filteredUsers = filteredUsers.filter((el) => el.banned === false);
    }
    if (role === 'USER') {
        filteredUsers = filteredUsers.filter((el) => el.role === 'USER');
    } else if (role === 'ADMIN') {
        filteredUsers = filteredUsers.filter((el) => el.role === 'ADMIN');
    } else if (role === 'SUPER_ADMIN') {
        filteredUsers = filteredUsers.filter((el) => el.role === 'SUPER_ADMIN');
    }

    return filteredUsers;
};

export const orderFunc = (users, order) => {
    var ordenedUsers = [];
    if (order === 'byNameAsc') {
        ordenedUsers = users.sort(SortArrayByNameAsc);
    } else if (order === 'byNameDesc') {
        ordenedUsers = users.sort(SortArrayByNameDesc);
    } else if (order === 'byLastnameAsc') {
        ordenedUsers = users.sort(SortArrayByLastnameAsc);
    } else if (order === 'byLastnameDesc') {
        ordenedUsers = users.sort(SortArrayByLastnameDesc);
    } else if (order === 'byEmailAsc') {
        ordenedUsers = users.sort(SortArrayByEmailAsc);
    } else if (order === 'byEmailDesc') {
        ordenedUsers = users.sort(SortArrayByEmailDesc);
    } else {
        ordenedUsers = users
    }

    return ordenedUsers;
};

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
