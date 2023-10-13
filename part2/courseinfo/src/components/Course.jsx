import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course =({course})=>{
    const totalExercises = course.parts.reduce((total, part) => total + part.exercises, 0);
    
    return(
        <div>
            <Header name={course.name}/>
            <Content parts ={course.parts}/>
            <Total total={totalExercises}/>
        </div>
    )

}

export default Course;