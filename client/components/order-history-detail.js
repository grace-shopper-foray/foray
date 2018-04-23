import React from 'react';
import { connect } from 'react-redux';
import { getUserOrderHistoryThunk } from '../store';

const OrderHistoryDetail = props => {
  const { user, orderHistory } = props;
  return (
    <div>
      <h1>Order History</h1>
      {orderHistory[0] ? (
        orderHistory.map(eachOrder => {
          return <EachOrderDetail key={eachOrder.id} eachOrder={eachOrder} />;
        })
      ) : (
        <h3>No Order History</h3>
      )}
    </div>
  );
};

const EachOrderDetail = props => {
  const { eachOrder } = props;
  return (
    <div>
      <h5>Order Number: {eachOrder.id}</h5>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Moon Name</th>
            <th scope="col">Planet Name</th>
            <th scope="col"> Number Of Guest</th>
            <th scope="col">Price</th>
            <th scope="col">duration</th>
          </tr>
        </thead>
        {eachOrder.trips &&
          eachOrder.trips.map(eachOrderDetail => {
            return (
              <EachOrder
                key={eachOrderDetail.id}
                eachOrderDetail={eachOrderDetail}
              />
            );
          })}
      </table>
    </div>
  );
};

const EachOrder = props => {
  const { eachOrderDetail } = props;
  return (
    <tbody>
      <tr>
        <th scope="row">{eachOrderDetail.moonName}</th>
        <th scope="row">{eachOrderDetail.planetName}</th>
        <td scope="col">{eachOrderDetail.tripOrder.numberOfGuests}</td>
        <td scope="col">{eachOrderDetail.price}</td>
        <td scope="col">{eachOrderDetail.numberOfNights} days</td>
      </tr>
    </tbody>
  );
};

const mapState = state => {
  //grab user id
  return {
    user: state.user,
    orderHistory: state.orderHistory
  };
};

const mapDispatch = { getUserOrderHistoryThunk };

export default connect(mapState, mapDispatch)(OrderHistoryDetail);
