import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {details} = props
  return (
    <>
      <div className="bar-container">
        <h1 className="heading">Vaccination Coverage</h1>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={details}>
            <XAxis dataKey="vaccineDate" />
            <YAxis />
            <Legend />
            <Bar dataKey="dose1" name="Dose 1" fill="#2d87bb" barSize="20%" />
            <Bar dataKey="dose2" name="Dose 2" fill="#f54394" barSize="20%" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
export default VaccinationCoverage
