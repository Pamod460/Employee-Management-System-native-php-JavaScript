window.addEventListener("load", load);
var employees;
var genders;
var designations;
var statuses;
var baseUrl = "../server/";

function load() {
    setInterval(imgSlider, 5000);
    setInterval(checkCookie, 300000);
    initialStyles();
    checkCookie();
    loadTable();
    loadGender();
    loadDesignation();
    loadStatus();
    ButtonsEvents();
}

function initialStyles() {
    document.getElementById('body').setAttribute("style", "background-image: url('images/1.jpg');background-repeat: no-repeat;background-size: cover; ");
    let IIds = [MainWindow, btnSearch, btnSearchClear, txtSearchName, cmbSearchGender, cmbSearchDesignation, cmbSearchStatusemployee, btnUpdate, btnDelete, login, main];
    let NIds = [txtSearchNic]
    setStyle(IIds, NIds);
}

function setStyle(x, y) {
    for (let i = 0; i < x.length; i++) {
        const element = x[i];
        element.style.display = "none";
    }
    for (let i = 0; i < y.length; i++) {
        const element = y[i];
        element.style.display = "inline";
    }
}

function ButtonsEvents() {
    btnClear.addEventListener("click", function () {
        if (txtName.value != "" || txtEmail.value != "" || txtNic.value != "" || dobDate.value != "" || dobDate.type != "text" || cmbGender.value != 'null' || cmbDesignation.value != 'null' || cmbStatusemployee.value != 'null') {
            var confirm = window.confirm("Are you sure to clear the form ?");
            if (confirm) {
                clearForm();
            }
        }
    });
    btnSubmit.addEventListener("click", addEmployee);
    // ----------------------------------------------------------------------------------------
    btnName.addEventListener("click", searchByName);
    btnGender.addEventListener("click", searchByGender);
    btnDesignation.addEventListener("click", searchByDesignation);
    btnStatus.addEventListener("click", searchByStatus);
    btnAny.addEventListener("click", searchByAll);
    btnNic.addEventListener("click", searchByNic);
    //------------------------------------------------------------------------------------------
    cmbSearchGender.addEventListener("change", searchEmployee);
    cmbSearchDesignation.addEventListener("change", searchEmployee);
    cmbSearchStatusemployee.addEventListener("change", searchEmployee);
    txtSearchNic.addEventListener("input", function () {
        searchEmployee();
        btnSearch.style.display = "none";
    });
    txtSearchName.addEventListener("input", function () {
        searchEmployee();
        btnSearch.style.display = "none";
    });
    txtSearchNic.addEventListener("focus", function () {
        btnSearchClear.style.display = "inline";
    });
    btnSearchClear.addEventListener("click", function () {
        searchReset();
        initialStyles();
        main.style.display = "block";
        loadTable();
    });
    btnLogOut.addEventListener("click", function () {
        deleteCookie();
        // checkCookie();
        let NIds = [MainWindow];
        let IIds = [main, login];
        setStyle(IIds, NIds);

    });
    btnLoginMain.addEventListener("click", function () {
        let NIds = [login];
        let IIds = [main, MainWindow];
        setStyle(IIds, NIds);
    })
}

function userVerify(a, b) {
    if (a == "root" && b == "12345") {
        initialStyles();
    } else {
        h1.innerHTML = "Please login";
        // window.alert("You Cann't Update or Delete this employee...!");
    }
}

function setCookie(name, Pwrd) {
    today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime() + 3600000 * 24 * 15);
    document.cookie = "name=" + encodeURIComponent(name) + ";path=/" + ";expires=" + expire.toUTCString();
    document.cookie = "password=" + encodeURIComponent(Pwrd) + ";path=/" + ";expires=" + expire.toUTCString();
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function checkCookie() {
    var Name = getCookie("name");
    var Pwrd = getCookie("password");
    if (Name != null && Pwrd != null) {
        toggleVeiw();
        if (btnDelete.value != "" && btnDelete.value != null) {
            employeeDelete(JSON.parse(btnDelete.value));
        }
        if (btnUpdate.value != "" && btnUpdate.value != null) {
            submitUpdate(JSON.parse(btnUpdate.value));
        }
    } else {
        main.style.display = "none";
        userVerify(Name, Pwrd);
        var uconfirm = confirm("sesion expired");
        if (uconfirm) {
            MainWindow.style.display = "block";
            p1.innerHTML = "sesion expired";
            btnLogin.addEventListener("click", function () {
                toggleVeiw();
                Name = userName.value;
                Pwrd = password.value
                if (Name != "" && Name != null && Pwrd != "" && Pwrd != null) {
                    setCookie(Name, Pwrd);
                }
            });
        }
    }
}

function deleteCookie() {
    var Name = getCookie("name");
    var Pwrd = getCookie("password");
    today = new Date();
    var expire = new Date();
    expire.setTime(today.getTime());
    document.cookie = "name=" + encodeURIComponent(Name) + ";path=/" + ";expires=" + expire.toUTCString();
    document.cookie = "password=" + encodeURIComponent(Pwrd) + ";path=/" + ";expires=" + expire.toUTCString();
}

