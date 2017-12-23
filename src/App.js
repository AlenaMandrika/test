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
            {
              x: x,
              y: y,
              color: 'black',
              value: '',
              size: '12px',
              backgroundColor: ''}
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
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this)
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

  changeBackgroundColor (e) {
    let backgroundColor = e.target.value
    let cells = this.state.cells
    let coord = this.state.focusElement.split('-')

    cells.forEach((sell) => {
      if (sell.x === +coord[0] && sell.y === +coord[1]) {
        sell.backgroundColor = backgroundColor
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
          <p>font color</p>
          <select className='select-block' onChange={this.changeColor} name="color">
            <option value="black">black</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="red">red</option>
            <option value="gold">red</option>
          </select>
          <p>font size</p>
          <select className='select-block' onChange={this.changeSize} name="size">
            <option value='8px'>8</option>
            <option value='12px'>12</option>
            <option value='12px'>18</option>
            <option value='24px'>24</option>
            <option value='24px'>28</option>
          </select>
          <p>background color</p>
          <select className='select-block' onChange={this.changeBackgroundColor} name="backgroundColor">
            <option value="white">white</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="red">red</option>
            <option value="gold">red</option>
          </select>
        </div>

          {this.state.cells.map((cell) => {
            return <div key={cell.x + '-' + cell.y}
                        className='cell'
                        id={cell.x + '-' + cell.y}>
                    <input
                     className='cell-input'
                     value={cell.value}
                     name={cell.x + '-' + cell.y}
                     style={{color: cell.color, fontSize: cell.size, backgroundColor: cell.backgroundColor}}
                     onFocus={this.focusElement}
                     onChange={this.valueCange}
                //placeholder={cell.x + '-' + cell.y}
                     type="text"/>
                   </div>
          })}
      </div>

    )
  }
}

export default App
