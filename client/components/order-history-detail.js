import React from 'react'
import { connect } from 'react-redux'
import { getUserOrderHistoryThunk } from '../store'

class OrderHistoryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
  }

  componentDidMount() {
    //user id fetch data here
    this.props.getUserOrderHistoryFromServer()
  }

  render() {
    console.log(this.props.user)
    const { user } = this.props
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
}

const mapState = state => {
  //grab user id
  return { user: state.user }
}

const mapDispatch = dispatch => {
  return {
    getUserOrderHistoryFromServer: function(user) {
      return dispatch(getUserOrderHistoryThunk(user))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistoryDetail)
