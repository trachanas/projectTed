import React, { useEffect } from 'react';
import {connect, useSelector} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {fetchAllUsers, loginUser} from '../actions/authActions';

const columns = [{
    Header: 'Username',
    accessor: 'username',
}, {
    Header: 'Name',
    accessor: 'name',
}, {
    Header: 'Surname',
    accessor: 'surname',
}, {
    Header : 'Email',
    accessor: 'email'
}, {
    Header: 'Country',
    accessor: 'country'
}, {
    Header: 'City',
    accessor: 'city'
}, {
    Header: 'Zip Code',
    accessor: 'zipCode'
}, {
    Header: 'VAT Number',
    accessor: 'vatNumber'
}, {
    Header: 'Credit Card Number',
    accessor: 'creditCardNumber'
},

{
    Cell: () => (
        <>
            <button>Accept User</button>
            <button>Delete User</button>
        </>
    )
}];


const Admin = ({ users, fetchAllUsers }) => {

    console.log(users);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <>
            <h1>HELLO ADMIN</h1>
            <ReactTable
                data={users}
                columns={columns}
            />
        </>
    );
};

const mapStateToProps = state => ({
    users: state.auth.users,
});

export default connect(
    mapStateToProps,
    { fetchAllUsers }
)(Admin);