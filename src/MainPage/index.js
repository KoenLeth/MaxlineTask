import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCity, openBar, hideBar, setSearchValue} from '../actions';
import _ from 'lodash';
import { array } from './weatherArray';

class MainPage extends Component {
    onButtonClick = async () => {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.searchValue}&APPID=00ecf3598af037e5fe498083d2539431`)
        const data = await result.json()
        if (data.cod !== "404") {
            this.props.actions.loadCity(data);
            const citiesStorage = JSON.parse(localStorage.getItem("cities")) || {};

            if (this.props.searchValue) {
                const citiesSet = new Set(citiesStorage.values)
                citiesSet.add(this.props.searchValue)
                localStorage.setItem("cities", JSON.stringify({
                    values: Array.from(citiesSet)
                }))
            }
        }
    }
    renderPurpouses = () => {
        const citiesStorage = JSON.parse(localStorage.getItem("cities"));
        if (citiesStorage) {
            return <div className="purpouses_container"> 
            
            {
                citiesStorage.values.filter((value)=>value.toLowerCase().includes(this.props.searchValue.toLowerCase())).slice(0, 5).map(value => (
                <div onMouseDown={() => this.onPurposeClick(value)} className="purpouse">{value}</div>
            ))}
            </div>
        }
    }
    onPurposeClick = (purposeValue) => {
        this.props.actions.setSearchValue(purposeValue)
        this.props.actions.hideBar()
    }
    toKeyValue = (value) => {
        let weatherIcon = array[`${value.toLowerCase()}`];
        return weatherIcon
    }
    render() {
        return <div>
            <div className="searchbar_container">
                <div onBlur={this.props.actions.hideBar} onFocus={this.props.actions.openBar} className="searchbox">
                    <input onChange={(e)=>this.props.actions.setSearchValue(e.target.value)} value={this.props.searchValue} placeholder="Введите название города" id="searchbar"></input>
                    {
                this.props.barIsOpen ? this.renderPurpouses() :
                    null
                }
                </div>
                <button onClick={this.onButtonClick} id="search_button">Мне повезет!</button>
            </div>
        {
            !_.isEmpty(this.props.cityData.weather) ?
            <div className="weather_container">
                    <div className="tempreture_container">
                    <div>{this.props.cityData.main.temp ? parseInt(this.props.cityData.main.temp - 273, 10) : "waiting for response"}°C</div>
                    <img src={this.toKeyValue(this.props.cityData.weather[0].main)} className="image"/>
                    </div>
                    <div>{parseInt(this.props.cityData.main.temp_max - 273, 10)}°C/{parseInt(this.props.cityData.main.temp_min - 273, 10)}°C</div>
                    <div>{this.props.cityData.weather[0].description}</div>
                    <div>Скорость ветра: {this.props.cityData.wind.speed}м/с</div>
                    
                </div> :
                null
            }
            </div>
    }
}
    


const mapStateToProps = state => ({ ...state.reducer })
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loadCity,
            openBar,
            hideBar,
            setSearchValue
        },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
