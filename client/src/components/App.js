import React, { Component } from 'react'

class App extends Component {
  render(){
    return (
      <div>
          <nav className="navbar navbar-light bg-light">
            <p className="navbar-brand">Find your flight</p>
            <form action = '/flights' className="form-inline" method = 'GET'>
              <input className='form-control mr-sm-2' aria-label='Large' type='text' name='from' placeholder='FROM'/>
              <input className='form-control mr-sm-2' type='text' name='to' placeholder='TO'/>
              <input className='form-control mr-sm-2' type='filght-date' name='date' placeholder='DATE (YYYY-MM-DD)'/>
              <button  className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </nav>
      </div>
    )
  }
}

export default App
