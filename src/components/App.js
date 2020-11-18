import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  fetchPets = () => {
    const { type } = this.state.filters
    let endpoint = (type === 'all') ? '/api/pets' : `/api/pets?type=${type}`

    // let endpoint = '/api/pets'
    // if (this.state.filters.type != 'all') {
    //   endpoint = `/api/pets?type=${this.state.filters.type}`
    // }
     
    fetch(endpoint)
    .then(resp => resp.json())
    .then(pets => {
      this.setState({pets: pets})
    })
  }

  setAdopted = (clickedId) => {
    // const newPet = this.state.pets.find(pet => pet.id === id)
    // newPet.isAdopted = true

    const updatedPets = this.state.pets.map(petObj => {
      if (clickedId === petObj.id) {
        return {
          ...petObj,
          isAdopted: true
        }
      } else {
        return petObj
      }
    })
    this.setState({
      pets: updatedPets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.setAdopted}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
