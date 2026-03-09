//Displaying course name
const Header = ({ courseName }) => <h2>{courseName}</h2>

//Displaying course content
const Content = ({ courseContent }) => {
    return(
        <div>
            {courseContent.map(content => <Part key={content.id} contentPart={content}/>)}

            <b>total of <Sum parts={courseContent}/> exercises</b>
        </div>
    )
}

//Displaying all parts of the course content
const Part = ({ contentPart }) => <p>{contentPart.name} {contentPart.exercises}</p>

//Sum all exercises 
const Sum = ({ parts }) => parts.reduce((s, p) => s + p.exercises, 0)

//Main course component
const Course = ({ course }) => {
    return(
        <div>
            <Header courseName={course.name}/>
            <Content courseContent={course.parts}/>
        </div>
    )
}

export default Course