import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {fetchAllUsers , deleteOneUser, acceptOneUser} from '../actions/authActions';
import {exportToXML, exportToJSON} from "../actions/product-actions";

const Admin = ({ users, fetchAllUsers, deleteOne, acceptOne, exportToXML, exportToJSON }) => {

    const exportBidsToJSON = () => {
        exportToJSON();
    };

    const exportBidsToXML = () => {
        exportToXML();
    };

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



    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return (
        <>
            <h1>HELLO ADMIN</h1>
            <button onClick={() => exportBidsToJSON()}>Export to JSON</button>
            <button onClick={() => exportBidsToXML()}>Export to XML</button>
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



export default connect(mapStateToProps,{ fetchAllUsers, deleteOne: deleteOneUser, acceptOne: acceptOneUser, exportToXML, exportToJSON })(Admin);