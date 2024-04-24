var saveInfo = 0;
var reached = 0;


//----------------------------------------------Store data into storage ---------------------------------------
const formDataObj = {};

function handleFormChange(e) {
    const element = e.srcElement;
    formDataObj[element.name] = element.value;
}

var Gender = "";
function radioButtonClicked() {
    var ele = document.getElementsByName('gender');

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)

            Gender = ele[i].value;
    }
    deatilsFilled()
}


// -------------------------------------------------------Save details when person clicks on save Active save button---------------------------

function saveDetails() {
    if (saveInfo == 0) {
        saveDetailsFirst()
    }
    else if (saveInfo == 1) {
        saveDetailsSecond()

    }
    else if (saveInfo == 2) {
        submitDetails()
    }
}


// ------------------------------------------------Move Carousel LEft------------------------------------------

function moveLeft() {
    document.getElementById("toMoveLeft").disabled = false;
    document.getElementById("toMoveLeft").click();
    document.getElementById("toMoveLeft").disabled = true;
    saveInfo--;
    if (saveInfo == 0) {
        document.getElementById("previousButton").style.display = "none";
    }
    document.getElementById("nextButton").disabled = false;
    document.getElementById("nextButton").style.cursor = "pointer";


}

// ---------------------------------------------------Move Carousel Right--------------------------------------------
function moveRight() {
    document.getElementById("toMoveRight").disabled = false;
    document.getElementById("toMoveRight").click();
    document.getElementById("toMoveRight").disabled = true;



}

// ----------------------------------------------------- Input prevention for first and last name -------------------------------

function checkNameInput(e) {
    var keycode = e.which || e.keyCode;

    if (!((keycode > 64 && keycode < 91) ||
        (keycode > 96 && keycode < 123) || (keycode == 8))) {
        e.preventDefault();
        return false;
    }

    deatilsFilled()

}

// -------------------------------------------------------Making Name input OK-----------------------------------------------
// Checking for the empty value in input box and the first input in the input box, because keydown is not working on single input and empty

function checkName(e) {
    var name = document.getElementById(e.target.id).value;
    var keycode = e.key
    if ((keycode >= "a" && keycode <= "z") || (keycode >= "A" && keycode <= "Z")) {
        deatilsFilled()
    }

    if (name.length == 0) {
        document.getElementById("nextButton").disabled = true;
    }

}


// -----------------------------------------------------Checking for empty input box-----------------------------------------

function checkEmpty(e) {
    var name = document.getElementById(e.target.id).value;
    if (name.length == 0) {
        document.getElementById(e.target.id + "Error").innerHTML = ""
        document.getElementById("nextButton").disabled = true;
        document.getElementById("nextButton").style.cursor = "not-allowed";

    }
    deatilsFilled()
}

// ----------------------------------------------------------- INput prevention of Space ------------------------------------

function preventSpace(e) {
    if (e.key == " ") {
        e.preventDefault();
        return false
    }
    deatilsFilled()

}

// -----------------------------------------------------------------Eye Part for Visible and hide the password---------------------

var eye = 0
function openEyePassword() {

    eye++;
    if (eye % 2 == 0) {
        document.getElementById("closeEye").src = "assets/images/eyeClose.png"
        document.getElementById("password").type = "password"

    }
    else {
        document.getElementById("closeEye").src = "assets/images/eyeOpen.png"
        document.getElementById("password").type = "text"
    }

}

var confirmEye = 0

function openEyeConfirmPassword() {
    confirmEye++;
    if (confirmEye % 2 == 0) {
        document.getElementById("confirmCloseEye").src = "assets/images/eyeClose.png"
        document.getElementById("confirmPassword").type = "password"

    }
    else {
        document.getElementById("confirmCloseEye").src = "assets/images/eyeOpen.png"
        document.getElementById("confirmPassword").type = "text"
    }

}



// --------------------------------------------------------Input prevention for adhar and mobile number -----------------------------