function toggleVeiw() {
    main.style.display = "inline";
    login.style.display = "none";
}

function toggleButton(data, row) {
    employeeUpdate(data, row);

    btnUpdate.addEventListener("click", function () {
        this.value = JSON.stringify(data);
        checkCookie();
        clearForm();
        btnSubmit.style.display = "inline";
        btnUpdate.style.display = "none";
    });
    btnDelete.addEventListener("click", function () {
        this.value = JSON.stringify(data);
        btnSubmit.style.display = "inline";
        btnUpdate.style.display = "none";
        btnDelete.style.display = "none";
        checkCookie();
        clearForm();
    });
}

function clearForm() {
    txtName.value = "";
    txtEmail.value = "";
    txtMobile.value = "";
    txtNic.value = "";
    dobDate.value = "";
    dobDate.removeAttribute = ("type");
    dobDate.type = "text";
    cmbGender.value = "null";
    cmbDesignation.value = "null";
    cmbStatusemployee.value = "null";
    btnSubmit.style.display = "inline";
    btnUpdate.style.display = "none";
    btnDelete.style.display = "none";
    loadGender();
    loadDesignation();
    loadStatus();
    resetSelection();
}

function loadTable() {
    employees = get("employeeController.php");
    loadData(employees);
}

function loadData(x) {
    // var gender = function (e) { return e.gender.name };
    var gender = "gender"
    var designation = "designation"
    var statusEmployee = "statusEmployee"

    var array = ["id", "name", "dob", "nic", "mobile", gender, designation, statusEmployee];
    display.innerHTML = "";
    for (let i = 0; i < x.length; i++) {
        const data = x[i];
        var tr = document.createElement("tr");
        for (let j = 0; j < array.length; j++) {
            const element = array[j];
            var td = document.createElement("td");
            if (j > 4) {
                td.innerHTML = data[element]['name'];
            } else {
                td.innerHTML = data[element];
            }
            tr.append(td);
        }

        tr.addEventListener("dblclick", function () {
            toggleButton(data, this);
        });
        display.append(tr);
    }
}

function employeeDelete(data) {
    // console.log(employee['id']);
    var userVerify = confirm("Are you sure You want to Delete this Employee: " + data['name']);
    if (userVerify) {
        var http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                window.alert("Successfull");

                //get("delete.php?id=" + data['id']);
                loadTable();
            }
        }
        http.open("GET", baseUrl + "delete.php?id=" + data['id'], true);
        http.send();
    }
}

function loadGender() {
    var genders = get("genderController.php");
    fillCombo(genders, cmbGender, 'null', "Gender");
}

function loadDesignation() {
    var designations = get("designationController.php");
    fillCombo(designations, cmbDesignation, '0', "Designation");
}

function loadStatus() {
    var statuses = get("statusEmployeeController.php");
    fillCombo(statuses, cmbStatusemployee, '0', "Status");
}

function fillCombo(x, cmb, cmbData, y) {
    cmb.innerHTML = "";
    let option = document.createElement("option");
    option.innerHTML = "select a " + y;
    option.value = 'null';
    option.setAttribute("selected", "selected");
    option.setAttribute("disabled", "disabled");
    cmb.appendChild(option);
    for (let i = 0; i < x.length; i++) {
        const datumi = x[i];
        let option = document.createElement("option");
        option.innerHTML = datumi.name;
        option.value = JSON.stringify(datumi);
        if (datumi.id = cmbData.id) {
            cmb.value = JSON.stringify(cmbData);
        }
        cmb.appendChild(option);
    }
}

function addEmployee() {
    var url = "insert.php";
    var quary = "txtName=" + txtName.value + "&txtNic=" + txtNic.value + "&txtMobile=" + txtMobile.value + "&txtEmail=" + txtEmail.value + "&dobDate=" + dobDate.value + "&cmbGender=" + cmbGender.value.id + "&cmbDesignation=" + cmbDesignation.value + "&cmbStatusemployee=" + cmbStatusemployee.value;
    post(url, quary);
    loadTable();
    clearForm();
}

function searchEmployee() {
    var qry = "txtSearchNic=" + txtSearchNic.value + "&txtSearchName=" + txtSearchName.value + "&cmbSearchGender=" + cmbSearchGender.value + "&cmbSearchDesignation=" + cmbSearchDesignation.value + "&cmbSearchStatusemployee=" + cmbSearchStatusemployee.value;
    schemployees = get("search.php?" + qry);
    loadData(schemployees);
}

