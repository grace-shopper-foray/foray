import React from 'react'
import { connect } from 'react-redux'
import { getUserOrderHistoryThunk } from '../store'

const OrderHistoryDetail = props => {
  const { user, orderHistory } = props
  console.log(orderHistory)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Purchase Date</th>
            <th>Price</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Order # 1</td>
            <td>Purchase Date</td>
            <td>Price</td>
            <td>status</td>
          </tr>
        </tbody>
      </table>
    </div>
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