function checkNumber(e) {
    var num = document.getElementById(e.target.id).value;
    var keycode = e.key;
    if (!((keycode > -1 && keycode < 10) || (keycode == "Backspace")) || (keycode == " ")) {
        e.preventDefault();
        return false;
    }
    if (e.target.id == "inputNumber") {
        if ((num.length < 10) || (keycode == "Backspace")) {
        }
        else {
            e.preventDefault();
            return false;
        }

    }
    else if (e.target.id == "inputAdhaar") {
        if ((num.length < 12) || (keycode == "Backspace")) {
        }
        else {
            e.preventDefault();
            return false
        }
    }

    else {
        if ((num.length < 6) || (keycode == "Backspace")) {

        }
        else {
            e.preventDefault();
            return false
        }
    }
    deatilsFilled()

}

// -------------------------------------------------------Make the Nunmber ok-------------------------------------------
function checkInputNumber(e) {
    var num = document.getElementById(e.target.id).value;
    var keyCode = e.key;
    if ((keyCode > -1 && keyCode < 10)) {
        deatilsFilled()
    }
    if ((num.length == 0)) {
        document.getElementById("nextButton").disabled = true;
    }
}


//------------------------------------------------------------ Make the Submit button usefull-----------------------------------------
function deatilsFilled() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var gender = Gender;
    var email = document.getElementById("emailAddress").value;
    var password = document.getElementById("password").value;
    var confrimPassword = document.getElementById("confirmPassword").value;
    var mobileNumber = document.getElementById("inputNumber").value;
    var adhaarNumber = document.getElementById("inputAdhaar").value;

    if ((firstName == "") || (lastName == "") || (gender == "") || (email == "") || (password == "") || (confrimPassword == "") || (mobileNumber == "") || (adhaarNumber == "")) {
        document.getElementById("nextButton").disabled = true;
        return false;
    }
    else {
        document.getElementById("nextButton").disabled = false;
        document.getElementById("nextButton").style.cursor = "pointer";

    }


}



function saveDetailsFirst() {

    var checker = []
    // --------------------------------------Display block all the hideen errors ----------------------

    document.getElementById("emailAddressError").style.visibility = "visible";
    document.getElementById("passwordError").style.visibility = "visible";
    document.getElementById("confirmPasswordError").style.visibility = "visible";
    document.getElementById("inputNumberError").style.visibility = "visible";
    document.getElementById("inputAdhaarError").style.visibility = "visible";





    // -----------------------------------------------------Email Address--------------------------------------

    if (emailValidation()) {
        document.getElementById("emailAddressError").innerHTML = ""
    }
    else {
        checker.push(0);
        document.getElementById("emailAddressError").innerHTML = "Eg: Example@xyz.com"
        return false;
    }



    // ----------------------------------------------------Password----------------------------------------------

    if (passwordValidtion()) {
        document.getElementById("passwordError").innerHTML = ""

    }
    else {
        checker.push(0);
        return false;

    }

    // ------------------------------------------------------Password Confirm-------------------------------------------

    if (confirmPasswordValidtion()) {
        document.getElementById("passwordError").innerHTML = ""
    }
    else {
        checker.push(0);
        return false;
    }


    // ------------------------------------------------------Number Validation------------------------------------------
    var num = document.getElementById("inputNumber").value;
    if (num.length != 10) {
        checker.push(0);
        document.getElementById("inputNumberError").innerHTML = "Should be 10 digits"
        return false
    } else {
        document.getElementById("inputNumberError").innerHTML = ""
    }


    // -----------------------------------------------------Adhaar Validation-----------------------------------------
    var adharnum = document.getElementById("inputAdhaar").value;
    if (adharnum.length != 12) {
        checker.push(0);
        document.getElementById("inputAdhaarError").innerHTML = "Should be 12 digits"
        return false
    }
    else {
        document.getElementById("inputAdhaarError").innerHTML = ""

    }

    // -----------------------------------------------Clicking the Next Button-------------------------------------------
    if (checker.includes(0)) {
        return false;
    }
    else {
        saveInfo++;
        moveRight()
        if (reached > 0) {
            document.getElementById("nextButton").disabled = false;
            document.getElementById("nextButton").style.cursor = "pointer";

        }
        else {
            document.getElementById("nextButton").disabled = true;

        }
        document.getElementById("previousButton").style.display = "block";
        document.getElementById("nextButton").style.cursor = "not-allowed";
        reached++


    }

}






