"use strict"


// Event handlers:



// event handler for submitEntries button
var submitButton = document.querySelector("#entryButton");
submitButton.addEventListener("click", startProgramAndCalculateResult);


// This function starts the program, calculates and displays the final results and ends program

function startProgramAndCalculateResult(ev) {
    ev.preventDefault
    console.log("ENTERED the startProgramAndCalculateResult function.")

    // run the function to calculate and display the result

    let result;
    result = get_result_for_current_function();

    resultsStyling();

    console.log("Final result is:  " + result);
    console.log("**** END OF PROGRAM EXECUTION ****")

    return result;
}


function retrieveValuesCheckboxes() {

    console.log("ENTERED the retrieveValuesCheckboxes function.")
    
    const RDcb = new Object();  // Create the Response Dictionary object for cb

    let topicname = "Comprehensive Recommendations"
    
    let ele = document.getElementsByTagName("input");
    for(let i = 0; i < ele.length; i++) {
            
        if(ele[i].type=="checkbox") {         
            if(ele[i].checked) {
                let item = ele[i].value;
                RDcb[item] = 1;}
            else {
                let item = ele[i].value;
                RDcb[item] = 0;
            }
            
        }
    }
    console.log("RDcb is:  ");
    console.log(RDcb);
    
    return RDcb;  // RDcb contains all checked responses as "1" values
}


//  Get radiobuttonEntries entries:

function retrieveValuesRadiobuttons() {

    console.log("ENTERED the retrieveValuesRadiobuttons function.")

    const RDRb = new Object();  // Create the Response Dictionary object for rb entries
    
    let ele = document.getElementsByTagName('input');
        
    for(let i = 0; i < ele.length; i++) {
            
        if(ele[i].type=="radio") {
            if(ele[i].checked) {
                let item = ele[i].name;
                RDRb[item] = ele[i].value;
            }
        }
    }
    console.log("RDRb is:  " );
    console.log(RDRb);

    return RDRb;
}
    

//   Get numerical entries...

function retrieveValuesNumericalEntries() {

    console.log("ENTERED the retrieveValuesNumericalEntries function.")

    const RDnumerical = new Object();  // Create the Response Dictionary object for numerical entries
    
    
    let ele = document.getElementsByTagName('input');
        
    for(let i = 0; i < ele.length; i++) {
            
        if(ele[i].type=="number") {
                let item = ele[i].name;
                RDnumerical[item] = ele[i].value;
            }
        }
        return RDnumerical;
    }

//   Get textBox entries...

function retrieveValuesTextboxEntries() {

    console.log("ENTERED the retrieveValuesTextboxEntries function.")

    const RDtext = new Object();  // Create the Response Dictionary object for textbox entries
    
    let ele = document.getElementsByTagName('input');
        
    for(let i = 0; i < ele.length; i++) {
            
        if(ele[i].type=="text") {
                let item = ele[i].name;
                RDtext[item] = ele[i].value;
            }
        }
        console.log("RDtext is:  ");
        console.log(RDtext);
        return RDtext;
    }

// get result_for_current_function and calculate result for selected topic

function get_result_for_current_function() {

    console.log("ENTERED get_result_for_current_function......")

    var result_for_current_function;

    let response_dict_checkboxes = retrieveValuesCheckboxes();
    let response_dict_radiobuttons = retrieveValuesRadiobuttons();
    let response_dict_numerical = retrieveValuesNumericalEntries();
    let response_dict_text = retrieveValuesTextboxEntries();


    console.log(response_dict_radiobuttons);
    console.log(response_dict_checkboxes);
    console.log(response_dict_numerical);
    console.log(response_dict_text);

    result_for_current_function = comprehensiveRec(response_dict_checkboxes, response_dict_radiobuttons, response_dict_numerical)

    console.log("Calculated result for current function:  " +  result_for_current_function)

    return result_for_current_function
}
   
function onloadStyling() {
    // Note:  this function not currently used.  Onload styling per CSS file.

    let printableDisplay = document.getElementById("printableDisplay");
    printableDisplay.style.display = "none";
    let printButton = document.getElementById("printButton");
    printButton.style.display = "none";
    let returnButton = document.getElementById("returnButton");
    returnButton.style.display = "none";
    let closeButton = document.getElementById("closeButton");
    closeButton.style.display = "none";
}

function resultsStyling() {
    console.log("ENTERED resultsStyling");
    let printableDisplay = document.getElementById("printableDisplay");
    printableDisplay.style.display = "block"
    let printButton = document.getElementById("printButton");
    printButton.style.display = "inline";
    let form = document.getElementById("entryForm");
    form.style.display = "none";
    let returnButton = document.getElementById("returnButton");
    returnButton.style.display = "inline";
    let closeButton = document.getElementById("closeButton");
    closeButton.style.display = "inline";
}

