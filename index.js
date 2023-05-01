/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents:[],
        timeOutEvents:[],
    }
}

function createEmployeeRecords(array) {
    let newArrayOfRecords = array.map(record => createEmployeeRecord(record));
    return newArrayOfRecords;
}

function createTimeInEvent(dateStamp) {
    let stringHour = dateStamp.substring(11);
    let hour = parseInt(stringHour, 10);
    let date = dateStamp.substring(0, 10);
    this.timeInEvents.push({
        type: "TimeIn",
        hour: hour,
        date: `${date}`
    })
    return this;
}

function createTimeOutEvent(dateStamp) {
    let stringHour = dateStamp.substring(11);
    let hour = parseInt(stringHour, 10);
    let date = dateStamp.substring(0, 10);
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: hour,
        date: `${date}`
    })
    return this;
}

function hoursWorkedOnDate(dateOfForm) {
    let shiftStartObj = this.timeInEvents.find(obj => obj.date === dateOfForm);
    let shiftEndObj = this.timeOutEvents.find(obj => obj.date === dateOfForm);
    let timeIn = shiftStartObj.hour;
    let timeOut = shiftEndObj.hour;
    return (timeOut/100) - (timeIn/100);
}

function wagesEarnedOnDate(dateOfForm) {
    let hours = hoursWorkedOnDate.call(this, dateOfForm);
    return hours * (this.payPerHour);
}

function calculatePayroll(array) {
    let allWagesOwed = array.map(record => allWagesFor.call(record));
    let sumOfAllWagesOwed = 0;
    allWagesOwed.forEach(wage => {
        sumOfAllWagesOwed += wage;
    });
    return sumOfAllWagesOwed;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let found = srcArray.find(record => record.firstName === firstName);
    return found;
}