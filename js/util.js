// utility files to validate entries and check if alternate score needed


function validateEntries(form){
    // alert("entered validation function");
    console.log("ENTERED VALIDATEENTRIES FUNCTION *****************");

    let age = document.forms["entryForm"]["Age"].value;;
    if (isNaN(age) || age < 5 || age > 100) {
        alert ("Please enter a valid number for age");
    return false;
    }

    // validate radiobutton inputs

    if ( ( form.Gender[0].checked == false ) && ( form.Gender[1].checked == false ) ) {
        alert ( "Please choose Gender: Male or Female" ); 
    return false;
    }

    if ( ( form.Race[0].checked == false ) && ( form.Race[1].checked == false ) && ( form.Race[2].checked == false )) {
        alert ( "Please select Race or Ethnicity" ); 
    return false;
    }

    let redMeat = document.forms["entryForm"]["redMeatNumber"].value;
    if (redMeat !== "") {
        if (isNaN(redMeat) || redMeat < 0 || redMeat > 21) {
            alert ("Please enter a valid number for red meat consumption");
        return false;
        }
    }

    let whiteMeat = document.forms["entryForm"]["whiteMeatNumber"].value;
    if (whiteMeat !== "") {
        if (isNaN(whiteMeat) || whiteMeat < 0 || whiteMeat > 21) {
            alert ("Please enter a valid number for white meat consuption");
        return false;
        }
    }

    let seafood = document.forms["entryForm"]["seafoodNumber"].value;
    if (seafood !== "") {
        if (isNaN(seafood) || seafood < 0 || seafood > 21) {
            alert ("Please enter a valid number for seafood consumption");
        return false;
        }
    }

    let vegProt = document.forms["entryForm"]["vegetableProteinNumber"].value;
    if (vegProt !== "") {
        if (isNaN(vegProt) || vegProt < 0 || vegProt > 21) {
            alert ("Please enter a valid number for vegetable protein consumption");
        return false;
        }
    }

    let fruits = document.forms["entryForm"]["fruitNumber"].value;
    if (fruits !== "") {
        if (isNaN(fruits) || fruits < 0 || fruits > 21) {
            alert ("Please enter a valid number for fruit consumption");
        return false;
        }
    }

    let veggies = document.forms["entryForm"]["vegetableNumber"].value;
    if (veggies !== "") {
        if (isNaN(veggies) || veggies < 0 || veggies > 21) {
            alert ("Please enter a valid number for vegetable consumption");
        return false;
        }
    }

    let eatOut = document.forms["entryForm"]["eatOutNumber"].value;
    if (eatOut !== "") {
        if (isNaN(eatOut) || eatOut < 0 || eatOut > 21) {
            alert ("Please enter a valid number for eating out");
        return false;
        }
    }

    let weight = document.forms["entryForm"]["weight"].value;
    if (weight !== "") {
        if (isNaN(weight) || weight < 50 || weight > 800) {
            alert ("Please enter a valid number for weight");
        return false;
        }
    }

    let height = document.forms["entryForm"]["height"].value;
    if (height !== "") {
        if (isNaN(height) || height < 40 || height > 96) {
            alert ("Please enter a valid number for height");
        return false;
        }
    }

    let waist = document.forms["entryForm"]["waist"].value;
    if (waist !== "") {
        if (isNaN(waist) || waist < 10 || waist > 70) {
            alert ("Please enter a valid number for waist circumference");
        return false;
        }
    }

    if ( ( form.onHtnMeds[0].checked == false ) && ( form.onHtnMeds[1].checked == false ) ) {
        alert ( "Please indicate if on blood pressure medications" ); 
    return false;
    }

    let sbp = document.forms["entryForm"]["systolicBp"].value;
    if (isNaN(sbp) || sbp < 70 || sbp > 300) {
        alert ("Please enter a valid number for systolic blood pressure");
    return false;
    }

    if ( ( form.diabetic[0].checked == false ) && ( form.diabetic[1].checked == false ) ) {
        alert ( "Please indicate if diabetic" ); 
    return false;
    }

    let hga1c = document.forms["entryForm"]["hga1c"].value;
    if (hga1c !== "") {
        if (isNaN(hga1c) || hga1c < 0 || hga1c > 30) {
            alert ("Please enter a valid number for hga1c");
        return false;
        }
    }

    let fbs = document.forms["entryForm"]["fbs"].value;
    if (fbs !== "") {
        if (isNaN(fbs) || fbs < 30 || fbs > 700) {
            alert ("Please enter a valid number for fasting blood sugar");
        return false;
        }
    }

    let tChol = document.forms["entryForm"]["tChol"].value;
    if (isNaN(tChol) || tChol < 10 || tChol > 800) {
        alert ("Please enter a valid number for total cholesterol");
    return false;
    }

    let ldlChol = document.forms["entryForm"]["ldlChol"].value;
    if (isNaN(ldlChol) || ldlChol < 3 || ldlChol > 600) {
        alert ("Please enter a valid number for ldl cholesterol");
    return false;
    }

    let hdlChol = document.forms["entryForm"]["hdlChol"].value;
    if (isNaN(hdlChol) || hdlChol < 1 || hdlChol > 120) {
        alert ("Please enter a valid number for hdl cholesterol");
    return false;
    }

    let trigs = document.forms["entryForm"]["trigs"].value;
    if (trigs !== "") {
        if (isNaN(trigs) || trigs < 20 || trigs > 2400) {
            alert ("Please enter a valid number for triglycerides");
        return false;
        }
    }

    if ( (form.currentSmoker[0].checked == false ) && (form.currentSmoker[1].checked == false ) ) {
        alert ( "Please indicate if current smoker" ); 
    return false;
    }

    let smokingDuration = document.forms["entryForm"]["smokingDuration"].value;
    if (smokingDuration !== "") {
        if (isNaN(smokingDuration) || smokingDuration < 0 || smokingDuration > 70) {
            alert ("Please enter a valid number for years smoking");
        return false;
        }
    }

    let smokingPpd = document.forms["entryForm"]["smokingPpd"].value;
    if (smokingPpd !== "") {
        if (isNaN(smokingPpd) || smokingPpd < 0 || smokingPpd > 6) {
            alert ("Please enter a valid number for packs per day");
        return false;
        }
    }

    let yearsQuit = document.forms["entryForm"]["yearsQuit"].value;
    if (yearsQuit !== "") {
        if (isNaN(yearsQuit) || yearsQuit < 0 || yearsQuit > 70) {
            alert ("Please enter a valid number for years since quitting");
        return false;
        }
    }

    console.log("ENDOFVALIDATEENTRIESFUNCTION******************");

    checkIfAlternateCalculatorNeeded();

    return;
}