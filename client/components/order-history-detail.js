import React from 'react'
import { connect } from 'react-redux'

const OrderHistoryDetail = props => {
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
            <td>ORder # 1</td>
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
  return {}
}

export default connect(mapState)(OrderHistoryDetail)
