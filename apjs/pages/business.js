//function: 0
$(document).ready(() => {
    const userState = localStorage.getItem("userState");
    if (!userState) {
        // If no user is logged in, redirect to login page
        window.location.hash = "#/login";
    }
});

function LoadAction(){
    
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
}
//function: 1
function PageGoClear(action) {
    if (action === 'div-page-entry-business') {
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
    }
}

//function: 2
function PageGoValidateInput(action) {
    let isValid = true;
    let newDataCollection = {};
    if (action === 'div-page-entry-business') {
        var Id = $('#Id').val().trim();
        if (Id === '') {
            Popup.Show("warn", "Business Id is required, Please reload this page and try again");
            isValid = false;
        }
        var BusinessLogo = $('#BusinessLogo').val().trim();
        var BusinessName = $('#BusinessName').val().trim();
        if (BusinessName === '') {
            Popup.Show("warn", "Business name is required");
            isValid = false;
        }
        var ShortName = $('#ShortName').val().trim();
        var OfficeAddress = $('#OfficeAddress').val().trim();
        var ContactName = $('#ContactName').val().trim();
        var ContactNo = $('#ContactNo').val().trim();
        var EmailAddress = $('#EmailAddress').val().trim();
        var BIN = $('#BIN').val().trim();
        var TaxVATNo = $('#TaxVATNo').val().trim();
        var CountryId = $('#CountryId').val();
        if (CountryId === '' || CountryId === '-' || CountryId === null) {
            Popup.Show("warn", "Country is required");
            isValid = false;
        }
        var CurrencyId = $('#CurrencyId').val();
        if (CurrencyId === '' || CurrencyId === '-' || CurrencyId === null) {
            Popup.Show("warn", "Currency is required");
            isValid = false;
        }

        var MaxEmployee = $('#MaxEmployee').val();
        if (MaxEmployee === '' || parseInt(MaxEmployee) < 1) {
            Popup.Show("warn", "Max Salary is required");
            isValid = false;
        }
        var MaxSalary = $('#MaxSalary').val();
        if (MaxSalary === '' || parseInt(MaxSalary) < 1) {
            Popup.Show("warn", "Max Employee is required");
            isValid = false;
        }
        var IsActive = $('#IsActive').is(':checked');


        newDataCollection = {
            Id: Id,
            BusinessLogo: BusinessLogo,
            BusinessName: BusinessName,
            ShortName: ShortName,
            OfficeAddress: OfficeAddress,
            ContactName: ContactName,
            ContactNo: ContactNo,
            EmailAddress: EmailAddress,
            BIN: BIN,
            TaxVATNo: TaxVATNo,
            CountryId: CountryId,
            CurrencyId: CurrencyId,
            MaxEmployee: MaxEmployee,
            MaxSalary: MaxSalary,
            IsActive: IsActive || false
        };
    }
    return { isValid, newDataCollection };
}

//function: 3
function PageGoFillInput(action, dynData) {
    if (action === 'div-page-edit-business') {
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
    }
}

//function: 4
function GenerateTableHTML(action, dynData) {
    if (action === 'table-list-business') {
        $('#table-list-business tbody').empty();
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
                row.append(`<td><i class="button fas fa-edit mr-2" data-id='${item.Id}' onclick=PageGoActionEvent("div-page-edit-business",this);></i><i class="button btn-red fas fa-trash mr-2" data-id="${item.Id}" onclick=PageGoShowModal("div-page-delete-business",this);></i></td>`);
                $('#table-list-business tbody').append(row);
            });
        }
    }
    else if (action === 'table-remove-row-business') {
        $('#table-list-business tbody tr').filter(function () {
            return $(this).find('[data-id="' + dynData + '"]').length > 0;
        }).remove();
    }
}

//function: 5
function PageGoNext(action, dataid) {
    if (action === 'div-page-list-business') {
        $('#div-page-list-business').removeClass('d-none');
        PageGoActionEvent('div-page-list-business', '0');
    }
}