function employeeUpdate(employee, row) {
    var confirm = window.confirm("Are you sure to modify this employee " + employee.name + "  ?");
    if (confirm) {

        resetSelection();
        setSelection(row);
        txtName.value = employee['name'];
        txtMobile.value = employee['mobile'];
        txtEmail.value = employee['email'];
        txtNic.value = employee['nic'];
        dobDate.value = employee['dob'];
        var cmbarr = ['gender', 'designation', 'statusEmployee'];
        for (let index = 0; index < cmbarr.length; index++) {
            if (index = 1) {
                gend = get("genderController.php");
                upgenders = employee[cmbarr[0]];
                fillCombo(gend, cmbGender, upgenders, "Gender");

            }
            if (index = 2) {
                des = get("designationController.php");
                updesignations = employee[cmbarr[1]];
                fillCombo(des, cmbDesignation, updesignations, "Designation");
            }
            if (index = 3) {
                stat = get("statusEmployeeController.php");
                upstatuses = employee[cmbarr[2]];
                fillCombo(stat, cmbStatusemployee, upstatuses, "Status");
            }
        }
        let NIds = [btnUpdate, btnDelete];
        let IIds = [btnSubmit]
        setStyle(IIds, NIds)
    } else {
        if (!(txtName.value != "" || txtEmail.value != "" || txtNic.value != "" || dobDate.value != "" || cmbGender.value != 'null' || cmbDesignation.value != 'null' || cmbStatusemployee.value != 'null')) {
            let NIds = [btnUpdate, btnDelete];
            let IIds = [btnSubmit]
            setStyle(NIds, IIds)
        }
    }

}

function submitUpdate() {
    var url = "update.php";
    var quary = "txtName=" + txtName.value + "&txtNic=" + txtNic.value + "&txtMobile=" + txtMobile.value + "&txtEmail=" + txtEmail.value + "&dobDate=" + dobDate.value + "&cmbGender=" + cmbGender.value + "&cmbDesignation=" + cmbDesignation.value + "&cmbStatusemployee=" + cmbStatusemployee.value;
    post(url, quary);
    loadTable();
    clearForm();
}

function setSelection(row) {
    row.setAttribute("class", "bg-info");

}

function resetSelection() {
    var rmcls = display.children;
    for (let i = 0; i < rmcls.length; i++) {
        const element = rmcls[i];
        element.removeAttribute("class");
    }
}

function searchFormat(x, a) {
    searchReset();
    navbarDropdown.innerHTML = x.innerHTML;
    btnSearchClear.style.display = "inline";
    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        element.style.display = "inline";
    }
}

function searchReset() {
    txtSearchNic.value = "";
    txtSearchName.value = "";
    cmbSearchGender.value = "null";
    cmbSearchDesignation.value = "null";
    cmbSearchStatusemployee.value = "null";
    txtSearchNic.style.display = "none";
    txtSearchName.style.display = "none";
    cmbSearchGender.style.display = "none";
    cmbSearchDesignation.style.display = "none";
    cmbSearchStatusemployee.style.display = "none";
}

function searchByNic() {
    const Ids = [txtSearchNic]
    searchFormat(btnNic, Ids);
}

function searchByName() {
    const Ids = [txtSearchName]
    searchFormat(btnName, Ids);
}

function searchByGender() {
    var genders = get("genderController.php");
    const Ids = [cmbSearchGender]
    searchFormat(btnGender, Ids);
    fillCombo(genders, cmbSearchGender, '0', "Gender");
}

function searchByDesignation() {
    var designations = get("designationController.php");
    const Ids = [cmbSearchDesignation]
    searchFormat(btnDesignation, Ids);
    fillCombo(designations, cmbSearchDesignation, '0', "Designation");
}

function searchByStatus() {
    var statuses = get("statusEmployeeController.php");
    const Ids = [cmbSearchStatusemployee]
    searchFormat(btnStatus, Ids);
    fillCombo(statuses, cmbSearchStatusemployee, '0', "status");
}

function searchByAll() {
    const Ids = [txtSearchName, cmbSearchGender, cmbSearchDesignation, cmbSearchStatusemployee]
    searchFormat(btnAny, Ids);
    var genders = get("genderController.php");
    var designations = get("designationController.php");
    var statuses = get("statusEmployeeController.php");
    fillCombo(genders, cmbSearchGender, '0', "Gender");
    fillCombo(designations, cmbSearchDesignation, '0', "Designation");
    fillCombo(statuses, cmbSearchStatusemployee, '0', "status");

}

function get(url) {
    var url = baseUrl + url
    // console.log(url);
    var http = new XMLHttpRequest();
    http.open("GET", url, false);
    http.send();
    return JSON.parse(http.responseText);
}

function post(url, quary) {
    var url = baseUrl + url
    var http = new XMLHttpRequest();
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send(quary);
    // return JSON.parse(http.responseText);
}

function imgSlider() {
    var images = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg", "./images/6.jpg"];
    //  document.getElementById('body').setAttribute("style", "background-image: url(" + images[1] + ");background-repeat: no-repeat;background-size: cover;backdrop-filter: blur(20px)");
    imgCount = images.length;
    var randomCount = (Math.floor(Math.random() * imgCount));
    document.getElementById('body').setAttribute("style", "background-image: url(" + images[randomCount] + ");background-repeat: no-repeat;background-size: cover;");
}
