import {Pie, PieChart, Legend, ResponsiveContainer, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {details} = props

  return (
    <div className="container">
      <h1 className="heading">Vaccination by Age</h1>
      <ResponsiveContainer width={1000} height={300}>
        <PieChart>
          <Pie data={details} startAngle={0} endAngle={360} dataKey="count">
            <Cell name="18-40" fill="#5a8dee" />
            <Cell name="44-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