//function: 6
function PageGoActionEvent(action, dataid) {
    if (action === 'div-page-list-business') {
        WorkInProgress.Show('Getting ready...');
        $.ajax({
            url: baseUrl + 'GetAll',
            type: 'POST',
            contentType: 'application/json',
            success: function (data, status, xhr) {
                var parsedData = JSON.parse(data);
                var dynData = parsedData.DynamicData;
                if (parsedData.SUCCESS) {
                    GenerateTableHTML('table-list-business', dynData);//tableName, dataList
                } else {
                    Popup.Show("error", parsedData.MESSAGE);
                }
            },
            error: function (xhr) {
                Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            },
            complete: function (xhr, status) {
                WorkInProgress.Hide();
            }
        });
    }
    else if (action === 'div-page-entry-business') {
        var validationSummary = PageGoValidateInput("div-page-entry-business");
        if (validationSummary.isValid) {
            WorkInProgress.Show('Getting ready....');
            $.ajax({
                url: baseUrl + 'CreateUpdate',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(validationSummary.newDataCollection),
                success: function (data, status, xhr) {
                    var parsedData = JSON.parse(data);
                    if (parsedData.SUCCESS) {
                        PageGoClear('div-page-entry-business');
                        PageGoActionEvent('div-page-list-business', '0');
                        Popup.Show("success", "Request submitted successfully");
                    } else {
                        Popup.Show("error", parsedData.MESSAGE);
                    }
                },
                error: function (xhr) {
                    Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
                },
                complete: function (xhr, status) {
                    WorkInProgress.Hide();
                }
            });
        } else {
            Popup.Show("error", "Request submission is failed, Fix errors and try again!");
        }
    }
    else if (action === 'div-page-edit-business') {
        var newDataCollection = {
            Id: $(dataid).data('id')
        };
        WorkInProgress.Show('Getting ready....');
        $.ajax({
            url: baseUrl + 'GetById',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDataCollection),
            success: function (data, status, xhr) {
                var parsedData = JSON.parse(data);
                if (parsedData.SUCCESS && parsedData.ROWS > 0) {
                    PageGoFillInput('div-page-edit-business', parsedData.DynamicData[0]);//fill single row
                } else {
                    Popup.Show("error", parsedData.MESSAGE);
                }
            },
            error: function (xhr) {
                Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            },
            complete: function (xhr, status) {
                WorkInProgress.Hide();
            }
        });
    }
    else if (action === 'div-page-delete-business') {
        var Id = $(dataid).data('id');
        var newDataCollection = {
            Id: Id
        };
        WorkInProgress.Show('Getting ready....');
        $.ajax({
            url: baseUrl + 'DeleteById',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDataCollection),
            success: function (data, status, xhr) {
                var parsedData = JSON.parse(data);
                if (parsedData.SUCCESS) {
                    GenerateTableHTML('table-remove-row-business', Id)
                } else {
                    Popup.Show("error", parsedData.MESSAGE);
                }
            },
            error: function (xhr) {
                Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            },
            complete: function (xhr, status) {
                WorkInProgress.Hide();
            }
        });
    }
    else if (action === 'CountryId') {
        var newDataCollection = {
            EntityName: 'COUNTRY'
        };
        $.ajax({
            url: baseUrl1 +'/api/v1/Setup/EntityValue/GetByEntityName',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDataCollection),
            success: function (data, status, xhr) {
                var parsedData = JSON.parse(data);
                var dynData = parsedData.DynamicData;
                if (parsedData.SUCCESS) {
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
                } else {
                    Popup.Show("error", parsedData.MESSAGE);
                }
            },
            error: function (xhr) {
                Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            },
            complete: function (xhr, status) {
            }
        });
    }
    else if (action === 'CurrencyId') {
        var newDataCollection = {
            EntityName: 'CURRENCY'
        };
        $.ajax({
            url: baseUrl1 +'/api/v1/Setup/EntityValue/GetByEntityName',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(newDataCollection),
            success: function (data, status, xhr) {
                var parsedData = JSON.parse(data);
                var dynData = parsedData.DynamicData;
                if (parsedData.SUCCESS) {
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
                } else {
                    Popup.Show("error", parsedData.MESSAGE);
                }
            },
            error: function (xhr) {
                Popup.Show("error", 'Error: ' + xhr.status + ' ' + xhr.statusText);
            },
            complete: function (xhr, status) {
            }
        });
    }
}

//function: 7
function PageGoShowModal(action, dataid) {
    if (action === 'div-page-delete-business') {
        Popup.Confirm("Are you sure you want to delete?", function () { PageGoActionEvent('div-page-delete-business', dataid) }, function () { });
    }
}