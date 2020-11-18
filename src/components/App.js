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

  setFilter = (type) => {
    this.setState({
      filters: {
        type: type
      }
    })
  }

  fetchPets = () => {
    let endpoint = '/api/pets'
    if (this.state.filters.type != 'all') {
      endpoint = `/api/pets?type=${this.state.filters.type}`
    }
     
    fetch(endpoint)
    .then(resp => resp.json())
    .then(pets => {
      this.setState({pets: pets})
    })
  }

  setAdopted = (id) => {
    const newPet = this.state.pets.find(pet => pet.id === id)
    newPet.isAdopted = true
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
              <Filters onChangeType={this.setFilter} onFindPetsClick={this.fetchPets} />
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
