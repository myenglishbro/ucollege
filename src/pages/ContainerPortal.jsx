import React from 'react'
import {students} from "../utils/students.js"
import MyPortal from './MyPortal.jsx'

const ContainerPortal = () => {
  return (
    <div className="card-container d-flex flex-wrap justify-content-center">
      {students.map((student) => (
        <MyPortal
          key={student.id}
          studentName={student.studentName}
          totalClasses={student.totalClasses}
          classesTaken={student.classesTaken}
          imageSrc={student.imageSrc}
          classesLeft={student.classesLeft}
        />
      ))}
    </div>
  )
}

export default ContainerPortal