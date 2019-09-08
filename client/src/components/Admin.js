import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {fetchAllUsers} from '../actions/authActions';
//import { ActionAccessibility } from 'material-ui/svg-icons';

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
   // Cell: ({ original }) => <onclick={() => ActionAccessibility(original)}...>
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

export default connect(mapStateToProps,{ fetchAllUsers })(Admin);