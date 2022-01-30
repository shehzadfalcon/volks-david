import React from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import Axios from "axios";
import Notifier from "../../utils/Notifier";
import baseUrl from "../../utils/baseUrl";
export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      tax: 0,
      amountAfterDeductTax: 0,
      pendingAmountAfterDeductTax: 0,
    };
    this.handleGenerate = this.handleGenerate.bind(this);
    this.handleTaxChange = this.handleTaxChange.bind(this);
    this.handleProductTable = this.handleProductTable.bind(this);

    this.state.filterText = "";
    this.state.products = [
      {
        id: 1,
        description: "",
        qty: 1,
        unit_price: 5,
        total_price: 0,
        discount: 0,
        net_price: 0,
      },
    ];
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.products !== this.state.products) {
      let subTotal =
        this.state.products.length > 0 &&
        this.state.products
          .map((item) => item.net_price)
          .reduce((prev, curr) => prev + curr, 0);

      var amountAfterDeductTax = subTotal - this.state.tax;
      let pendingAmountAfterDeductTax = amountAfterDeductTax;
      this.setState({
        pendingAmountAfterDeductTax: pendingAmountAfterDeductTax,
        amountAfterDeductTax: amountAfterDeductTax,
      });
    }
  }
  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  }

  handleAddEvent(evt) {
    var id = Math.floor(Math.random() * 999999);
    var product = {
      id: id,
      description: "",
      qty: 0,
      unit_price: 5,
      total_price: 0,
      discount: 0,
      net_price: 0,
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleProductTable(evt) {
    const { id, name, value } = evt.target;
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key == name && product.id == id) {
          if (name == "qty") {
            product["total_price"] = value * product["unit_price"];
            product["net_price"] = product["total_price"] - product["discount"];
          } else if (name == "discount") {
            product["net_price"] = product["total_price"] - value;
          } else if (name == "unit_price") {
            product["total_price"] = value * product["qty"];
            product["net_price"] = product["total_price"] - product["discount"];
          }
          product[key] = value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
    //  console.log(this.state.products);
  }
  handleGenerate = async () => {
    this.props.formik.handleSubmit();
    let errors = this.props.formik.errors;
    let values = this.props.formik.values;
    values.products = this.state.products;
    values.pendingAmountAfterDeductTax =
      this.state.pendingAmountAfterDeductTax.toLocaleString("en-US");
    values.amountAfterDeductTax =
      this.state.amountAfterDeductTax.toLocaleString("en-US");
    values.tax = this.state.tax.toLocaleString("en-US");
    let emptyCheck = Object.values(errors).map((value) => value !== "");
    if (emptyCheck.length == 0) {
      this.setState({ loading: true });
      var id = Math.floor(Math.random() * 999999);
      values.products[0].id = id;
      try {
        let response = await Axios({
          method: "post",
          url: `${baseUrl}/generate-invoice`,
          data: values,
        });
        this.setState({ loading: false });
        let mediaLink = response.data.url;
        var fileName = response.data.fileName;
        fetch(mediaLink, {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            // Create blob link to download
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            // Append to html link element page
            document.body.appendChild(link);
            // Start download
            link.click();
            // Clean up and remove the link
            link.parentNode.removeChild(link);
          });
        // router.push("/profile");
      } catch (err) {
        this.setState({ loading: false });

        if (err.response) {
          Notifier(err.response.data.message, "error");
        }
      }
    }
  };
  handleTaxChange = (e) => {
    let value = e.target.value;
    this.setState({ tax: value });

    let subTotal =
      this.state.products.length > 0 &&
      this.state.products
        .map((item) => item.net_price)
        .reduce((prev, curr) => prev + curr, 0);

    var amountAfterDeductTax = subTotal - value;
    let pendingAmountAfterDeductTax = amountAfterDeductTax;
    this.setState({
      pendingAmountAfterDeductTax: pendingAmountAfterDeductTax,
      amountAfterDeductTax: amountAfterDeductTax,
    });
  };
  render() {
    return (
      <div>
        {/* <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput.bind(this)}
        /> */}
        <ProductTable
          onProductTableUpdate={this.handleProductTable}
          onRowAdd={this.handleAddEvent.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}
        />
        <div className="row">
          <div className="col-lg-4 col-sm-5"></div>

          <div className="col-lg-4 col-sm-5 ml-auto">
            <table className="table table-clear">
              <tbody>
                <tr>
                  <td className="left">
                    <strong>Subtotal</strong>
                  </td>
                  <td className="right">
                    {this.state.products.length > 0 &&
                      this.state.products
                        .map((item) => item.net_price)
                        .reduce((prev, curr) => prev + curr, 0)
                        .toLocaleString("en-US")}{" "}
                    PKR
                  </td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Tax </strong>
                  </td>
                  <td className="right">
                    <TextInput
                      type="number"
                      name="tax"
                      value={this.state.tax}
                      placeholder="Tax"
                      onChange={this.handleTaxChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Total</strong>
                  </td>
                  <td className="right">
                    {this.state.amountAfterDeductTax.toLocaleString("en-US")}{" "}
                    PKR
                  </td>
                </tr>
                <tr>
                  <td className="left">
                    <strong>Balance Due</strong>
                  </td>
                  <td className="right">
                    <strong>
                      {this.state.pendingAmountAfterDeductTax.toLocaleString(
                        "en-US"
                      )}{" "}
                      PKR
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-content-end p-3">
          <Button
            type="button"
            onClick={this.handleGenerate}
            className="btn btn-success pull-right"
            disabled={this.state.loading}
            label={this.state.loading ? "Loading..." : "Generate Invoice"}
          />
        </div>
      </div>
    );
  }
}
// class SearchBar extends React.Component {
//   handleChange() {
//     this.props.onUserInput(this.refs.filterTextInput.value);
//   }
//   render() {
//     return (
//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.props.filterText}
//           ref="filterTextInput"
//           onChange={this.handleChange.bind(this)}
//         />
//       </div>
//     );
//   }
// }

class ProductTable extends React.Component {
  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.props.products.map(function (product) {
      if (product.description.indexOf(filterText) === -1) {
        return;
      }
      return (
        <ProductRow
          onProductTableUpdate={onProductTableUpdate}
          product={product}
          onDelEvent={rowDel.bind(this)}
          key={product.id}
        />
      );
    });
    return (
      <div>
        <div className="p-3">
          <Button
            type="button"
            onClick={this.props.onRowAdd}
            className="btn btn-success pull-right"
            label="Add"
          />
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th> Unit Price</th>
              <th>Total Price</th>
              <th>Discount</th>
              <th>Net Price</th>
            </tr>
          </thead>

          <tbody>{product}</tbody>
        </table>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }
  render() {
    return (
      <tr className="eachRow">
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Description",
            value: this.props.product.description,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "number",
            name: "qty",
            placeholder: "qty",
            min: 0,
            value: this.props.product.qty,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "number",
            name: "unit_price",
            placeholder: "Unit Price",
            min: 0,
            value: this.props.product.unit_price,
            id: this.props.product.id,
          }}
        />

        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "number",
            name: "total_price",
            placeholder: "Total Price",
            disabled: true,
            min: 0,
            value: this.props.product.total_price,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "number",
            name: "discount",
            placeholder: "Discount",
            min: 0,
            value: this.props.product.discount,
            id: this.props.product.id,
          }}
        />
        <EditableCell
          onProductTableUpdate={this.props.onProductTableUpdate}
          cellData={{
            type: "number",
            name: "net_price",
            placeholder: "Net Price",
            disabled: true,
            min: 0,
            value: this.props.product.net_price,
            id: this.props.product.id,
          }}
        />
        <td className="del-cell">
          <input
            type="button"
            onClick={this.onDelEvent.bind(this)}
            value="X"
            className="del-btn"
          />
        </td>
      </tr>
    );
  }
}
class EditableCell extends React.Component {
  render() {
    return (
      <td>
        <TextInput
          type={this.props.cellData.type ? this.props.cellData.type : "text"}
          name={this.props.cellData.name}
          // disabled={
          //   this.props.cellData.disabled ? this.props.cellData.disabled : false
          // }
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          placeholder={this.props.cellData.placeholder}
          onChange={this.props.onProductTableUpdate}
          min={this.props.cellData.min}
        />
      </td>
    );
  }
}
