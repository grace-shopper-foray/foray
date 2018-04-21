import React from 'react'
import { connect } from 'react-redux'
import { getUserOrderHistoryThunk } from '../store'

const OrderHistoryDetail = props => {
  const { user, orderHistory } = props
  return (
    <div>
      {orderHistory[0] &&
        orderHistory.map(eachOrder => {
          return <EachOrderDetail eachOrder={eachOrder} />
        })}
    </div>
  )
}

const EachOrderDetail = props => {
  const { eachOrder } = props
  return (
    <div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order Number</th>
            <th scope="col"> Purchase Date</th>
            <th scope="col">Price</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        {eachOrder.trips &&
          eachOrder.trips.map(eachOrderDetail => {
            return <EachOrder eachOrderDetail={eachOrderDetail} />
          })}
      </table>
    </div>
  )
}

const EachOrder = props => {
  const { eachOrderDetail } = props
  console.log(eachOrderDetail)
  return (
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td scope="col">2</td>
        <td scope="col">{eachOrderDetail.pricePerTrip}</td>
        <td scope="col">4</td>
      </tr>
    </tbody>
  )
}

const mapState = state => {
  //grab user id
  return {
    user: state.user,
    orderHistory: state.orderHistory
  }
}

const mapDispatch = { getUserOrderHistoryThunk }

export default connect(mapState, mapDispatch)(OrderHistoryDetail)