// ----------------------------------------------------------------Regex validation for the Email and Password-----------------------

function emailValidation() {
    let userEmail = document.getElementById("emailAddress").value;
    let userEmailRegex = /^[A-za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    if (userEmailRegex.test(userEmail)) {
        document.getElementById("emailAddressError").innerHTML = ""
        return true;
    }
    else {
        document.getElementById("emailAddressError").innerHTML = "Eg: Example@xyz.com"
        return false;
    }

}


// -------------------------------------------------------------Regex validation for password-----------------------

function passwordValidtion() {
    var pwd = document.getElementById("password").value;
    let userPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (userPasswordRegex.test(pwd)) {
        document.getElementById("passwordError").innerHTML = ""
        return true;
    }
    else {
        document.getElementById("passwordError").innerHTML = "Type:Aa@1 and Length:8"
        return false;
    }

}


// -------------------------------------------------------------Password Confirmation---------------------------------
function confirmPasswordValidtion() {
    var pwd = document.getElementById("password").value;
    var cfmpwd = document.getElementById("confirmPassword").value;
    if (pwd == cfmpwd) {
        document.getElementById("confirmPasswordError").innerHTML = ""
        return true;
    }
    else {
        document.getElementById("confirmPasswordError").innerHTML = "Password Doesn't Match"
        return false;
    }

}


// ------------------------------------------------------------------Validation for adhar and number------------------------------

function numberValidation(e) {
    var num = document.getElementById(e.target.id).value;
    var keycode = e.key;
    if (e.target.id == "inputNumber") {
        if (num.length != 10 && num.length > 0) {
            document.getElementById("inputNumberError").innerHTML = "Should be 10 digits"
            return false
        }
        else if (num.length == 0) {
            document.getElementById("inputNumberError").innerHTML = ""
            document.getElementById("nextButton").style.cursor = "not-allowed";
        }
        else {
            document.getElementById("inputNumberError").innerHTML = ""
        }
    }

    else if (e.target.id == "inputAdhaar") {
        if (num.length != 12 && num.length > 0) {
            document.getElementById("inputAdhaarError").innerHTML = "Should be 12 digits"
            return false
        }
        else if (num.length == 0) {
            document.getElementById("inputAdhaarError").innerHTML = ""
            document.getElementById("nextButton").style.cursor = "not-allowed";

        }
        else {
            document.getElementById("inputAdhaarError").innerHTML = ""

        }
    }
    else if (e.target.id == "zipCode") {
        if (num.length != 6 && num.length > 0) {
            document.getElementById("zipCodeError").innerHTML = "Should be 6  digits"
            return false
        }
        else if (num.length == 0) {
            document.getElementById("zipCodeError").innerHTML = ""
            document.getElementById("nextButton").style.cursor = "not-allowed";


        }
        else {
            document.getElementById("zipCodeError").innerHTML = ""

        }

    }


}




// ---------------------------------------------------------- For the Second Form--------------------------------------------------------


function checkAddress(e) {

    var keycode = e.key
    console.log(keycode);

    if (!((keycode >= "A" && keycode <= "Z") || (keycode >= 0 && keycode < 10) || (keycode >= 'a' && keycode <= 'z') || (keycode == ","))) { // lowercase alpha (a-z)
        e.preventDefault(); // Prevent the default action (typing the symbol)
        return false;
    }
}

// function makeDefault()
// {
//     // document.getElementById("selectStates").
// }

function changeState() {
    document.getElementById("selectStates").selectedIndex = 0;
    var count = document.getElementById("selectCountry").value;
    if (count == "India") {
        document.getElementById("option1").innerHTML = "Uttarakhand"
        document.getElementById("option1").value = "Uttarakhand"
        document.getElementById("option2").innerHTML = "Assam"
        document.getElementById("option2").value = "Assam"
        document.getElementById("option3").innerHTML = "Kerala"
        document.getElementById("option3").value = "Kerala"

    }
    else if (count == "China") {
        document.getElementById("option1").innerHTML = "Fujian"
        document.getElementById("option1").value = "Fujian"
        document.getElementById("option2").innerHTML = "Hainan"
        document.getElementById("option2").value = "Hainan"
        document.getElementById("option3").innerHTML = "Yunnan"
        document.getElementById("option3").value = "Yunnan"
    }
    else if (count == "Nepal") {
        document.getElementById("option1").innerHTML = "Madesh"
        document.getElementById("option1").value = "Madesh"
        document.getElementById("option2").innerHTML = "Bagmati"
        document.getElementById("option2").value = "Bagmati"
        document.getElementById("option3").innerHTML = "Gandaki"
        document.getElementById("option3").value = "Gandaki"
    }

}

function changeDistrict() {
    document.getElementById("selectDistricts").selectedIndex = 0;
    var count = document.getElementById('selectStates').value;

    if (count == "Uttarakhand") {
        document.getElementById("optionDistrict1").innerHTML = "Dehradun"
        document.getElementById("optionDistrict1").value = "Dehradun"
        document.getElementById("optionDistrict2").innerHTML = "Haridwar"
        document.getElementById("optionDistrict2").value = "Haridwar"
        document.getElementById("optionDistrict3").innerHTML = "Rishikesh"
        document.getElementById("optionDistrict3").value = "Rishikesh"


    }
    else if (count == "Assam") {
        document.getElementById("optionDistrict1").innerHTML = "Cachar"
        document.getElementById("optionDistrict1").value = "Cachar"
        document.getElementById("optionDistrict2").innerHTML = "Darrang"
        document.getElementById("optionDistrict2").value = "Darrang"
        document.getElementById("optionDistrict3").innerHTML = "Barpeta"
        document.getElementById("optionDistrict3").value = "Barpeta"

    }
    else if (count == "Kerala") {
        document.getElementById("optionDistrict1").innerHTML = "Thiruvananthapuram"
        document.getElementById("optionDistrict1").value = "Thiruvananthapuram"
        document.getElementById("optionDistrict2").innerHTML = "Kollam"
        document.getElementById("optionDistrict2").value = "Kollam"
        document.getElementById("optionDistrict3").innerHTML = "Alappuzha"
        document.getElementById("optionDistrict3").value = "Alappuzha"
    }
    else if (count == "Fujian") {
        document.getElementById("optionDistrict1").innerHTML = "Fuzhou"
        document.getElementById("optionDistrict1").value = "Fuzhou"
        document.getElementById("optionDistrict2").innerHTML = "Nanping"
        document.getElementById("optionDistrict2").value = "Nanping"
        document.getElementById("optionDistrict3").innerHTML = "Shaowu"
        document.getElementById("optionDistrict3").value = "Shaowu"
    }
    else if (count == "Hainan") {
        document.getElementById("optionDistrict1").innerHTML = "Sanya"
        document.getElementById("optionDistrict1").value = "Sanya"
        document.getElementById("optionDistrict2").innerHTML = "Haikou"
        document.getElementById("optionDistrict2").value = "Haikou"
        document.getElementById("optionDistrict3").innerHTML = "Danzhou"
        document.getElementById("optionDistrict3").value = "Danzhou"
    }
    else if (count == "Yunnan") {
        document.getElementById("optionDistrict1").innerHTML = "Kunming"
        document.getElementById("optionDistrict1").value = "Kunming"
        document.getElementById("optionDistrict2").innerHTML = "Yuxi"
        document.getElementById("optionDistrict2").value = "Yuxi"
        document.getElementById("optionDistrict3").innerHTML = "Gejiu"
        document.getElementById("optionDistrict3").value = "Gejiu"
    }
    else if (count == "Madesh") {
        document.getElementById("optionDistrict1").innerHTML = "Parsa"
        document.getElementById("optionDistrict1").value = "Parsa"
        document.getElementById("optionDistrict2").innerHTML = "Bara"
        document.getElementById("optionDistrict2").value = "Bara"
        document.getElementById("optionDistrict3").innerHTML = "Sarlahi"
        document.getElementById("optionDistrict3").value = "Sarlahi"
    }
    else if (count == "Bagmati") {
        document.getElementById("optionDistrict1").innerHTML = "Kathmandu"
        document.getElementById("optionDistrict1").value = "Kathmandu"
        document.getElementById("optionDistrict2").innerHTML = "Lalitpur"
        document.getElementById("optionDistrict2").value = "Lalitpur"
        document.getElementById("optionDistrict3").innerHTML = "Bhaktapur"
        document.getElementById("optionDistrict3").value = "Bhaktapur"
    }
    else if (count == "Gandaki") {
        document.getElementById("optionDistrict1").innerHTML = "Taghring"
        document.getElementById("optionDistrict1").value = "Taghring"
        document.getElementById("optionDistrict2").innerHTML = "Bhuktangle"
        document.getElementById("optionDistrict2").value = "Bhuktangle"
        document.getElementById("optionDistrict3").innerHTML = "Ramche"
        document.getElementById("optionDistrict3").value = "Ramche"
    }


}


function checkZipCode(e) {
    var num = document.getElementById("zipCode").value;
    var keycode = e.which || e.keyCode;

    if (!((keycode > 47 && keycode < 58) || (keycode == 8))) {
        e.preventDefault();
        return false;
    }
}

// ---------------------------------------------------------To make Next Button usefull and enabled----------------------------
function deatilsFilledSecond() {
    var address = document.getElementById("Address").value;
    var country = document.getElementById("selectCountry").value;
    var state = document.getElementById("selectStates").value;
    var district = document.getElementById("selectDistricts").value;
    var zipCode = document.getElementById("zipCode").value;
    if ((address == "") || (country == "") || (state == "") || (district == "") || (zipCode == "")) {
        document.getElementById("nextButton").disabled = true;
        document.getElementById("nextButton").style.cursor = "not-allowed";
        return false;
    }
    else {
        document.getElementById("nextButton").disabled = false;
        document.getElementById("nextButton").style.cursor = "pointer";
    }
}

// -----------------------------------------------------Save Details of second Page ------------------------------------

function saveDetailsSecond() {
    document.getElementById("zipCodeError").style.visibility = "visible";

    var checking = 0

    // ---------------------------------------Zip Code Validation----------------------------------

    var zip = document.getElementById("zipCode").value;
    if (zip.length != 6) {
        document.getElementById("zipCodeError").innerHTML = "Should be 6 digits"
        return false
    } else {
        checking++
        document.getElementById("zipCodeError").innerHTML = ""
    }

    if (checking > 0) {
        saveInfo++;
        moveRight()
        document.getElementById("nextButton").disabled = true;
        document.getElementById("nextButton").style.cursor = "not-allowed";

        if (saveInfo == 2) {
            document.getElementById("nextButton").innerHTML = "Submit";

        }
    }



}





// ------------------------------------------------Third Form -  Upload Images--------------------------------
function thirdForm() {
    let imageFile = document.getElementById("imageUpload");
    let signature = document.getElementById("signatureUpload");
    console.log("Running1")

    document.getElementById("profilePic").src = URL.createObjectURL(imageFile.files[0])
    document.getElementById("signature").src = URL.createObjectURL(signature.files[0])
    deatilsFilledThird()

}

// -----------------------------------------------Make Submit button Usefull----------------------------------------------

function deatilsFilledThird() {
    console.log("Running2")

    var profilePic = document.getElementById("imageUpload");
    var signature = document.getElementById("signatureUpload");
    if ((profilePic == "") || (signature == "")) {
        document.getElementById("nextButton").disabled = true;
        return false;
    }
    else {
        document.getElementById("nextButton").disabled = false;
        document.getElementById("nextButton").style.cursor = "pointer";

    }

    // -----------------------------------------For Profile Pic-------------------------
    const fr = new FileReader();
    console.log("Running4");

    fr.addEventListener('load', () => {
        localStorage.setItem("profilepic", fr.result)

    });
    fr.readAsDataURL(profilePic.files[0]);


}

function submitDetails() {

    localStorage.setItem("data", JSON.stringify(formDataObj))
    window.location.href = "result.html"
}




