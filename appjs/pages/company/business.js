//function: 0
$(document).ready(function () {
    // // Check if the user is already logged in
    // const userGlobalState = State.GlobalGet(USER_LOGIN_STATE);
    // if (!userGlobalState) {
    //     // Redirect to list page if already logged in
    //     window.location = "/login.html";
    // } 
    $('#table-list-business').ToTable();

    WorkInProgress.Show('Getting ready...');
    $.when(PageGoActionEvent('CountryId', '0'), PageGoActionEvent('CurrencyId', '0'))
        .then(function () {
            //do something
        })
        .fail(function () {
            // At least one AJAX call failed
            Popup.Show("error", "Error loading data.");
        })
        .always(function () {
            WorkInProgress.Hide();
        });
});


//function: 1
function PageGoClear(action) {
    switch (action) {
        case 'div-page-entry-business':
            $('#Id').val('0');
            $('#BusinessLogo').val('');
            $('#BusinessName').val('');
            $('#ShortName').val('');
            $('#OfficeAddress').val('');
            $('#ContactName').val('');
            $('#ContactNo').val('');
            $('#EmailAddress').val('');
            $('#BIN').val('');
            $('#TaxVATNo').val('');
            $('#CountryId').val('-');
            $('#CurrencyId').val('-');
            $('#MaxEmployee').val(1);
            $('#MaxSalary').val(1);
            $('#IsActive').prop('checked', false);
            ClearInputFieldError(action);

            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 2
function PageGoValidateInput(action) {
    let isValid = true;
    let newDataCollection = {};
    switch (action) {
        case 'div-page-entry-business':
            isValid &= ValidateInputField('#Id', value => value === '', "Business Id is required, Please reload this page and try again");
            isValid &= ValidateInputField('#BusinessName', value => value === '' || value.length < 3, "Business name is required");
            isValid &= ValidateInputField('#CountryId', value => value === '' || value === '-' || value === null, "Country is required");
            isValid &= ValidateInputField('#CurrencyId', value => value === '' || value === '-' || value === null, "Currency is required");
            isValid &= ValidateInputField('#MaxEmployee', value => value === '' || parseInt(value) < 1, "Max Employee is required");
            isValid &= ValidateInputField('#MaxSalary', value => value === '' || parseInt(value) < 1, "Max Salary is required");

            newDataCollection = {
                Id: $('#Id').val().trim(),
                BusinessLogo: $('#BusinessLogo').val().trim(),
                BusinessName: $('#BusinessName').val().trim(),
                ShortName: $('#ShortName').val().trim(),
                OfficeAddress: $('#OfficeAddress').val().trim(),
                ContactName: $('#ContactName').val().trim(),
                ContactNo: $('#ContactNo').val().trim(),
                EmailAddress: $('#EmailAddress').val().trim(),
                BIN: $('#BIN').val().trim(),
                TaxVATNo: $('#TaxVATNo').val().trim(),
                CountryId: $('#CountryId').val(),
                CurrencyId: $('#CurrencyId').val(),
                MaxEmployee: $('#MaxEmployee').val(),
                MaxSalary: $('#MaxSalary').val(),
                IsActive: $('#IsActive').is(':checked') || false
            };

            break;

        default:
            console.log('Invalid action');
            break;
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoFillInput(action, dynData) {
    switch (action) {
        case 'CountryId':
            var CountryIdDdl = $('#CountryId');
            CountryIdDdl.append($('<option>', {
                value: '-',
                text: "-Select-"
            }));
            if (!dynData || dynData.length === 0) {
                Popup.Show("error", "No data available");
            } else {
                dynData.forEach(function (item) {
                    CountryIdDdl.append($('<option>', {
                        value: item.EntityValue,
                        text: item.EntityText
                    }));
                });
            }

            break;
        case 'CurrencyId':
            var CurrencyIdDdl = $('#CurrencyId');
            CurrencyIdDdl.append($('<option>', {
                value: '-',
                text: "-Select-"
            }));
            if (!dynData || dynData.length === 0) {
                Popup.Show("error", "No data available");
            } else {
                dynData.forEach(function (item) {
                    CurrencyIdDdl.append($('<option>', {
                        value: item.EntityValue,
                        text: item.EntityText
                    }));
                });
            }

            break;

        case 'div-page-edit-business':
            $('#Id').val(dynData.Id);
            $('#BusinessLogo').val(dynData.BusinessLogo);
            $('#BusinessName').val(dynData.BusinessName);
            $('#ShortName').val(dynData.ShortName);
            $('#OfficeAddress').val(dynData.OfficeAddress);
            $('#ContactName').val(dynData.ContactName);
            $('#ContactNo').val(dynData.ContactNo);
            $('#EmailAddress').val(dynData.EmailAddress);
            $('#BIN').val(dynData.BIN);
            $('#TaxVATNo').val(dynData.TaxVATNo);
            $('#CountryId').val(dynData.CountryId);
            $('#CurrencyId').val(dynData.CurrencyId);
            $('#MaxEmployee').val(dynData.MaxEmployee);
            $('#MaxSalary').val(dynData.MaxSalary);
            $('#IsActive').prop('checked', dynData.IsActive);
            PageGoNext('div-page-entry-business', '0');

            break;
        default:
            console.log('Invalid action');
            break;
    }
}

//function: 4
function GenerateTableHTML(action, dynData) {
    switch (action) {
        case 'table-business':
            $('#table-business tbody').empty();
            if (dynData !== null) {
                dynData.forEach(function (item) {
                    var row = $('<tr></tr>');
                    row.append('<td>' + item.BusinessLogo + '</td>');
                    row.append('<td>' + item.BusinessName + '</td>');
                    row.append('<td>' + item.ShortName + '</td>');
                    row.append('<td>' + item.OfficeAddress + '</td>');
                    row.append('<td>' + item.ContactName + '</td>');
                    row.append('<td>' + item.ContactNo + '</td>');
                    row.append('<td>' + item.EmailAddress + '</td>');
                    row.append('<td>' + item.BIN + '</td>');
                    row.append('<td>' + item.TaxVATNo + '</td>');
                    row.append('<td>' + item.CountryId + '</td>');
                    row.append('<td>' + item.CurrencyId + '</td>');
                    row.append('<td>' + item.MaxEmployee + '</td>');
                    row.append('<td>' + item.MaxSalary + '</td>');
                    row.append(`<td>${item.IsActive ? '<i class="fas fa-circle-check text-green"></i>' : '<i class="fas fa-circle-xmark text-red"></i>'}</td>`);
                    row.append(`<td><i class="button fas fa-edit mr-2" data-id='${item.Id}' onclick=PageGoActionEvent("div-page-edit-business",this);></i><i class="button btn-red fas fa-trash mr-2" data-id="${item.Id}" onclick=PageGoShowModal("div-delete-business",this);></i></td>`);
                    $('#table-business tbody').append(row);
                });
            }
            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 5
function PageGoNext2(action, dataid) {
    switch (action) {
        case 'div-page-list-business':
            $('#div-page-entry-business').addClass('d-none');
            $('#btn-back-to-entry').removeClass('d-none');
            $('#div-page-list-business').removeClass('d-none');
            PageGoActionEvent(action, '0');

            break;
        case 'div-page-entry-business':
            $('#div-page-entry-business').removeClass('d-none');
            $('#btn-back-to-entry').addClass('d-none');
            $('#div-page-list-business').addClass('d-none');

            break;

        default:
            console.log('Invalid action');
            break;
    }
}
function PageGoNext(action, dataid) {
    switch (action) {
        case 'div-page-list-business':
            $('#div-page-entry-business').fadeOut(180, function () {
                $('#btn-back-to-entry').fadeIn(180);
                $('#div-page-list-business').fadeIn(180);
            });
            break;

        case 'div-page-entry-business':
            $('#div-page-list-business').fadeOut(180, function () {
                $('#btn-back-to-entry').fadeOut(180);
                $('#div-page-entry-business').fadeIn(180);
            });
            break;

        default:
            console.log('Invalid action');
            break;
    }
}

//function: 6
function PageGoActionEvent(action, dataid) {
    switch (action) {
        case 'CountryId':
            var newDataCollection = {
                EntityName: 'COUNTRY'
            };
            API.post(
                `${API_BASE_URL}/Setup/EntityValue/GetByEntityName`,
                newDataCollection,
                (response) => {
                    var parsedData = JSON.parse(response);
                    var dynData = parsedData.DynamicData;
                    if (parsedData.SUCCESS) {
                        PageGoFillInput(action, dynData);
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                (xhr, status, error) => {
                    Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                },
                () => {
                    //do complete action
                }
            );

            break;

        case 'CurrencyId':
            var newDataCollection = {
                EntityName: 'CURRENCY'
            };
            API.post(
                `${API_BASE_URL}/Setup/EntityValue/GetByEntityName`,
                newDataCollection,
                (response) => {
                    var parsedData = JSON.parse(response);
                    var dynData = parsedData.DynamicData;
                    if (parsedData.SUCCESS) {
                        PageGoFillInput(action, dynData);
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                (xhr, status, error) => {
                    Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                },
                () => {
                    //do complete action
                }
            );

            break;

        case 'div-page-list-business':
            WorkInProgress.Show('Getting ready...');
            API.post(
                `${API_BASE_URL}/Company/Business/GetAll`,
                newDataCollection,
                (response) => {
                    var parsedData = JSON.parse(response);
                    var dynData = parsedData.DynamicData;
                    if (parsedData.SUCCESS) {
                        GenerateTableHTML('table-business', dynData);//tableName, dataList
                        //State.GlobalSet('table-business', dynData);//set global for further filter
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                (xhr, status, error) => {
                    Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                },
                () => {
                    WorkInProgress.Hide();
                }
            );

            break;

        case 'div-page-entry-business':
            var validationSummary = PageGoValidateInput(action);
            if (validationSummary.isValid) {
                WorkInProgress.Show('Getting ready....');
                API.post(
                    `${API_BASE_URL}/Company/Business/CreateUpdate`,
                    validationSummary.newDataCollection,
                    (response) => {
                        var parsedData = JSON.parse(response);
                        var dynData = parsedData.DynamicData;
                        if (parsedData.SUCCESS) {
                            //PageGoClear('div-page-entry-business');
                            //PageGoActionEvent('div-page-list-business', '0');
                            Popup.Show("success", "Request submitted successfully");
                        } else {
                            Popup.Show("error", parsedData.MESSAGE);
                        }
                    },
                    (xhr, status, error) => {
                        Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                    },
                    () => {
                        WorkInProgress.Hide();
                    }
                );
            }
            else {
                Popup.Show("error", "Request submission is failed, Fix errors and try again!");
            }

            break;

        case 'div-page-edit-business':
            var newDataCollection = {
                Id: $(dataid).data('id')
            };
            WorkInProgress.Show('Getting ready...');
            API.post(
                `${API_BASE_URL}/Company/Business/GetById`,
                newDataCollection,
                (response) => {
                    var parsedData = JSON.parse(response);
                    if (parsedData.SUCCESS && parsedData.ROWS > 0) {
                        PageGoFillInput('div-page-edit-business', parsedData.DynamicData[0]);//fill single row
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                (xhr, status, error) => {
                    Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                },
                () => {
                    WorkInProgress.Hide();
                }
            );

            break;
        case 'div-delete-business':
            var newDataCollection = {
                Id: $(dataid).data('id')
            };
            WorkInProgress.Show('Getting ready...');
            API.post(
                `${API_BASE_URL}/Company/Business/DeleteById`,
                newDataCollection,
                (response) => {
                    var parsedData = JSON.parse(response);
                    if (parsedData.SUCCESS) {
                        Popup.Show("success", "Request submitted successfully");
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                (xhr, status, error) => {
                    Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
                },
                () => {
                    WorkInProgress.Hide();
                }
            );

            break;
        default:
            console.log('Invalid action');
            break;
    }
}

//function: 7
function PageGoShowModal(action, dataid) {
    switch (action) {
        case 'div-delete-business':
            Popup.Confirm("Are you sure you want to delete?", function () { PageGoActionEvent(action, dataid) }, function () { });

            break;
        case 'yes-no':
            Popup.Confirm("Are you sure you want to delete?", function () { }, function () { });
            break;
        default:
            console.log('Invalid action');
            break;
    }
}