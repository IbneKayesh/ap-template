//function: 0
$(document).ready(function () {
    $('#table-ntpe').ToTable();
});


//function: 1
function PageGoClear(action) {
    switch (action) {
        case 'div-page-entry-ntpe':
            $('#id').val('0');
            $('#ntpe_name').val('');
            $('#ntpe_code').val('');
            //clear error
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

            newDataCollection = {
                Id: $('#Id').val().trim(),
                BusinessName: $('#BusinessName').val().trim(),
            };

            break;

        default:
            console.log('Invalid action');
            break;
    }
    return { isValid, newDataCollection };
}

function PageGoValidateInputFormData(action) {
    let isValid = true;
    var newDataCollection = new FormData();
    switch (action) {
        case 'div-page-entry-ntpe':
            isValid &= ValidateInputField('#id', value => value === '' || value.length < 1, "Name is required, at least 3 char");
            isValid &= ValidateInputField('#ntpe_name', value => value === '' || value.length < 3, "Name is required, at least 3 char");
            isValid &= ValidateInputField('#ntpe_code', value => value === '' || value.length < 3, "Code is required, at least 3 char");

            newDataCollection.append("id", $('#id').val().trim());
            newDataCollection.append("ntpe_name", $('#ntpe_name').val().trim());
            newDataCollection.append("ntpe_code", $('#ntpe_code').val().trim());
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
        case 'div-page-edit-ntpe':
            var dataItem = $(dynData).data("item");
            $('#id').val(dataItem.id);
            $('#ntpe_name').val(dataItem.ntpe_name);
            $('#ntpe_code').val(dataItem.ntpe_code);
            PageGoNext('div-page-entry-ntpe', '0');

            break;
        default:
            console.log('Invalid action');
            break;
    }
}

//function: 4
function GenerateTableHTML(action, dynData) {
    switch (action) {
        case 'table-ntpe':
            $('#table-ntpe tbody').empty();
            if (dynData !== null) {
                dynData.forEach(function (item) {
                    var row = $('<tr></tr>');
                    row.append('<td>' + item.id + '</td>');
                    row.append('<td>' + item.ntpe_name + '</td>');
                    row.append('<td>' + item.ntpe_code + '</td>');
                    //row.append(`<td><i class="button fas fa-edit mr-2" data-id='${item.id}' onclick=PageGoActionEvent("div-page-edit-ntpe",this);></i><i class="button btn-red fas fa-trash mr-2" data-id="${item.id}" onclick=PageGoShowModal("div-delete-ntpe",this);></i></td>`);
                    row.append(`<td><i class="button fas fa-edit mr-2" data-item='${JSON.stringify(item)}' onclick=PageGoFillInput("div-page-edit-ntpe",this);></i><i class="button btn-red fas fa-trash mr-2" data-id="${item.id}" onclick=PageGoShowModal("div-delete-ntpe",this);></i></td>`);
                    $('#table-ntpe tbody').append(row);
                });
            }
            break;
        case 'div-delete-ntpe':
            $('#table-ntpe tbody tr').filter(function () {
                return $(this).find('[data-id="' + dynData + '"]').length > 0;
            }).remove();

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
        case 'div-page-list-ntpe':
            $('#div-page-entry-ntpe').fadeOut(180, function () {
                $('#btn-back-to-entry').fadeIn(180);
                $('#div-page-list-ntpe').fadeIn(180);
            });
            PageGoActionEvent('div-page-list-ntpe', '0');
            break;

        case 'div-page-entry-ntpe':
            $('#div-page-list-ntpe').fadeOut(180, function () {
                $('#btn-back-to-entry').fadeOut(180);
                $('#div-page-entry-ntpe').fadeIn(180);
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
        case 'div-page-list-ntpe':
            var form = new FormData();
            API.postFormData(
                `${API_BASE_URL}/data?key=tm_ntpe`,
                form,
                (response) => {
                    var parsedData = JSON.parse(response);
                    if (parsedData.tm_ntpe.status) {
                        var dynData = parsedData.tm_ntpe.data;
                        GenerateTableHTML('table-ntpe', dynData);
                        //State.GlobalSet('table-ntpe', dynData);//set global for further filter
                    } else {
                        Popup.Show("error", 'No data found');
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

        case 'div-page-entry-ntpe':
            var validationSummary = PageGoValidateInputFormData(action);
            var new_url = "store?key=tm_ntpe";
            if (validationSummary.newDataCollection.get("id") !== '0') {
                validationSummary.newDataCollection.delete("id");
                new_url = `update/${validationSummary.newDataCollection.get("id")}?key=tm_ntpe`;
            }
            console.log(new_url);
            if (validationSummary.isValid) {
                    WorkInProgress.Show('Getting ready....');
                    API.postFormData(
                        `${API_BASE_URL}/store?key=tm_ntpe`,
                        validationSummary.newDataCollection,
                        (response) => {
                            var parsedData = JSON.parse(response);
                            if (parsedData.tm_ntpe.status) {
                                Popup.Show("success", parsedData.tm_ntpe.message);
                            } else {
                                Popup.Show("error", 'No data found');
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

        case 'div-delete-ntpe':
            var form = new FormData();
            WorkInProgress.Show('Getting ready...');
            API.postFormData(
                `${API_BASE_URL}/destroy/${$(dataid).data('id')}?key=tm_ntpe`,
                form,
                (response) => {
                    var parsedData = JSON.parse(response);
                    if (parsedData.tm_ntpe.status) {
                        GenerateTableHTML('div-delete-ntpe', $(dataid).data('id'));
                        Popup.Show("success", parsedData.tm_ntpe.message);
                    } else {
                        Popup.Show("error", 'No data found');
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
        case 'div-delete-ntpe':
            Popup.Confirm("Are you sure you want to delete?", function () { PageGoActionEvent(action, dataid) }, function () { });

            break;
        default:
            console.log('Invalid action');
            break;
    }
}