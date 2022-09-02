window.addEventListener("load",ready);
function ready(){
    btnLogin.addEventListener("click",userConfirmation);

}
function userConfirmation(){
    if (userName.value=="root"&&password.value=="12345") {
        window.alert("ok");   
    }

}


// function LoginEmployee() {
//     var http = new XMLHttpRequest();
//     //console.log("s");
//     http.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var submitStatus = this.responseText;
//             console.log(submitStatus);
//             if (submitStatus) {
//                 window.alert("Successfull");
               
//                 // employeeForm.reset();
//             }
//             else {
//                 window.alert("Unsuccessfull");
//             }
//         }
//     }
//     http.open("POST", "../server/login.php", true);
//     http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     http.send("userName=" + userName.value + "&password=" + password.value );

// }