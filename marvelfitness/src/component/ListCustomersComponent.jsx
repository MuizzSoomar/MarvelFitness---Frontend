import React, { Component } from "react";
import ListService from "../service/ListService";
import { Redirect } from "react-router";
import BootstrapTable from "react-bootstrap-table-next";
import "../styles/ListCustomers.css";

class ListCustomersComponent extends Component {
  constructor(props) {
    super(props);
    this.refreshCustomers = this.refreshCustomers.bind(this);
    this.state = {
      customerList: [],
      columns: [
        {
          dataField: "user_id",
          text: "ID"
        },
        {
          dataField: "name",
          text: "Name"
        }
      ],
      redirect: false,
      selectedCustomer: null
    };
  }

  componentDidMount() {
    this.refreshCustomers();
  }

  refreshCustomers() {
    ListService.getAllCustomers().then(response => {
      this.setState(() => {
        return {
          customerList: response.data
        };
      });
      if (this.state.redirect) {
        // ********uncomment following lines when the customer profile page is ready*******
        let link = "/profile";
        return <Redirect push to={link} />;
      }
    });
  }

  render() {
    const customers = this.state.customerList.sort((a, b) =>
      a.user_id > b.user_id ? 1 : -1
    );
    const selectRow = {
      clickToSelect: true,
      hideSelectColumn: true,
      mode: "radio",
      onSelect: (row, isSelect, rowIndex, e) => {
        this.props.updateCustomer(row);
        this.setState(() => {
          return {
            redirect: true,
            selectedCustomer: row
          };
        });
      }
    };
    if (this.state.redirect) {
      // ********uncomment following lines when the customer profile page is ready*******
      let link = "/profile";
      return <Redirect push to={link} />;
    }
    return (
      // <div className="container">
      <div className="columnOne">
        <h2>Customers</h2>
        <div className="container">
          <BootstrapTable
            keyField="user_id"
            data={customers}
            columns={this.state.columns}
            bordered={false}
            selectRow={selectRow}
            hover={true}
            rowClasses="customer"
          />
        </div>
      </div>
    );
  }
}

export default ListCustomersComponent;
