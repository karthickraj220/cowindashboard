import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {details} = props
  return (
    <div className="container">
      <h1 className="heading">Vaccination by gender</h1>
      <ResponsiveContainer width={1000} height={300} className="pie1">
        <PieChart>
          <Pie
            data={details}
            startAngle={0}
            endAngle={180}
            dataKey="count"
            innerRadius="40%"
            outerRadius="70%"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Others" fill=" #2cc6c6" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default VaccinationByGender
