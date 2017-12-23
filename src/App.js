import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    let cells = []
    if (!window.localStorage.cells) {
      for (let y = 0; y < 100; y++) {
        for (let x = 0; x < 100; x++) {
          cells.push(
            {x: x, y: y, color: 'black', value: '', size: '12px'}
          )
        }
      }
    }
    if (window.localStorage.cells) {
      cells = JSON.parse(window.localStorage.cells)
    }

    this.state = {
      cells: cells,
      focusElement: null,
    }

    this.changeColor = this.changeColor.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.focusElement = this.focusElement.bind(this)
    this.valueCange = this.valueCange.bind(this)

  }

  changeColor (e) {
    let color = e.target.value
    let cells = this.state.cells
    let coord = this.state.focusElement.split('-')

    cells.forEach((sell) => {
      if (sell.x === +coord[0] && sell.y === +coord[1]) {
        sell.color = color
      }
    })

    this.setState({cells})
    window.localStorage.cells = JSON.stringify(cells)
  }

  changeSize (e) {
    let size = e.target.value
    let cells = this.state.cells
    let coord = this.state.focusElement.split('-')

    cells.forEach((sell) => {
      if (sell.x === +coord[0] && sell.y === +coord[1]) {
        sell.size = size
      }
    })

    this.setState({cells})
    window.localStorage.cells = JSON.stringify(cells)
  }

  focusElement (e) {
    let focusElement = e.target.name
    this.setState({focusElement})
  }

  valueCange (e) {
    let cells = this.state.cells
    let coord = e.target.name.split('-')

    cells.forEach((sell) => {
      if (sell.x === +coord[0] && sell.y === +coord[1]) {
        sell.value = e.target.value
      }
    })

    this.setState({cells})
    window.localStorage.cells = JSON.stringify(cells)
  }

  render () {
    return (
      <div className='table'>
        <div className="control-panel">
          <select value='black' onChange={this.changeColor} name="color" id="color">
            <option value="black">black</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="red">red</option>
          </select>
          <select onChange={this.changeSize} name="size" id="size">
            <option value='8px'>8</option>
            <option value='12px'>12</option>
            <option value='24px'>24</option>
          </select>
          <button onClick={this.save}>save</button>
        </div>
        {this.state.cells.map((cell) => {
          return <div key={cell.x + '-' + cell.y}
                      className='cell'
                      id={`${cell.x}-${cell.y}`}>
            <input className='cell-input' value={cell.value}
                   name={`${cell.x}-${cell.y}`}
                   style={{color: cell.color, fontSize: cell.size}}
                   onFocus={this.focusElement}
                   onChange={this.valueCange}
                   //placeholder={`${cell.x}-${cell.y}`}
                   type="text"/>
          </div>
        })}
        {/*<table id="nonFixedSample"  width="50%" border="0" cellpadding="0" cellspacing="0">*/}
        {/*<tr>*/}
        {/*<th>0</th>*/}
        {/*<th>1</th>*/}
        {/*</tr>*/}
        {/*<tr>*/}
        {/*<td>some1</td>*/}
        {/*<td>some2</td>*/}
        {/*</tr>*/}
        {/*</table>*/}
      </div>

    )
  }
}

export default App
