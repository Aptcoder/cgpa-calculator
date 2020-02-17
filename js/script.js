
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../sw.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
  }





// course item to be used in making the html for adding a course
const courseItem = "<div class= \" col col-sm-6 \">\n<label for=\"course\">Course</label> \
<input id= \"course \" class= \"form-control \" type= \"text\" required ></div>\
<div class= \"col col-sm-3 \"> \
<label for= \"units \">Units</label> \
<select id= \"units\" class= \"form-control\" required> \
            <option>0</option> \
            <option>1</option> \
            <option>2</option> \
            <option>3</option> \
            <option>4</option> \
            <option>5</option> \
        </select> \
        </div> \
        <div class= \" col col-sm-3 \"> \
        <label for= \"grade \">Grade</label> \
        <select id= \"grade\" class= \"form-control \" required> \
            <option value = \"0\">none</option> \
            <option value=\"5\">A</option> \
            <option value=\"4\">B</option> \
            <option value=\"3\">C</option> \
            <option value=\"2\">D</option> \
            <option value=\"1\">E</option> \
            <option value=\"0\">F</option> \
        </select> \
    </div>"



    getGradePoints = (units,grades) => {
        let lengthBoth = units.length;
        let gradePoints = [];
        for (let i = 0 ; i < lengthBoth ;i++){
            let val = parseInt(units[i].value) * parseInt(grades[i].value)
            gradePoints.push(val);
        }

        return gradePoints;
    }

    //helper function to sum up values in the array
    sumUp = (array) => {
        let sum = array.reduce((accumulator,current) => accumulator + current )
        return sum;
    }

    getCgpa = (units,gradePoint) => {
        let cgpa = Number(gradePoint/units).toFixed(2);
        return cgpa;
    }

    getUnitsValues = (array) => {
        let newArray = array.map((e) => {
            return parseInt(e.value);
        })
        return newArray;
    }


    dispalyCgpa = function(cgpa){
        let askBox = document.querySelector('.ask');
        console.log('spy')
        askBox.innerHTML = `<div class=\"container cgpa\"> \
        <div class=\"card\"> \
            <h1 class=\"card-title\" style=\"text-align: center;\">(c)gpa : ${cgpa}</h1>\
        </div> \
    </div> \
</div> ` ;

        let gpa = document.querySelector('.cgpa')
        gpa.scrollIntoView({
            behavior : "smooth",
            block : "center"
        })
    }
     
    var form = document.querySelector('#main-form')
    var calculateGpa = function(event){
        console.log('sumbitted')
        var units = document.querySelectorAll('#units')
        var grades = document.querySelectorAll('#grade')
        console.log(units);
        // console.log(grades);
        var arrayUnits = Array.from(units);
        var arrayGrades = Array.from(grades);
        console.log(arrayUnits);
        // console.log(arrayGrades);
        var gradePoints = getGradePoints(arrayUnits,arrayGrades);
        let gradePointsTotal = sumUp(gradePoints);
        let arrayUnitsValues = getUnitsValues(arrayUnits);
        let unitsTotal = sumUp(arrayUnitsValues);
        console.log(arrayUnitsValues)
        console.log(unitsTotal)
        // console.log(gradePoints);
        let cgpa = getCgpa(unitsTotal,gradePointsTotal);
        console.log(cgpa);
        dispalyCgpa(cgpa);
        event.preventDefault();
        }

        form.addEventListener('submit',calculateGpa)

    let addCourseItem = function(event){
        let btn = event.target;
        // get parent element of the button clicked
        let parent = btn.parentElement;
        console.log(parent)
        let card = parent.querySelector('.card-body')
        console.log(card)
        // create div and add div
        // let div = document.createElement('div')
        let course = document.querySelector('.course-item');
        let clone = course.cloneNode(true);
        card.append(clone);
        form = document.querySelector('#main-form')
        form.addEventListener('submit',calculateGpa)
        console.log('course item added')
    }

    //btn listener add function

 let addBtnListeners = () =>{

    let btn_add = document.querySelectorAll('.btn-add');
    btn_add_arr = Array.from(btn_add);
    console.log(btn_add_arr)
    btn_add_arr.forEach((btn) => {
        btn.addEventListener('click',addCourseItem)
    })

}

    // add event listener to the buttons
    addBtnListeners();
    // console.log(clone)

    let askBox = document.querySelector('.ask')
    var addSemester = function( event){
        console.log(event.target.value)
        // removeFormChildren();
        let val = event.target.value;
        for ( let i =1 ; i < val ;i++ ){
            let semester = document.querySelector('.semester-item');
            let clone = semester.cloneNode(true);
            form.insertBefore(clone,document.querySelector('#form-submit'));
        }
        addBtnListeners();
        event.target.blur();
        askBox.innerHTML = ''
    }
    var semesterAmt = document.querySelector('#semestersAmt')
    semesterAmt.addEventListener('change' , addSemester)
    // console.log(semesterAmt.value)




