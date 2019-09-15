import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {fetchAllUsers , deleteOneUser, acceptOneUser} from '../actions/authActions';

const Admin = ({ users, fetchAllUsers, deleteOne, acceptOne }) => {

    const columns = [{
        Header: 'Username',
        accessor: 'username',
    }, {
        Header: 'Name',
        accessor: 'name',
    }, {
        Header: 'Surname',
        accessor: 'surname',
    // }, {
    //     Header : 'Email',
    //     accessor: 'email'
    // }, {
        // Header: 'City',
        // accessor: 'city'
    }, {
        Cell: ({original:{_id}}) => {    
            return (<>
                <button onClick = {() => acceptOne(_id)}>Accept User</button>
                <button onClick = {() => deleteOne(_id)}>Delete User</button>
            </>)
            }
    }];

    const handleClick = () => {

    }

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

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

export default connect(mapStateToProps,{ fetchAllUsers, deleteOne: deleteOneUser, acceptOne: acceptOneUser })(Admin);