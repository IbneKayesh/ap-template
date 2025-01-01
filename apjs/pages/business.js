//function: 0
$(document).ready(() => {
    const userState = State.GlobalGet("loginhtml");
    if (!userState) {
        // If no user is logged in, redirect to login page
        window.location.hash = "#/login";
    } else {
       
    }
});

//function: 1
function PageGoClear(action) {
 
}

//function: 2
function PageGoValidateInput(action) {
    let isValid = true;
    let newDataCollection = {};
    if (action === 'div-page-entry-business') {
      
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
    }
}

//function: 6
function PageGoActionEvent(action, dataid) {


    else if (action === 'div-page-edit-business') {
        var newDataCollection = {
            Id: $(dataid).data('id')
        };
        WorkInProgress.Show('Getting ready....');
        $.ajax({
            url: API_BASE_URL + 'Company/Business/GetById',
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
            url: API_BASE_URL + 'Company/Business/DeleteById',
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

    }
    else if (action === 'CurrencyId') {

    }
}

//function: 7
function PageGoShowModal(action, dataid) {
    if (action === 'div-page-delete-business') {
        Popup.Confirm("Are you sure you want to delete?", function () { PageGoActionEvent('div-page-delete-business', dataid) }, function () { });
    }
}