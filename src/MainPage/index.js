import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { loadCity, openBar, hideBar} from '../actions';
// import { addItem, removeItem } from './actions'
class MainPage extends Component {    
    onButtonClick = async ()=>{
       const result = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName.value}&APPID=00ecf3598af037e5fe498083d2539431`)
        const data = await result.json()
        this.props.actions.loadCity(data);
        const citiesStorage = JSON.parse(localStorage.getItem("cities"));
        if (this.cityName.value) {
            const citiesSet = new Set(citiesStorage.values)
            citiesSet.add(this.cityName.value)
            localStorage.setItem("cities",JSON.stringify({
                values:  Array.from(citiesSet)
            }))
        }
    }
    renderPurpouses = ()=>{
        const citiesStorage = JSON.parse(localStorage.getItem("cities"));
        if (citiesStorage.values){
            return citiesStorage.values.slice(0,5).map(value=>(
                <div onMouseDown={() => this.onPurposeClick(value)}>{value}</div>
            ))
        }
    }
    onPurposeClick = (purposeValue)=>{
        this.cityName.value = purposeValue
        this.props.actions.hideBar()
    }
    render() {
        return <div>
            <div onBlur = {this.props.actions.hideBar} onFocus={this.props.actions.openBar}>
            <input ref={(ref)=>{this.cityName = ref}}></input>
            {
                this.props.barIsOpen ? this.renderPurpouses() : 
                null
            }
            </div>
            <button onClick={this.onButtonClick}>Мне повезет!</button>
            <div>{this.props.cityData.weather[0].main}</div>
            <div>{this.props.cityData.weather[0].description}</div>
        </div>
    }
}

const mapStateToProps = state => ({ ...state.reducer})
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
        loadCity,
        openBar,
        hideBar
        },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)