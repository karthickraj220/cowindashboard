import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import './index.css'

const displaystatusdetails = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    displaystatus: displaystatusdetails.initial,
    last7dayvaccinationdetails: [],
    vaccinationbyagedetails: [],
    vaccinationbygenderdetails: [],
  }

  componentDidMount() {
    this.covidVaccinationDataApiUrl()
  }

  covidVaccinationDataApiUrl = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const coviddetail = await response.json()
    if (response.ok === true) {
      const formatedcoviddetail = {
        last7DaysVaccination: coviddetail.last_7_days_vaccination,
        vaccinationByAge: coviddetail.vaccination_by_age,
        vaccinationByGender: coviddetail.vaccination_by_gender,
      }
      const formated7daysvaccination = formatedcoviddetail.last7DaysVaccination.map(
        each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        }),
      )
      const formatedvaccinationbyage = formatedcoviddetail.vaccinationByAge.map(
        each => ({
          age: each.age,
          count: each.count,
        }),
      )
      const formatedvaccinationbygender = formatedcoviddetail.vaccinationByGender.map(
        each => ({
          count: each.count,
          gender: each.gender,
        }),
      )
      this.setState({
        displaystatus: displaystatusdetails.success,
        last7dayvaccinationdetails: formated7daysvaccination,
        vaccinationbyagedetails: formatedvaccinationbyage,
        vaccinationbygenderdetails: formatedvaccinationbygender,
      })
    } else {
      this.setState({displaystatus: displaystatusdetails.failure})
    }
  }

  displaySuccessview = () => {
    const {
      last7dayvaccinationdetails,
      vaccinationbyagedetails,
      vaccinationbygenderdetails,
    } = this.state
    return (
      <>
        <VaccinationCoverage details={last7dayvaccinationdetails} />
        <VaccinationByGender details={vaccinationbygenderdetails} />
        <VaccinationByAge details={vaccinationbyagedetails} />
      </>
    )
  }

  displayfailureview = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <p className="failure-message">Something went wrong</p>
    </div>
  )

  displayloadingview = () => (
    <div className="loading-container">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </div>
  )

  switchfunc = () => {
    const {displaystatus} = this.state
    switch (displaystatus) {
      case displaystatusdetails.success:
        return this.displaySuccessview()
      case displaystatusdetails.initial:
        return this.displayloadingview()
      case displaystatusdetails.failure:
        return this.displayfailureview()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="covid-background">
        <div className="covid-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="logo-image"
              alt="website logo"
            />
            <p className="logo-name">Co-Win</p>
          </div>
          <h1 className="covid-heading">CoWin Vaccination in india</h1>
          {this.switchfunc()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
