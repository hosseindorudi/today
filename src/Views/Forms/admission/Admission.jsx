import React from "react";
// import "./admission.css";
import './main.scss';
import CircularMenu from './CircularMenu';
const Admission = () => {
  return (
    <div className="page-container">
    <CircularMenu
       pages={
         [
           ["About", "#3E84E6"],
           ["Contact", "#15AB88"],
           ["Portfolio", "#eb5089"],
           ["LinkedIn", "#AFD91A"],
           ["Dribbble", "#F27127"],
           ["Facebook", "#07C7F2"],
           ["Twitter", "#9768D1"],
           ["Instagram", "#F2B705"],
         ]
       }
    />
   </div>
//     <div>

      
//    <div class="circleMenu">
//    <div  class="menu-open" name="menu-open" id="menu-open" />
//    <div class="menu-open-button" for="menu-open">
   
//   </div>

//    <button href="#" class="menu-item blue"> <i class="fa fa-anchor"></i> </button>
//    <button href="#" class="menu-item green"> <i class="fa fa-coffee"></i> </button>
//    <button href="#" class="menu-item red"> <i class="fa fa-heart"></i> </button>
//    <button href="#" class="menu-item purple"> <i class="fa fa-microphone"></i> </button>
//    <button href="#" class="menu-item orange"> <i class="fa fa-star"></i> </button>
//    <button href="#" class="menu-item lightblue"> <i class="fa fa-diamond"></i> </button>
   
// </div>
//   <div><button>s</button></div>

//     </div>
  );
};

export default Admission;
